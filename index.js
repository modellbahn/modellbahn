const Slave = require('./src/Slave')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


module.exports = {
    // Slave
    Slave,

    // Tools
    DaylightCycler: require('./src/Tools/DaylightCycler'),
    sleep: sleep,

    // Devices
    Weiche: require('./src/Devices/Weiche'),
    Signal: require('./src/Devices/Signal'),
    Fahrtenregler: require('./src/Devices/Fahrtenregler'),

    // Soundcheck
    soundcheck: require('./src/Tools/soundcheck'),
}