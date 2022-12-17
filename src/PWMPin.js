const five = require('johnny-five')

class PWMPin {
    constructor(number) {
        this.number = parseInt(number)
        this.state = 'off'
        this.value = 0
        this.fivePin = new five.Led(number)
        this.off()
    }

    on() {
        this.state = 'on'
        this.value = 255
        this.fivePin.on()
    }

    off() {
        this.state = 'off'
        this.value = 0
        this.fivePin.off()
    }

    /**
     * @description Writes a value between 0 and 255 to the pin
     * @param value The value to write to the pin.
     */
    write(value) {
        if (typeof value !== 'number') throw new TypeError()
        if (value < 0) {
            value = 0
            console.warn('[WARN] Can not write a value below 0. Writing 0')
        }
        if (value > 255) {
            value = 255
            console.warn('[WARN] Can not write a value above 255. Writing 255')
        }

        if (value === 0) {
            this.state = 'off'
        } else {
            this.state = 'on'
        }
        this.value = value

        this.fivePin.brightness(value)
    }

    toggle() {
        if (this.state === 'on') {
            this.off()
        } else {
            this.on()
        }
    }
}

module.exports = PWMPin