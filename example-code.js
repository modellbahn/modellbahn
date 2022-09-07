const { Slave, DaylightCycler, Weiche } = require('.')

const slave = new Slave()
const cycler = new DaylightCycler({
    hueController: null, // Later you can optionally provide your Hue Bridge here to control your lights
    dayNightRatio: '15:9', // DayTimeInHours:NightTimeInHours
    hour: 30 * 1000, // 1 hour is 30 seconds
    sunrise: 6 // The sunrise is at 6am
})
cycler.start()

const weiche1 = new Weiche(2, 3)

slave.attach([
    weiche1
])