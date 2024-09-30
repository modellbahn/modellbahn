import Device from '../Device'
import WeichenManager from '../Weichenmanager'
import '../../../global'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default class Weiche extends Device {
    leftPin
    rightPin
    state: 'left' | 'right'

    /**
     * @description Creates a new Device of type Weiche
     * @param {Number} leftPin Pin Number for pin to be pulled up if switched to left
     * @param {Number} rightPin Pin Number for pin to be pulled up if switched to right
     */
    constructor(leftPin: number | string, rightPin: number | string) {
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

        // @ts-expect-error: Declared in global.d.ts but VSCode is weird
        if (!global.weichenmanager) global.weichenmanager = new WeichenManager()
    }

    async left () {
        // @ts-expect-error: Declared in global.d.ts but VSCode is weird
        const done: Function = await global.weichenmanager.myturn()

        this.leftPin.on()
        await sleep(30)
        this.leftPin.off()
        this.state = 'left'

        await sleep(500)
        done()
    }

    async right() {
        // @ts-expect-error: Declared in global.d.ts but VSCode is weird
        const done: Function = await global.weichenmanager.myturn()

        this.rightPin.on()
        await sleep(30)
        this.rightPin.off()
        this.state = 'right'

        await sleep(500)
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