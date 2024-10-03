import * as five from 'johnny-five'

class InputPin {
    number: string | number
    readonly state: 'on' | 'off'
    fivePin: five.Pin

    constructor(number: string | number) {
        this.number = number
        this.state = 'off'
        this.fivePin = new five.Pin({
            pin: number
        })
        this.fivePin.mode = five.PinMode.ANALOG
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