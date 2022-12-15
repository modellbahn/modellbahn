const player = require('play-sound')(opts = {})
const path = require('path')
let dir = ''

class SpeakerController {
    constructor (directory = '') {
        dir = directory
    }

    play (file) {
        if (typeof file !== 'string') throw new TypeError('file must be a string')
        if (file === '') throw new Error('file can\'t be empty')
        return new Promise((resolve) => {
            player.play(path.join(dir, file), (err) => {
                if (err) console.log(err)
                resolve()
            })
        })
    }
}

module.exports = SpeakerController