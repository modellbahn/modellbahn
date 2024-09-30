import * as five from 'johnny-five'

class InputPin {
    number: number
    state: 'on' | 'off'
    fivePin: five.Pin

    constructor(number: number) {
        this.number = number
        this.state = 'off'
        this.fivePin = new five.Pin({
            pin: number
        })
        this.fivePin.mode = five.PinMode.INPUT
    }

    read () {
        return new Promise<number>((resolve) => {
            this.fivePin.query((value) => {
                resolve(value.value)
            })
        })
    }
}

export default InputPin