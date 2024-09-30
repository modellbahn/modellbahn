interface DaylightCyclerOptions {
    /**
     * Not supported atm, should sync with your Philips hue light bulbs
     */
    hueController?: null,
    /**
     * Determines how much hours of the time cycle should be day and how much should be night
     * @example '15:9' => 15 hours daytime, 9 hours nighttime
     * @default '15:9'
     */
    dayNightRatio?: string,
    /**
     * Determines how long an hour should be. Value is provided in milliseconds
     * @example 30000 (30 seconds = 1 hour)
     * @default 60 * 1000
     */
    hour?: number,
    /**
     * Hour at which the sunrise should be. In combination with the dayNightRatio also determines the time of the sunset.
     * @example 7 "(Sunrise at 7 o' clock)""
     * @default 6
     */
    sunrise?: number,
}

export default class DaylightCycler {
    options: DaylightCyclerOptions
    /**
     * Current hour
     */
    time: number
    /**
     * Current minute
     */
    minutes: number

    ratio: {
        /**
         * First and last hour of the day
         */
        day: [number, number],
        /**
         * First and last hour of the night
         */
        night: [number, number]
    }

    evMHandlers: ((daylightcycler: DaylightCycler) => void)[]

    constructor (options: DaylightCyclerOptions = {}) {
        if (!options.hueController) options.hueController = null
        if (!options.dayNightRatio) options.dayNightRatio = '15:9'
        if (!options.hour) options.hour = 60 * 1000
        if (!options.sunrise) options.sunrise = 6

        this.options = options
        this.time = options.sunrise
        this.minutes = 0
        this.ratio = {
            day: [options.sunrise, options.sunrise + parseInt(options.dayNightRatio.split(':')[0]) - 1],
            night: [options.sunrise + parseInt(options.dayNightRatio.split(':')[0]), options.sunrise - 1]
        }
        this.evMHandlers = []

    }

    isDay () {
        return this.time > this.ratio.day[0] && this.time < this.ratio.day[1]
    }

    isNight() {
        return this.time > this.ratio.night[0] && this.time < this.ratio.night[1]
    }

    #everyHour (p: this) {
        return () => {
            p.time += 1
            p.minutes = 0
            if (p.time >= 24) p.time = 0  
        }
        
    }

    #everyMinute (p: this) {
        return () => {
            p.minutes += 1
            if (p.minutes >= 60) p.minutes = 0

            for (const evm of p.evMHandlers) {
                evm(p)
            }
        }
    }

    /**
     * Starts the Daylight cycle
     */
    start () {
        setInterval(this.#everyMinute(this), (this.options.hour || 60 * 1000) / 60)
        setInterval(this.#everyHour(this), this.options.hour)
    }

    /**
     * Sets an event listener for a specific time. If you wanted to execute something at 06:30 you could do the following:
     * @example DaylightCycler.at(6, 30, () => {
     *      console.log('Wake up! It\'s 6:30')
     * })
     * @param hours Hour at which the callback should be executed
     * @param minutes Minute at which the callback should be executed
     * @param callback Gets called when event was dispatched
     * @returns Function to revoke Handler
     */
    at (hours: number, minutes: number, callback: () => void): () => void {
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