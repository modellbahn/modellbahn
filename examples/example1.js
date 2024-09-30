const { Slave, DaylightCycler, Weiche, Fahrtenregler, sleep } = require('../dist/index.js')

const slave = new Slave()
const cycler = new DaylightCycler({
    hueController: null, // Later you can optionally provide your Hue Bridge here to control your lights
    dayNightRatio: '15:9', // DayTimeInHours:NightTimeInHours
    hour: 30 * 1000, // 1 hour is 30 seconds
    sunrise: 6 // The sunrise is at 6am
})
cycler.start()

slave.onready(async () => {
    /*const weiche1 = new Weiche(26, 27)

    setInterval(async () => {
        await weiche1.toggle()
    }, 10000)*/

    const lok1 = new Fahrtenregler(11, 10, 9)
    const lok2 = new Fahrtenregler(6, 5, 4)

    slave.attach([
        //weiche1
        lok1,
        lok2
    ])

    while (true) {
        lok1.setDirection('normal')
        lok1.setSpeed(0)
        lok2.setDirection('normal')
        lok2.setSpeed(0)
        for (let i = 0; i <= 1; i += 0.01) {
            lok1.setSpeed(i)
            lok2.setSpeed(i)
            await sleep(200)
        }
        for (let i = 1; i >= 0; i -= 0.01) {
            lok1.setSpeed(i)
            lok2.setSpeed(i)
            await sleep(200)
        }
        lok1.setDirection('inverted')
        lok1.setSpeed(0)
        lok2.setDirection('inverted')
        lok2.setSpeed(0)
        for (let i = 0; i <= 1; i += 0.01) {
            lok1.setSpeed(i)
            lok2.setSpeed(i)
            await sleep(200)
        }
        for (let i = 1; i >= 0; i -= 0.01) {
            lok1.setSpeed(i)
            lok2.setSpeed(i)
            await sleep(200)
        }
    }
})