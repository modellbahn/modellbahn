import SpeakerController from './SpeakerController'

export default async () => {
    const sc = new SpeakerController(__dirname)
    await sc.init()
    return sc.play('soundcheck.ogg')
}