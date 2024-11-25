// https://github.com/gillesdemey/node-record-lpcm16
import {ChildProcessWithoutNullStreams, spawn} from 'child_process'
import {Readable} from 'stream'

class Recording {
  #process?: ChildProcessWithoutNullStreams
  #stream?: Readable
  constructor() {
    return this.#start()
  }
  #start(): this {
    const cp = spawn(
      'sox',
      [
        '--buffer',
        '3200', // buffer size
        '--default-device',
        '--no-show-progress', // show no progress
        '--rate',
        '16000', // sample rate
        '--channels',
        '1', // channels
        '--encoding',
        'signed-integer', // sample encoding
        '--bits',
        '16', // precision (bits)
        '--type',
        'wav', // audio type
        '-', // pipe
      ],
      {
        stdio: 'pipe',
      }
    )
    const rec = cp.stdout
    const err = cp.stderr
    this.#process = cp
    this.#stream = rec
    cp.on('close', (code) => {
      if (code === null || code === 0) return
      rec.emit('error', new Error(`sox process exited with code ${code.toString()}`))
    })
    err.on('data', (chunk) => {
      if (typeof chunk === 'string') {
        console.error(new Error(`STDERR: ${chunk}`))
      }
    })
    rec.on('end', () => {
      console.info('Recording ended')
    })
    return this
  }
  stop(): void {
    if (!this.#process) {
      throw new Error('Recording process not started')
    }
    this.#process.kill()
  }
  pause(): void {
    if (!this.#process) {
      throw new Error('Recording process not started')
    }
    this.#process.kill('SIGSTOP')
    this.#stream?.pause()
    console.info('Recording paused')
  }
  resume(): void {
    if (!this.#process) {
      throw new Error('Recording process not started')
    }
    this.#process.kill('SIGCONT')
    this.#stream?.resume()
    console.info('Recording resumed')
  }
  isPaused(): boolean {
    return this.#stream?.isPaused() ?? false
  }
  stream(): Readable {
    if (!this.#stream) {
      throw new Error('Recording stream not started')
    }
    return this.#stream
  }
}

export default function record(...args: ConstructorParameters<typeof Recording>): Recording {
  return new Recording(...args)
}
