class Ball {

    constructor(x, y, rad, color) {

        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color

        
        this.force = 0
        this.angle = 0

        this.maxStablePower = 25
        this.maxUnstablePower = 30

        this.mass = 0.17
        this.BCcoFri = 0.07
        this.normalForce = this.mass * 9.8

        this.friction = this.BCcoFri * this.normalForce
        this.velocity = { x: 0, y: 0 }

        this.allowShoot = true;


        if (this.color === 'white') {

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

            this.angle += 0.02;

        }
        if (this.controls.subDir) {

            this.angle -= 0.02;

        }
        if (this.controls.addMag) {

            this.force += 1;

        }
        if (this.controls.subMag) {

            this.force -= 1;

        }
        if (this.force > this.maxUnstablePower) {

            this.force = this.maxUnstablePower;

        }
        if (this.force < 0) {

            this.force = 0;

        }

       
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 3;
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + Math.cos(this.angle) * this.force * 3, this.y + Math.sin(this.angle) * this.force * 3)
        ctx.stroke()
        ctx.restore()

        let stick = new Image()
        stick.src = 'pool-stick3.png'

        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle + Math.PI/2)
        ctx.beginPath()
        ctx.drawImage(stick, Math.sin(this.force), this.force * 3, 15,900)
        ctx.restore()

    }
    update() {

        this.allowShoot = false;

        this.angle = Math.atan2(this.velocity.y, this.velocity.x)
        this.force = Math.hypot(this.velocity.x, this.velocity.y)

        if (this.force > 0) {

            this.force -= this.friction

        }
        if (this.force < 0) {

            this.force += this.friction

        }
        if (Math.abs(this.force) < this.friction) {

            this.force = 0

        }

        if (this.x - this.rad < 0) {

            this.x += (this.x + this.rad) * 0.2

            this.angle = (2 * Math.PI / 2) - this.angle

        }

        if (this.x + this.rad > canvas.width) {

            this.x += (this.x - canvas.width) * 0.2

            this.angle = (2 * -Math.PI) / 2 - this.angle

        }

        if (this.y - this.rad < 0) {

            this.y += (this.y + this.rad) * 0.2

            this.angle = (2 * Math.PI) - this.angle

        }

        if (this.y + this.rad > canvas.height) {

            this.y += (this.y - canvas.height) * 0.2

            this.angle = (2 * -Math.PI) - this.angle

        }

        this.velocity.x = Math.cos(this.angle) * this.force
        this.velocity.y = Math.sin(this.angle) * this.force

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }

    shoot() {

        if (this.allowShoot) {

            this.velocity.x = Math.cos(this.angle) * this.force
            this.velocity.y = Math.sin(this.angle) * this.force

        }

    }

    draw() {

        ctx.save()
        ctx.fillStyle = this.color
        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.restore()

    }

    static Collision(ball1, ball2) {

        ball1.x +=  (ball1.x - ball2.x) * 0.1
        ball1.y +=  (ball1.y - ball2.y) * 0.1


        const normal = {
            x: ball2.x - ball1.x,
            y: ball2.y - ball1.y
        }

        const dist = getDistance(ball1.x, ball1.y, ball2.x, ball2.y)
        normal.x /= dist
        normal.y /= dist

        const tangent = {
            x: -normal.y,
            y: normal.x
        }

        const v1n = getDot(ball1.velocity, normal)
        const v1t = getDot(ball1.velocity, tangent)
        const v2n = getDot(ball2.velocity, normal)
        const v2t = getDot(ball2.velocity, tangent)

        const newV1n = (v1n * (ball1.mass - ball2.mass) + 2 * ball2.mass * v2n) / (ball1.mass + ball2.mass)
        const newV2n = (v2n * (ball2.mass - ball1.mass) + 2 * ball1.mass * v1n) / (ball1.mass + ball2.mass)

        ball1.velocity.x = newV1n * normal.x + v1t * tangent.x
        ball1.velocity.y = newV1n * normal.y + v1t * tangent.y
        ball2.velocity.x = newV2n * normal.x + v2t * tangent.x
        ball2.velocity.y = newV2n * normal.y + v2t * tangent.y

    }

}