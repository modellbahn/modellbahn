const Device = require('../Device')

module.exports = class Signal extends Device {
    /**
     * @description Creates a new Device of type Signal
     * @param {Number} pin Pin Number for the relay
     */
    constructor (pin) {
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