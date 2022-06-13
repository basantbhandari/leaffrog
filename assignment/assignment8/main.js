// create a container
const myArea = document.createElement('div');
const myOffset = 100;

// getting the container hight and width
let myAreaWidth = window.innerWidth - myOffset;
let myAreaHeight = window.innerHeight - myOffset;
myArea.style.width = myAreaWidth + "px";
myArea.style.height = myAreaHeight + "px";
myArea.style.position = "relative";


const body = document.body;
body.appendChild(myArea);


// for window resizing
window.addEventListener('resize', () => {
    myAreaWidth = window.innerWidth - myOffset;
    myAreaHeight = window.innerHeight - myOffset;
    myArea.style.width = myAreaWidth + "px";
    myArea.style.height = myAreaHeight + "px";

    allCircle.forEach(circle => {
        if(circle.y > myAreaHeight) {
            circle.y = myAreaHeight;
            circle.move(myTimeStamp);
        }
        if(circle.x > myAreaWidth) {
            circle.x = myAreaWidth;
            circle.move(myTimeStamp);
        }
    })
}
)

// function to check the collision between circle
function checkCollision(circle1, circle2) {
    let x1 = circle1.x + circle1.radius;
    let y1 = circle1.y + circle1.radius;
    let x2 = circle2.x + circle2.radius;
    let y2 = circle2.y  + circle2.radius;
    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    if (distance <= circle1.radius + circle2.radius) {
        return true;
    }else{
        return false;
    }
}

// function need to be called when there is collision between two object
function collision(circle1, circle2) {
    let myCollisionVector = {
        x: circle1.x - circle2.x,
        y: circle1.y - circle2.y
    }
    let myCollisionVectorLength = Math.sqrt(Math.pow(myCollisionVector.x, 2) + Math.pow(myCollisionVector.y, 2))
    let directionOfCollision = {
        x: myCollisionVector.x / myCollisionVectorLength,
        y: myCollisionVector.y / myCollisionVectorLength
    }
    let relativeVelocityOfTwoObject = {
        x: circle1.velocityX - circle2.velocityY,
        y: circle1.velocityY - circle2.velocityY
    }
    let dotProductSpeed = relativeVelocityOfTwoObject.x * directionOfCollision.x + relativeVelocityOfTwoObject.y * directionOfCollision.y
    return {dotProductSpeed, directionOfCollision}
}

// checking the collision on each circle
function checkCollisionOnEachCircle(allCircle) {
    // Resets Collision status
    for (let i = 0; i < allCircle.length; i++) {
        allCircle[i].isColliding = false;
    }
    for (let i = 0; i < allCircle.length; i++) {
        for (let j = i + 1; j < allCircle.length; j++) {
            if (checkCollision(allCircle[i], allCircle[j])) {
                allCircle[i].isColliding = true
                allCircle[j].isColliding = true
                let {dotProductSpeed, directionOfCollision} = collision(allCircle[i], allCircle[j])
                if (dotProductSpeed < 0) {
                    break
                }
                allCircle[i].velocityX += dotProductSpeed * directionOfCollision.x;
                allCircle[i].velocityY += dotProductSpeed * directionOfCollision.y;
                allCircle[j].velocityX -= dotProductSpeed * directionOfCollision.x;
                allCircle[j].velocityY -= dotProductSpeed * directionOfCollision.y;

            }
        }
    }
}



// checking the wall collision
function checkWallCollision(allCircle) {
    let myCircle;
    let restitution = 0.5;
    for (let i = 0; i < allCircle.length; i++) {
        myCircle = allCircle[i];

        if (myCircle.x + myCircle.radius*2 > myAreaWidth) {
            myCircle.velocityX = -Math.abs(myCircle.velocityX * restitution);
        }
        if (myCircle.x <= 0) {
            myCircle.velocityX =  Math.abs(myCircle.velocityX * restitution);
        }



        if (myCircle.y + myCircle.radius*2 > myAreaHeight) {
            myCircle.velocityY = -Math.abs(myCircle.velocityY * restitution);
        }
        if (myCircle.y <= 0) {
            myCircle.velocityY = Math.abs(myCircle.velocityY * restitution);
        }

    }

}

// lets create a circle class
class Circle {
    constructor(x, y, radius, color, velocityX, velocityY) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.isColliding = false
        // create the circle div
        this.circle = document.createElement('div')
        myArea.appendChild(this.circle)
    }
    // lets draw the circle
    draw() {
        this.circle.style.width = this.radius * 2 + "px"
        this.circle.style.height = this.radius * 2 + "px"
        this.circle.style.backgroundColor = this.color
        this.circle.style.position = "absolute"
        this.circle.style.left = this.x + "px"
        this.circle.style.top = this.y + "px"
        this.circle.style.borderRadius = "50%"
        this.circle.style.zIndex = "1"
    }
    // lets move the circle
    move(timestamp) {
        this.x += this.velocityX*timestamp;
        this.y += this.velocityY*timestamp;
        this.circle.style.left = this.x + "px"
        this.circle.style.top = this.y + "px"

    }
}
// random number generator from interpolation technique
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//  generate circles
function generateCircles(numberOfCircle) {
    let allCircle = []
    for (let i = 0; i < numberOfCircle; i++) {
        allCircle.push(
            new Circle(
                random(0, myAreaWidth),
                random(0, myAreaHeight),
                random(5, 10),
                `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
                random(-80, 80),
                random(-80, 80)
            )
        );
    }   
    return allCircle;
}


// generate the circles
numberOfCircle = 40
let allCircle = generateCircles(numberOfCircle)
allCircle.forEach((circle) => {circle.draw()})


// lets create the gameplay function
function gamePlay(myTimeStamp) {
    checkCollisionOnEachCircle(allCircle)
    checkWallCollision(allCircle)
    allCircle.forEach((circle) => {circle.move(myTimeStamp)})
    window.requestAnimationFrame(()=>{gamePlay(myTimeStamp)})

}


var myTimeStamp = 0.01
gamePlay(myTimeStamp)
