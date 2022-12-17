const Pin = require('./Pin')
const InputPin = require('./InputPin')
const PWMPin = require('./PWMPin')

class Device {
    constructor () {
        this.slave = null
        this.onAttached = () => {}
    }

    $out (pinNum) {
        return new Pin(pinNum)
    }

    $in (pinNum) {
        return new InputPin(pinNum)
    }

    $pwm (pinNum) {
        return new PWMPin(pinNum)
    }

    $attachSlave (slave) {
        this.slave = slave
        this.onAttached()
    }
}

module.exports = Device