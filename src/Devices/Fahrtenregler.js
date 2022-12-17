const Device = require('../Device')

module.exports = class Fahrtenregler extends Device {
    /**
     * @description Creates a new Device of type DeviceName
     * @param {Number} enable Pin Number for enable
     * @param {Number} input1 Pin Number for input1
     * @param {Number} input2 Pin Number for input2
     */
    constructor(enable, input1, input2) {
        // ################################### //
        // ############## Init ############### //
        // ################################### //
        super()

        // ################################### //
        // ########## Required Pins ########## //
        // ################################### //
        this.enablePin = this.$pwm(enable)
        this.input1Pin = this.$out(input1)
        this.input2Pin = this.$out(input2)

        // ################################### //
        // ############## State ############## //
        // ################################### //
        this.direction = 'normal'
        this.speed = 0
    }

    /**
     * @description Switches the direction to either normal or inverted
     * @param {'normal'|'inverted'} direction Direction of the motor
     */
    setDirection (direction = 'normal') {
        if (direction === 'inverted') {
            this.input1Pin.off()
            this.input2Pin.on()
            this.direction = 'inverted'
        } else {
            this.input1Pin.on()
            this.input2Pin.off()
            this.direction = 'normal'
        }
    }

    setSpeed (percentage) {
        if (typeof percentage !== 'number') throw new TypeError('percentage must be a number')
        if (percentage < 0 || percentage > 1) throw new Error('percentage must be between 0 and 1')

        this.enablePin.write(parseInt(percentage * 255))
        this.speed = percentage
    }
}