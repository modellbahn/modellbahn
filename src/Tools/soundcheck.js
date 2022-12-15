const SpeakerController = require('./SpeakerController')

module.exports = () => {
    const { play } = new SpeakerController(__dirname)
    return play('soundcheck.ogg')
}