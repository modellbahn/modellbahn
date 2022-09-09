module.exports = class Weichenmanager {
    constructor () {
        this.queue = []
        this.isQueueHandling = false
        let p = this

        setInterval(() => {
            if (p.isQueueHandling || this.queue.length === 0) return

            p.isQueueHandling = true

            let current = p.queue[0]
            current[0]()
            current[1](() => {
                current.shift()
                p.isQueueHandling = false
            })
        }, 25)
    }

    qPush (cb) {
        let p = this
            
        return new Promise((resolve, reject) => {
            const callOnDone = (donefn) => {
                resolve(donefn)
            }
            p.queue.push([cb, callOnDone])
        })
    }

    myturn () {
        let p = this

        return new Promise(async (resolve, reject) => {

            if (p.queue.length === 0) return resolve(() => {})

            let done = await p.qPush(() => {
                resolve(done)
            })
        })
    }
}