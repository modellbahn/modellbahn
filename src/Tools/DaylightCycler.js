module.exports = class DaylightCycler {
    constructor (options = {}) {
        if (!options.hueController) options.hueController = null
        if (!options.dayNightRatio) options.dayNightRatio = '15:9'
        if (!options.hour) options.hour = 60 * 1000
        if (!options.sunrise) options.sunrise = 6

        this.options = options
        this.time = options.sunrise
        this.minutes = 0
        this.ratio = {
            day: [sunrise, sunrise + parseInt(options.dayNightRatio.split(':')[0]) - 1],
            night: [sunrise + parseInt(options.dayNightRatio.split(':')[0]), sunrise - 1]
        }
        this.evMHandlers = []

    }

    isDay () {
        return this.time > this.ratio.day[0] && this.time < this.ratio.day[1]
    }

    isNight() {
        return this.time > this.ratio.night[0] && this.time < this.ratio.night[1]
    }

    $everyHour (p) {
        p.time += 1
        p.minutes = 0
        if (p.time >= 24) p.time = 0
    }

    $everyMinute (p) {
        p.minutes += 1
        if (p.minutes >= 60) p.minutes = 0

        for (const evm of p.evMHandlers) {
            evm(p)
        }
    }

    start () {
        setInterval(this.$everyMinute(this), this.options.hour / 60)
        setInterval(this.$everyHour(this), this.options.hour)
    }

    at (hours, minutes, callback) {
        let active = true
        function revoke () {
            active = false
        }

        this.evMHandlers.push(function (p) {
            if (!active) return

            if (hours !== p.time) return
            if (minutes !== p.minutes) return

            callback()
        })

        return revoke
    }
}