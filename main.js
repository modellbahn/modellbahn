const { Slave, DaylightCycler, Weiche } = require('.')

const slave = new Slave()
const cycler = new DaylightCycler({
    hueController: null, // Later you can optionally provide your Hue Bridge here to control your lights
    dayNightRatio: '15:9', // DayTimeInHours:NightTimeInHours
    hour: 30 * 1000, // 1 hour is 30 seconds
    sunrise: 6 // The sunrise is at 6am
})
cycler.start()

slave.onready(async () => {
    const weiche1 = new Weiche(26, 27)

    setInterval(async () => {
        await weiche1.toggle()
    }, 10000)

    slave.attach([
        weiche1
    ])
})