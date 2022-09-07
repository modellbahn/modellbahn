const five = require('johnny-five')

class Pin {
    constructor (number) {
        this.number = number
        this.state = 'off'
        this.fivePin = new five.Pin(number)
        this.off()
    }

    on () {
        this.state = 'on'
        this.fivePin.high()
    }

    off () {
        this.state = 'off'
        this.fivePin.low()
    }

    toggle () {
        if (this.state === 'on') {
            this.off()
        } else {
            this.on()
        }
    }
}

module.exports = Pin