import Device from '../Device'

export default class Signal extends Device {
    pin
    state: 'green' | 'red'

    /**
     * @description Creates a new Device of type Signal
     * @param {Number|String} pin Pin Number for the relay
     */
    constructor (pin: number | string) {
        // ################################### //
        // ############## Init ############### //
        // ################################### //
        super()

        // ################################### //
        // ########## Required Pins ########## //
        // ################################### //
        this.pin = this.$out(pin)
        this.state = 'green'
        this.onAttached = this.green
    }

    async red () {
        this.pin.on()
        this.state = 'red'
    }

    async green() {
        this.pin.off()
        this.state = 'green'
    }
}