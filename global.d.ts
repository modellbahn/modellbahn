import WeichenManager from './lib/src/Weichenmanager'

declare global {
    namespace NodeJS {
        interface Global {
            weichenmanager: WeichenManager
        }
    }
}

export { }