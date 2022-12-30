function lerp(A,B,t){

    return A + (B - A)*t

}

function getDistance(x1,y1,x2,y2){

    let dx = x2 - x1
    let dy = y2 - y1

    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))

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

  function subtractVector(vec1,vec2){

    return {x : vec2.x - vec1.x, y : vec2.y - vec1.y}

  }

function getDot(vec1,vec2){


    return vec1.x * vec2.x + vec1.y + vec2.y

}

function checkColision(ball1,ball2){

    if(getDistance(ball1.x,ball1.y,ball2.x,ball2.y) < ball1.rad + ball2.rad){

      return true  
        
    } else{

        return false

    }

    

}