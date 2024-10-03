import Slave from './src/Slave'
import DaylightCycler from './src/Tools/DaylightCycler'
import Weiche from './src/Devices/Weiche'
import Signal from './src/Devices/Signal'
import Fahrtenregler from './src/Devices/Fahrtenregler'
import soundcheck from './src/Tools/soundcheck'
import SpeakerController from './src/Tools/SpeakerController'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default {
    // Slave
    Slave,

    // Tools
    DaylightCycler,
    sleep,

    // Devices
    Weiche,
    Signal,
    Fahrtenregler,

    // Soundcheck
    soundcheck,
    SpeakerController
}
