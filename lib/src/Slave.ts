import * as five from 'johnny-five'
import Device from './Device'

class Slave {
    five = five
    board: five.Board

    constructor (port?: string) {
        this.board = new this.five.Board({
            port
        })
    }

    onready (cb: () => void) {
        this.board.on('ready', cb)
    }

    attach(devices: Device[]) {
        for (const device of devices) {
            device.$attachSlave(this)
        }
    }
}

export default Slave