const Pin = require('./Pin')
const InputPin = require('./InputPin')

class Device {
    constructor () {
        this.slave = null
        this.onAttached = () => {}
    }

    $out (pinNum) {
        return new Pin(pinNum)
    }

    $in () {
        return new InputPin(pinNum)
    }

    $attachSlave (slave) {
        this.slave = slave
        this.onAttached()
    }
}

module.exports = Device