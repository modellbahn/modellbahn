const five = require('johnny-five')

class Pin {
    constructor (number) {
        this.number = parseInt(number)
        this.state = 'off'
        this.value = 0
        this.fivePin = new five.Pin({
            pin: number,
            mode: 1
        })
        this.off()
    }

    on () {
        this.state = 'on'
        this.value = 255
        this.fivePin.high()
    }

    off () {
        this.state = 'off'
        this.value = 0
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