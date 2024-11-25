import audioClassificationClient from './utils/grpc'
import record from './utils/recorder'
import {Writable} from 'stream'
import {config} from 'dotenv'
import {Metadata, ClientDuplexStream} from '@grpc/grpc-js'
import {ClassifyStreamRequest} from '../protos/generated/yysystem/audioclassification/ClassifyStreamRequest'
import {ClassifyStreamResponse__Output} from '../protos/generated/yysystem/audioclassification/ClassifyStreamResponse'
import {createInterface} from 'readline'

config()
const apiKey = process.env.API_KEY
if (!apiKey) {
  throw new Error('API_KEY not set')
}
const endpointId = process.env.ENDPOINT_ID
if (!endpointId) {
  throw new Error('ENDPOINT_ID not set')
}

const state: {
  call: ClientDuplexStream<ClassifyStreamRequest, ClassifyStreamResponse__Output> | null
} = {
  call: null,
}

const main = () => {
  const client = audioClassificationClient()
  const metadata = new Metadata()
  metadata.add('yyapis-api-key', apiKey)
  const rl = createInterface({input: process.stdin})
  rl.on('line', (_line) => {
    if (state.call) {
      console.error('Stream already started, please stop it first')
      return
    }
    const call = client.classifyStream(metadata)
    state.call = call
    const recorder = record()
    call.on('data', (chunk) => {
      console.info('Stream data: ', chunk)
    })
    call.on('error', (e) => {
      console.error('Stream error: ', e)
      recorder.stop()
    })
    call.on('end', () => {
      console.info('Stream ended')
    })
    call.on('finish', () => {
      console.info('Stream finished')
    })
    call.on('close', () => {
      console.info('Stream closed')
    })
    call.write({
      streamingConfig: {
        endpointId,
        customConfig: {topN: 1},
        defaultConfig: {topN: 1},
        useDefaultResults: true,
      },
    })
    recorder.stream().pipe(
      new Writable({
        write: (chunk, _encoding, next) => {
          if (!Buffer.isBuffer(chunk)) {
            throw new TypeError(
              `chunk is not a buffer, got ${typeof chunk}, encoding: ${_encoding}`
            )
          }
          if (!call.writableEnded) {
            call.write({
              audiobytes: chunk,
            })
          }
          next()
        },
        final: (done) => {
          console.info('Writable stream ended')
          if (!call.writableEnded) call.end()
          done()
        },
      })
    )
  })
  process.on('SIGINT', () => {
    if (!state.call) return
    state.call.end()
    state.call = null
    console.info({
      message: 'Mic streaming audio classification stopped',
    })
  })
  console.info({
    message: "Press 'Enter' key to start streaming audio classification, 'ctrl + c' to exit",
  })
}
main()
