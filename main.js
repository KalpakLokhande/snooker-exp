const canvas = document.getElementById('canvas')

canvas.height = innerHeight;
canvas.width = innerWidth;

const ctx = canvas.getContext('2d')

const balls = []

const Cue = new Ball(250, canvas.height / 2, 18, 'white')
const ball1 = new Ball(canvas.width - 400, canvas.height / 2, 18, 'red')
const ball2 = new Ball(canvas.width - 400 + 32, canvas.height / 2 - 19, 18, 'red')
const ball3 = new Ball(canvas.width - 400 + 32, canvas.height / 2 + 19, 18, 'red')
const ball4 = new Ball(canvas.width - 400 + 64, canvas.height / 2, 18, 'red')
const ball5 = new Ball(canvas.width - 400 + 64, canvas.height / 2 + 37, 18, 'red')
const ball6 = new Ball(canvas.width - 400 + 64, canvas.height / 2 - 37, 18, 'red')
const ball7 = new Ball(canvas.width - 400 + 96, canvas.height / 2 - 19, 18, 'red')
const ball8 = new Ball(canvas.width - 400 + 96, canvas.height / 2 + 19, 18, 'red')
const ball9 = new Ball(canvas.width - 400 + 96, canvas.height / 2 + 56, 18, 'red')
const ball10 = new Ball(canvas.width - 400 + 96, canvas.height / 2 - 56, 18, 'red')

const blackBall = new Ball(canvas.width - 200, canvas.height / 2, 18, 'black')
const pinkBall = new Ball(canvas.width - 550, canvas.height/2, 18, '#fdab9f')
const blueBall = new Ball(canvas.width / 2, canvas.height/2, 18, '#3944bc')
const yellowBall = new Ball(canvas.width / 4, canvas.height - 200, 18, 'yellow')
const brownBall = new Ball(canvas.width / 4, canvas.height / 2, 18, 'brown')
const greenBall = new Ball(canvas.width/ 4, 200, 18, 'green')



// balls.push(Cue, ball)
balls.push(Cue, ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, blackBall, pinkBall, blueBall, yellowBall, brownBall, greenBall)

const pockets = [];
const pocketsRad = 32
pockets.push(
    { x: 8, y: 8, rad: pocketsRad },
    { x: canvas.width / 2, y: 0, rad: pocketsRad },
    { x: canvas.width - 8, y: 8, rad: pocketsRad },
    { x: 8, y: canvas.height - 8, rad: pocketsRad },
    { x: canvas.width / 2, y: canvas.height, rad: pocketsRad },
    { x: canvas.width - 8, y: canvas.height - 8, rad: pocketsRad }
)


function drawPockets() {

    for (let i = 0; i < pockets.length; i++) {

        ctx.beginPath()
        ctx.arc(pockets[i].x, pockets[i].y, pockets[i].rad, 0, Math.PI * 2)
        ctx.fill()

    }

    ctx.save()
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(canvas.width/4,0)
    ctx.lineTo(canvas.width/4,canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(canvas.width/4,canvas.height/2,160,Math.PI/2,-Math.PI/2)
    ctx.stroke()

    ctx.restore()




}



animateAim(balls)


function animateAim() {


    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawPockets()


    for (let i = 0; i < balls.length; i++) {

        balls[i].draw()

    }


    Cue.updateAim()


    if (Cue.velocity.x === 0 && Cue.velocity.y === 0) {

        requestAnimationFrame(animateAim)

    } else {

        return requestAnimationFrame(animateShoot)

    }


}


function animateShoot() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawPockets()


    for (let i = 0; i < balls.length; i++) {

        if (!balls[i].scored) {

            for (let j = i + 1; j < balls.length; j++) {

                if (checkColision(balls[i], balls[j])) {

                    Ball.Collision(balls[i], balls[j])

                }

            }

            for (let j = 0; j < pockets.length; j++) {

                if (checkColisionPockets(balls[i], pockets[j])) {

                    balls[i].scored = true;
                    balls[i].color = 'black'

                }

            }

            balls[i].update()

        }


    }



    for (let i = 0; i < balls.length; i++) {

        balls[i].draw()

    }

    let moving = []

    for (let i = 0; i < balls.length; i++) {

        if (balls[i].velocity.x === 0 && balls[i].velocity.y === 0) {

            moving.push(balls[i])

        }
        if (balls[i].scored) {

            moving.push(balls[i])

        }

    }

    console.log(moving.length)

    if (moving.length != balls.length) {

        requestAnimationFrame(animateShoot)

    } else {

        return animateAim()

    }

}







