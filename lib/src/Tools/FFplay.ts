import { spawn } from 'child_process'
import { EventEmitter } from 'events'
import * as ffbinaries from 'ffbinaries'
import { platform, homedir } from 'os'
import * as path from 'path'

class FFplay extends EventEmitter {
    paused: boolean = false
    running: boolean = false
    proc
    ef
    manualStop: boolean = false

    constructor(file: string, opts?: string[]) {
        // Download ffplay
        let plat: 'windows-32' |  'osx-64' | 'linux-32'
        if (platform() === 'win32') {
            plat = 'windows-32'
        } else if (platform() === 'darwin') {
            plat = 'osx-64'
        } else if (platform() === 'linux') {
            plat = 'linux-32'
        } else {
            throw new Error('Unsupported platform!')
        }

        ffbinaries.downloadBinaries(['ffplay'], { platform: plat, quiet: true, destination: path.join(homedir(), '.modellbahn-ffbinaries') }, () => {
            console.log('Downloaded ffplay and ffprobe binaries!')
        })

        // FFplay
        super()

        opts = opts || ['-nodisp', '-autoexit']
        opts.unshift(file)
        this.proc = spawn('ffplay', opts, { stdio: 'ignore' })
        let p = this
        this.ef = function () {
            p.proc.kill()
        }
        process.on('exit', this.ef)
        this.proc.on('exit', function () {
            if (p.running) {
                p.running = false
                process.removeListener('exit', p.ef)
                if (!p.manualStop) {
                    setImmediate(function () { p.emit('stopped') })
                }
            }
        })
        this.running = true
    }

    pause() {
        if (!this.paused) {
            this.proc.kill('SIGSTOP')
            this.paused = true
            this.emit('paused')
        }
    }

    resume() {
        if (this.paused) {
            this.proc.kill('SIGCONT')
            this.paused = false
            this.emit('resumed')
        }
    }

    stop() {
        this.manualStop = true
        this.proc.kill('SIGKILL')
    }
}

export default FFplay
