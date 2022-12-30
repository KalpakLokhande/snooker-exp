const canvas = document.getElementById('canvas')

canvas.height = innerHeight;
canvas.width = innerWidth;

const ctx = canvas.getContext('2d')

const balls = []

const Cue = new Ball(200, 200, 18, 'white')
const ball = new Ball(500, 300, 18, 'yellow')
// const ball1 = new Ball(500, 400, 18, 'red')

balls.push(Cue, ball)

animateAim()



function animateAim() {


    ctx.clearRect(0, 0, canvas.width, canvas.height)

    Cue.updateAim()


    for (let i = 0; i < balls.length; i++) {

        balls[i].draw()

    }

    if (Cue.speed <= 0) {

        requestAnimationFrame(animateAim)

    } else {

        requestAnimationFrame(animateShoot)

    }


}

let ar = []
let ar1 = []

function animateShoot() {

    ar.push({ x: Cue.x, y: Cue.y })
    ar1.push({x : ball.x, y : ball.y})
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < balls.length; i++) {

        balls[i].update(balls)

    }

    for (let i = 0; i < balls.length; i++) {

        balls[i].draw()

    }


    for (let i = 0; i < ar.length; i++) {

        if(ar[i + 1]){

            ctx.save()
            ctx.strokeStyle = 'black'
            ctx.setLineDash([1,1])
            ctx.beginPath()
            ctx.moveTo(ar[i].x, ar[i].y)
            ctx.lineTo(ar[i + 1].x, ar[i + 1].y)
            ctx.stroke()
            ctx.restore()


        }

    }
    for (let i = 0; i < ar1.length; i++) {

        if(ar1[i + 1]){

            ctx.save()
            ctx.strokeStyle = 'yellow'
            ctx.setLineDash([1,1])

            ctx.beginPath()
            ctx.moveTo(ar1[i].x, ar1[i].y)
            ctx.lineTo(ar1[i + 1].x, ar1[i + 1].y)
            ctx.stroke()
            ctx.restore()


        }

    }


    
    
    if (Cue.speed > 0) {
        
        
        requestAnimationFrame(animateShoot)

    } else {

        requestAnimationFrame(animateAim)

    }

}







