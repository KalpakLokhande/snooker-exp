const canvas = document.getElementById('canvas')

canvas.height = innerHeight;
canvas.width = innerWidth;

const ctx = canvas.getContext('2d')

const balls = []

const Cue = new Ball(250, canvas.height / 2, 18, 'white')
const ball = new Ball(canvas.width - 500, canvas.height / 2, 18, 'red')
const ball1 = new Ball(canvas.width - 500 + 32, canvas.height / 2 - 19, 18, 'red')
const ball2 = new Ball(canvas.width - 500 + 32, canvas.height / 2 + 19, 18, 'red')
const ball3 = new Ball(canvas.width - 500 + 64, canvas.height / 2, 18, 'red')
const ball4 = new Ball(canvas.width - 500 + 64, canvas.height / 2 + 37, 18, 'red')
const ball5 = new Ball(canvas.width - 500 + 64, canvas.height / 2 - 37, 18, 'red')
const ball6 = new Ball(canvas.width - 500 + 96, canvas.height / 2 - 19, 18, 'red')
const ball7 = new Ball(canvas.width - 500 + 96, canvas.height / 2 + 19, 18, 'red')
const ball8 = new Ball(canvas.width - 500 + 96, canvas.height / 2 + 56, 18, 'red')
const ball9 = new Ball(canvas.width - 500 + 96, canvas.height / 2 - 56, 18, 'red')

// balls.push(Cue, ball)
balls.push(Cue, ball, ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9)

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


function drawPockets(){

    for(let i = 0; i < pockets.length; i++){

        ctx.beginPath()
        ctx.arc(pockets[i].x,pockets[i].y,pockets[i].rad,0,Math.PI*2)
        ctx.fill()

    }

}

animateAim()


function animateAim() {


    ctx.clearRect(0, 0, canvas.width, canvas.height)

    Cue.updateAim()


    for (let i = 0; i < balls.length; i++) {

        balls[i].draw()

    }

    drawPockets()

    if (Cue.velocity.x === 0 && Cue.velocity.y === 0) {

        requestAnimationFrame(animateAim)

    } else {

        return requestAnimationFrame(animateShoot)

    }


}


function animateShoot() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < balls.length; i++) {

        for (let j = i + 1; j < balls.length; j++) {

            if (checkColision(balls[i], balls[j])) {

                Ball.Collision(balls[i], balls[j])

            }

        }

        for(let j = 0; j < pockets.length; j++){

            if(checkColisionPockets(balls[i],pockets[j])){

                balls[i].color = 'black'

            }

        }

        balls[i].update()


    }

    drawPockets()


    for (let i = 0; i < balls.length; i++) {

        balls[i].draw()

    }

    let moving = []

    for (let i = 0; i < balls.length; i++) {

        if (balls[i].velocity.x === 0 && balls[i].velocity.y === 0) {

            moving.push(balls[i])

        }

    }

    if (moving.length != balls.length) {

        requestAnimationFrame(animateShoot)

    } else {

        return animateAim()

    }

}







