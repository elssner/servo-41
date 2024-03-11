// Gib deinen Code hier ein
//% color=#007F00 icon="\uf0d1" block="Servo" weight=28
namespace servo{

    const i2cqwiicJoystick_x20 = 0x20

    export const n_Simulator: boolean = ("€".charCodeAt(0) == 8364) // true, wenn der Code im Simulator läuft
    //let n_Buffer19 = Buffer.create(19) // wird gesendet mit radio.sendBuffer
    export let n_x: number, n_y: number, n_xMotor: number, n_yServo: number
    let n_xmin = 128, n_xmax = 128, n_ymin = 128, n_ymax = 128


    // ========== group="Joystick"

    //% group="Joystick"
    //% block="Joystick Qwiic einlesen" weight=9
    export function joystickQwiic() {
        if (pins.i2cWriteBuffer(i2cqwiicJoystick_x20, Buffer.fromArray([3]), true) != 0)
            return false
        else {
            let bu = pins.i2cReadBuffer(i2cqwiicJoystick_x20, 3)
            n_x = bu.getUint8(0)
            n_y = bu.getUint8(2)
            // Motor
            if (between(n_x, 124, 132)) n_xMotor = 128
            else n_xMotor = n_x
            // Servo
            if (between(n_y, 122, 134)) n_yServo = 90 // Ruhestellung soll 128 ist auf 128 = 90° anpassen
            else if (n_y < 20) n_yServo = 135 // Werte < 20 wie 0 behandeln (max links)
            else if (n_y > 235) n_yServo = 45 // Werte > 235 wie 255 behandeln (max rechts)
            else n_yServo = Math.map(n_y, 20, 235, 134, 46) // Werte von 32 bis 991 auf 46° bis 134° verteilen

            n_yServo = Math.round(n_yServo)
            //n_yservo = Math.round(n_yservo / 3 - 14) // 0=31 90=16 135=1
            return true
        }
    }

    export enum eJoystickValue { x, y, motor, servo }

    //% group="Joystick"
    //% block="Joystick Variablen %pJoystickValue" weight=8
    export function joystickValues(pJoystickValue: eJoystickValue) {
        switch (pJoystickValue) {
            case eJoystickValue.x: return n_x
            case eJoystickValue.y: return n_y
            case eJoystickValue.motor: return n_xMotor
            case eJoystickValue.servo: return n_yServo
            default: return 0
        }
    }

    
    // ========== group="Logik" advanced=true

    //% group="Logik" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=1
    export function between(i0: number, i1: number, i2: number): boolean {
        return (i0 >= i1 && i0 <= i2)
    }



    // ========== group="Text" advanced=true

    //% group="Text" advanced=true
    //% block="// %text" weight=9
    export function comment(text: string): void { }
}