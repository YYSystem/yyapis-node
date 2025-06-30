//@ts-ignore
import {record} from 'node-record-lpcm16'
import {createInterface} from 'readline'
import {ClientDuplexStream, Metadata} from '@grpc/grpc-js'

import {autoDetectLanguageCodes, yyapisApiKey, yyapisEndpoint, yyapisPort} from './util/process.env'
import {loadDictionaryContexts} from './util/loadDictionaries'
import {creds, isStatusObject, loadYYSystemPackage} from './util/grpc'
import {StreamingConfig} from '@protos/generated/yysystem/StreamingConfig'
import {StreamResponse__Output} from '@protos/generated/yysystem/StreamResponse'
import {Writable} from 'stream'
import {StreamRequest} from '@protos/generated/yysystem/StreamRequest'

const sampleRateHertz = 16000

interface Recorder {
  stream: () => Writable
  start: () => void
  stop: () => void
}

const state: {
  recorder: Recorder | null
  recording: boolean
  call: ClientDuplexStream<StreamRequest, StreamResponse__Output> | null
} = {
  recording: false,
  recorder: null,
  call: null,
}

const stopRecording = () => {
  const {recorder, recording, call} = state
  if (recording) {
    recorder?.stop()
    state.recording = false
  }
  if (call && !call.writableEnded) call.end()
}

const logtag = 'main'

const main = async () => {
  const yysystem = await loadYYSystemPackage()
  const address = `${yyapisEndpoint}:${yyapisPort}`
  const client = new yysystem.YYSpeech(address, creds)
  const reader = createInterface({input: process.stdin})

  reader.on('line', async (line) => {
    if (line === 'stop') {
      const {recording} = state
      if (!recording) {
        console.error({logtag, message: 'recording not started yet'})
        return
      }
      stopRecording()
      return
    }
    if (state.recording) {
      console.error({
        logtag,
        message: "now recording, try 'end' before start",
      })
      return
    }
    if (state.call && !state.call.closed) {
      console.error({logtag, message: 'streaming call not closed'})
      return
    }
    const metadata = new Metadata()
    metadata.add('x-api-key', yyapisApiKey)
    const call = client.RecognizeStream(metadata)
    state.call = call
    const streamingConfig: StreamingConfig = {
      encoding: 'LINEAR16',
      sampleRateHertz,
      model: 10,
      enableInterimResults: true,
    }
    if (autoDetectLanguageCodes && autoDetectLanguageCodes.length > 0) {
      streamingConfig.autoDetectLanguageCodes = autoDetectLanguageCodes
    } else {
      streamingConfig.languageCode = 4
    }
    const dictionaryContexts = await loadDictionaryContexts()
    if (dictionaryContexts && dictionaryContexts.length !== 0) {
      console.info({logtag, message: 'dictionaryContexts', dictionaryContexts: JSON.stringify(dictionaryContexts)})
      streamingConfig.dictionaryContexts = dictionaryContexts
    }
    call.write({streamingConfig})
    call.on('data', (chunk: StreamResponse__Output) => {
      const {error, result} = chunk
      if (error) {
        console.error({logtag, message: 'streaming error', error})
        return
      }
      if (!result) {
        console.warn({logtag, message: 'no result'})
        return
      }
      const {isFinal, transcript} = result
      if (!isFinal) {
        console.info({logtag, message: 'interim result', isFinal, transcript})
        return
      }
      console.info({logtag, message: 'final result', isFinal, transcript})
      return
    })
    call.on('error', (e: unknown) => {
      console.error({logtag, message: 'call error event', e})
      if (isStatusObject(e)) {
        const {code} = e
        if (code === 13) {
          console.error({logtag, message: 'error code 13 detected'})
          stopRecording()
        }
      }
    })
    call.on('end', () => {
      console.info({logtag, message: 'call end event'})
    })
    call.on('close', () => {
      console.info({logtag, message: 'call close event'})
    })
    const recorder = record({
      sampleRateHertz,
      threshold: 0,
      verbose: false,
      recordProgram: 'rec',
      silence: 10.0,
    }) as Recorder
    state.recorder = recorder
    const recordingStream = recorder.stream()
    recordingStream.on('error', (error: unknown) => {
      console.error({logtag, message: 'recording stream error', error})
      stopRecording()
    })
    recordingStream.pipe(
      new Writable({
        write: (chunk, _encoding, next) => {
          if (!Buffer.isBuffer(chunk))
            throw new TypeError(
              '[createAudioInputTransform] - invalid type of chunk data'
            )
          const {call} = state
          if (call?.writableEnded) {
            console.warn({logtag, message: 'skip writing audiobytes'})
            return
          }
          call?.write({audiobytes: chunk})
          next()
        },
        final: () => {
          const {call} = state
          if (call && !call.writableEnded) call.end()
        },
      })
    )
    state.recording = true
    console.info({logtag, message: 'start recording'})
    return
  })
  console.info({
    logtag,
    message:
      "press 'Enter' key to start mic streaming recognition and type 'stop' to stop recording",
  })
}

main()
