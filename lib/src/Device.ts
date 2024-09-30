import Pin from './Pin'
import InputPin from './InputPin'
import PWMPin from './PWMPin'
import Slave from './Slave'

class Device {
    slave: Slave | null
    onAttached: Function
    
    constructor () {
        this.slave = null
        this.onAttached = () => {}
    }

    $out (pinNum: number | string) {
        return new Pin(pinNum)
    }

    $in (pinNum: number) {
        return new InputPin(pinNum)
    }

    $pwm (pinNum: number) {
        return new PWMPin(pinNum)
    }

    $attachSlave(slave: Slave) {
        this.slave = slave
        this.onAttached()
    }
}

export default Device