import { spawn } from 'child_process'
import * as ffbinaries from 'ffbinaries'
import { homedir } from 'os'
import * as path from 'path'

function dlFF() {
    return new Promise<void>((resolve, reject) => {
        ffbinaries.downloadBinaries(['ffplay'], { destination: path.join(homedir(), '.modellbahn-ffbinaries'), version: '3.2' }, function () {
            resolve()
        })
    })
}

interface SoundOptions {
    filepath: string,
    startVolume: number,
    ffplayExecutable: string
}

class Sound {
    #filePath: string
    volume: number
    #ffplayExecutable: string
    #proc

    stopped: boolean = false

    #hasEnded = false

    #endEvListeners: Function[] = []

    get hasEnded() {
        return this.#hasEnded
    }

    set hasEnded(val: boolean) {
        throw new Error('Error while setting hasEnded. This property is final and cannot be changed.')
    }
    
    constructor(options: SoundOptions) {
        // Config
        this.#ffplayExecutable = options.ffplayExecutable
        this.#filePath = options.filepath
        this.volume = options.startVolume

        // Process
        this.#proc = spawn(this.#ffplayExecutable, ['-autoexit', '-nodisp', '-af', `volume=${this.volume / 100}`, this.#filePath], { stdio: 'ignore' })

        // In case node get's terminated, kill ffplay
        let p = this
        const killFunc = function () {
            p.#proc.kill()
        }

        process.on('exit', killFunc)
        this.#proc.on('exit', function () {
            process.removeListener('exit', killFunc)
            p.#hasEnded = true

            for (const listener of p.#endEvListeners) {
                listener()
            }
        })
    }

    stop() {
        this.stopped = true
        this.#proc.kill('SIGKILL')
    }

    /**
     * Register an event listener waiting for sound to end / to be stopped. If it ended naturally and wasn't stopped, Sound.stopped will be false
     * @param callback Function to be called on hasEnded event
     */
    onEnd(callback: Function) {
        this.#endEvListeners.push(callback)
    }
}

class SpeakerController {
    sounds: {
        [key: string]: Sound
    } = {}
    dir: string
    #wasInitialized: boolean = false

    /**
     * Creates a SpeakerController which manages all sounds
     * @param soundDir Default directory where all sounds are placed. Defaults to the current working directory.
     */
    constructor(soundDir?: string) {
        if (typeof soundDir !== 'string') soundDir = process.cwd()
        
        this.dir = soundDir
    }

    /**
     * Initializes the SpeakerController. Has to be executed before any sound can be played.
     */
    async init() {
        await dlFF()
        this.#wasInitialized = true
    }

    /**
     * Plays a sound. requires await SpeakerController.init() to be executed first.
     * @param fileName Name of the file in the sounds directory or an absolute filepath
     * @param volume Number in percent indicating the loudness of the sound (eg. volume: 50 => 50% volume)
     */
    play(fileName: string, volume: number = 100): Sound {
        if (!this.#wasInitialized) throw new Error('You have to initialize the SpeakerController first: await SpeakerController.init()')

        if (!path.isAbsolute(fileName)) fileName = path.join(this.dir, fileName)

        return new Sound({
            filepath: fileName,
            startVolume: volume,
            ffplayExecutable: path.join(homedir(), '.modellbahn-ffbinaries', ffbinaries.getBinaryFilename('ffplay', ffbinaries.detectPlatform() || 'linux-32'))
        })
    }
}

export default SpeakerController