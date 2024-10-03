export default class Weichenmanager {
    queue: [Function, Function][] = []
    isQueueHandling: boolean = false

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
        }, 100)
    }

    /**
     * 
     * @param cb Function that gets called when the Weichenschaltung should be executed
     * @returns Function that needs to be executed to indicate the Weichenschaltung was completed
     */
    #qPush (cb: Function): Promise<Function> {
        let p = this
            
        return new Promise((resolve, reject) => {
            const callOnDone = (donefn: Function) => {
                resolve(donefn)
            }
            p.queue.push([cb, callOnDone])
        })
    }

    /**
     * Async function which reserves a spot in the queue and resolved when it's your turn. Resolves a done function, which needs to be called after Weichenschaltung was executed, so that the queue can proceed.
     * @returns Promise which resolves to a done fn
     */
    myturn (): Promise<Function> {
        let p = this

        return new Promise(async (resolve, reject) => {
            let done = await p.#qPush(() => {
                resolve(done)
            })
        })
    }
}