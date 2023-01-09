function lerp(A, B, t) {

  return A + (B - A) * t

}

function getDistance(x1, y1, x2, y2) {

  let dx = x1 - x2
  let dy = y1 - y2

  return Math.sqrt(dx * dx + dy * dy)

}

function getNormal(vec) {

  let length = Math.sqrt(vec.x * vec.x + vec.y * vec.y)

  return {

    x: vec.x / length,
    y: vec.y / length

  }

}

function getNormals(ball1, ball2) {
  let collisionVector = {
    x: ball1.x - ball2.x,
    y: ball1.y - ball2.y
  };

  let collisionVectorLength = Math.sqrt(collisionVector.x * collisionVector.x + collisionVector.y * collisionVector.y);

  return {
    x: collisionVector.x / collisionVectorLength,
    y: collisionVector.y / collisionVectorLength
  };
}

function subtractVector(vec1, vec2) {

  return { x: vec2.x - vec1.x, y: vec2.y - vec1.y }

}

function getDot(vec1, vec2) {


  return vec1.x * vec2.x + vec1.y * vec2.y

}

function checkColision(ball1, ball2) {

  if (getDistance(ball1.x, ball1.y, ball2.x, ball2.y) < ball1.rad + ball2.rad) {

    return true

  } else {

    return false

  }

}

function checkColisionPockets(ball1, pocket) {

  if (getDistance(ball1.x, ball1.y, pocket.x, pocket.y) < ball1.rad + 10) {

    return true

  } else {

    return false

  }

}

function previewIntersection([start, end], ball) {

  let v1 = {}
  let v2 = {}

  v1.x = end.x - start.x
  v1.y = end.y - start.y
  v2.x = start.x - ball.x
  v2.y = start.y - ball.y

  let b = (v1.x * v2.x + v1.y * v2.y)
  let c = 2 * (v1.x * v1.x + v1.y * v1.y)

  b *= -2
  let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - (ball.rad * ball.rad) * 3.9))

  if (isNaN(d)) {

    return [];

  }

  let u1 = (b - d) / c
  let point = []
  let p1 = {}

  if (u1 <= 1 && u1 >= 0) {

    p1.x = start.x + v1.x * u1
    p1.y = start.y + v1.y * u1

    point[0] = p1


  }


  return point



}