class Ball {

    constructor(x, y, rad, color) {

        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color

        this.speed = 0;
        // this.friction = 0.1;
        this.maxStablePower = 60
        this.maxUnstablePower = 100

        this.mass = 2.7215
        this.massMOI = 2 / 5 * this.mass * Math.pow(this.rad, 2)
        this.BBcoFri = 0.05;
        this.BCcoFri = 0.008
        this.normalForce = this.mass * 9.8

        this.friction = this.BCcoFri * this.normalForce

        this.angle = 0
        this.velocity = { x: Math.cos(this.angle) * this.speed, y: Math.sin(this.angle) * this.speed }
        this.pos = { x: this.x, y: this.y }
        this.bounciness = 1;

        // this.poc
        // this.normal

        this.mag = 0
        this.allowShoot = true;


        if (color === 'white') {

            // this.mass = 2;
            this.controls = new Controls(this)

        }

    }

    updateAim() {

        this.allowShoot = true;

        if (this.mag >= this.maxStablePower) {

            if (this.controls.addMag) {

                this.mag += 3

            }

        }

        if (this.controls.addDir) {

            this.angle += 0.05;

        }
        if (this.controls.subDir) {

            this.angle -= 0.05;

        }
        if (this.controls.addMag) {

            this.mag += 1;

        }
        if (this.controls.subMag) {

            this.mag -= 1;

        }
        if (this.mag > this.maxUnstablePower) {

            this.mag = this.maxUnstablePower;

        }
        if (this.mag < 0) {

            this.mag = 0;

        }

        if (this.mag >= this.maxStablePower) {

            ctx.strokeStyle = 'red'

        } else {

            ctx.strokeStyle = 'black'

        }
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + Math.cos(this.angle) * this.mag, this.y + Math.sin(this.angle) * this.mag)
        ctx.stroke()

        let stick = new Image()
        stick.src = 'pool-stick3.png'
        let stickWidth = 10;
        let stickHeight = 500;

        ctx.save()
        ctx.beginPath()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle + Math.PI / 2)
        ctx.drawImage(stick, Math.cos(this.mag), (this.mag), 10, 500)
        ctx.restore()

    }
    update(balls) {

        this.allowShoot = false;


        let cushionAngle;


        if (this.x - this.rad < 0) {

            cushionAngle = Math.PI / 2


            let reflectedAngle = 2 * cushionAngle - this.angle

            if (reflectedAngle > 180) {

                reflectedAngle -= 360

            } else if (reflectedAngle < -180) {

                reflectedAngle += 360

            }

            this.angle = reflectedAngle
            this.initialPos = { x: this.x - this.rad, y: this.y }
            this.velocity = { x: Math.cos(this.angle) * this.speed, y: Math.sin(this.angle) * this.speed }

        }

        if (this.x + this.rad > canvas.width) {

            cushionAngle = -Math.PI / 2


            let reflectedAngle = 2 * cushionAngle - this.angle

            if (reflectedAngle > 180) {

                reflectedAngle -= 360

            } else if (reflectedAngle < -180) {

                reflectedAngle += 360

            }

            this.angle = reflectedAngle


            this.initialPos = { x: this.x + this.rad, y: this.y }
            this.velocity = { x: Math.cos(this.angle) * this.speed, y: Math.sin(this.angle) * this.speed }

        }

        if (this.y - this.rad < 0) {

            cushionAngle = Math.PI

            let reflectedAngle = 2 * cushionAngle - this.angle

            if (reflectedAngle > 180) {

                reflectedAngle -= 360

            } else if (reflectedAngle < -180) {

                reflectedAngle += 360

            }

            this.angle = reflectedAngle
            this.initialPos = { x: this.x, y: this.y - this.rad }
            this.velocity = { x: Math.cos(this.angle) * this.speed, y: Math.sin(this.angle) * this.speed }


        }

        if (this.y + this.rad > canvas.height) {

            cushionAngle = -Math.PI

            let reflectedAngle = 2 * cushionAngle - this.angle

            if (reflectedAngle > 180) {

                reflectedAngle -= 360

            } else if (reflectedAngle < -180) {

                reflectedAngle += 360

            }

            this.angle = reflectedAngle
            this.initialPos = { x: this.x, y: this.y + this.rad }
            this.velocity = { x: Math.cos(this.angle) * this.speed, y: Math.sin(this.angle) * this.speed }


        }

        for (let i = 1; i < balls.length; i++) {

            if (balls[i] === this) continue

            if (checkColision(this, balls[i])) {

                let _dist = subtractVector(this, balls[i])

                this.x = this.x - 0.1
                this.y = this.y - 0.1

                let speed = this.speed
                this.speed = this.speed / 1.1

                let angle = Math.atan2(_dist.y, _dist.x)

                console.log(angle * 180 / Math.PI)

                balls[i].angle = angle
                balls[i].speed = speed

                this.angle = (this.angle - angle) + Math.PI/2

                console.log('detected')



            }



        }


        if (this.speed < 0) {

            this.speed = 0;

        }
        if (this.speed > 0) {

            this.speed -= this.friction

        }
        if (Math.abs(this.speed) < this.friction) {

            this.speed -= this.friction / 10;

        }

        this.velocity = { x: Math.cos(this.angle) * this.speed, y: Math.sin(this.angle) * this.speed }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }

    shoot() {

        if ( this.allowShoot) {

            this.speed += this.mag / 2

        }

    }

    draw() {

        ctx.save()
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

    }

}