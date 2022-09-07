const Device = require('../Device')

// TODO: Replace DeviceName with your DeviceName and change the required Pins
module.exports = class DeviceName extends Device {
    /**
     * @description Creates a new Device of type DeviceName
     * @param {Number} pin1 Pin Number for pin1
     */
    constructor (pin1) {
        // ################################### //
        // ############## Init ############### //
        // ################################### //
        super()

        // ################################### //
        // ########## Required Pins ########## //
        // ################################### //
        this.pin1 = this.$out(pin1)
    }
}