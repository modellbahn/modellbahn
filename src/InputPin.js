const five = require('johnny-five')

class InputPin {
    constructor(number) {
        this.number = number
        this.state = 'off'
        this.fivePin = new five.Pin({
            pin: number,
            mode: 0
        })
    }

    read () {
        return new Promise((resolve, reject) => {
            five.Pin.read(this.fivePin, function (error, value) {
                if (error) return reject(error)
                resolve(value)
            })
        })
    }
}

module.exports = InputPin