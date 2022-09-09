const Device = require('../Device')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = class Weiche extends Device {
    /**
     * @description Creates a new Device of type Weiche
     * @param {Number} leftPin Pin Number for pin to be pulled up if switched to left
     * @param {Number} rightPin Pin Number for pin to be pulled up if switched to right
     */
    constructor(leftPin, rightPin) {
        // ################################### //
        // ############## Init ############### //
        // ################################### //
        super()

        // ################################### //
        // ########## Required Pins ########## //
        // ################################### //
        this.leftPin = this.$out(leftPin)
        this.rightPin = this.$out(rightPin)
        this.onAttached = this.left
        this.state = 'left'

        if (!global.weichenmanager) global.weichenmanager = new (require('../Weichenmanager'))()
    }

    async left () {
        const done = await global.weichenmanager.myturn()

        this.leftPin.on()
        await sleep(10)
        this.leftPin.off()
        this.state = 'left'

        done()
    }

    async right() {
        const done = await global.weichenmanager.myturn()

        this.rightPin.on()
        await sleep(10)
        this.rightPin.off()
        this.state = 'right'

        done()
    }

    async toggle() {
        if (this.state === 'left') {
            await this.right()
        } else {
            await this.left()
        }
    }
}