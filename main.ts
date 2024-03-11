input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    bAnzeige = !(bAnzeige)
    o4digit.point(bAnzeige)
})
let bAnzeige = false
let o4digit: grove.TM1637 = null
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(7)
bAnzeige = false
servo.comment("elssner/servo-41")
servo.comment("Qwiic Joystick, 4-Digit-Display, Servo an P1")
loops.everyInterval(400, function () {
    if (servo.joystickQwiic()) {
        pins.servoWritePin(AnalogPin.P1, servo.joystickValues(servo.eJoystickValue.servo))
        if (bAnzeige) {
            o4digit.show(servo.joystickValues(servo.eJoystickValue.y))
        } else {
            o4digit.show(Math.round(Math.map(servo.joystickValues(servo.eJoystickValue.y), 0, 255, 0, 180)))
        }
    }
})
