class Slave {
    constructor () {
        this.five = require('johnny-five')
        this.board = new this.five.Board()
    }

    onready (cb) {
        this.board.on('ready', cb)
    }

    attach (devices) {
        for (const device of devices) {
            device.$attachSlave(this)
        }
    }
}

module.exports = Slave