const { SpeakerController } = require('../dist/index.js').default
const path = require('path')

;(async () => {
    const sc = new SpeakerController(path.join(process.cwd(), 'lib', 'src', 'Tools'))
    await sc.init()

    const sound = sc.play('soundcheck.ogg')
    
    sound.onEnd(() => {
        console.log('Sound ended!')
        console.log('Was stopped manually:', sound.stopped)
    })
})()
