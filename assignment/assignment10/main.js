var body = document.getElementsByTagName("body")[0];
var score = document.getElementById("score");
var gameArea = document.getElementById("gameArea");
var startScreen = document.getElementById("startScreen");

var TotalScore = 0;
var highScore = localStorage.getItem("highScore");
var enemyCarSpeed = 5;
var lineSpeed = 5;
var TotalLines = [];
var player = { speed: 10, start: false, x: 0, y: 0 };
const  numOfLines = 10;
let enemyCar = []
var PlayerCar;
const numOfEnemyCars = 6;
let keys = {
    ArrowLeft: false,
    ArrowRight: false
}



showStartScreen();
startScreen.addEventListener("click", startGame);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);




function showScore() {
    TotalScore++;
    score.innerHTML = "Your Score: "+TotalScore;
    score.style.color = "white";
    score.style.fontSize = "1.5rem";
    score.style.textAlign = "left";
    score.style.position = "absolute";
    score.style.padding = "2rem 1rem";
    score.style.border = "5px solid black";
    score.style.borderRadius = "20px";
    score.style.fontWeight = "bold";
    score.style.backgroundColor = "blue";
    score.style.top = "10px";
    score.style.left = "10px";
    score.style.width = "250px";
}
function showStartScreen() {
    updateHighScore();
    gameArea.style.display = "none";
    startScreen.style.display = "block";
    startScreen.style.backgroundColor = "green";
    startScreen.style.textAlign = "center";
    startScreen.style.fontSize = "1.5rem";
    startScreen.style.padding = "6rem";
    startScreen.style.margin = "6rem";
    startScreen.style.border = "5px solid black";
    startScreen.style.borderRadius = "20px";
    startScreen.style.width = "50%";
    startScreen.style.height = "500px";
    startScreen.style.color = "white";
    startScreen.style.fontWeight = "bold";
    startScreen.innerHTML = `<h1>Car Racing Game</h1><br><h2>High Score: ${highScore}</h2><button class='btn btn-primary'>Start Game</button>`;
}
function startGame() {
    player.start = true;
    TotalScore = 0;
    startScreen.style.display = "none";
    gameArea.style.display = "block";
    gameArea.innerHTML = "";
    createVerticalLane();
    createVerticalLines();
    createPlayer();
    createEnemy();
    player.x = PlayerCar.offsetLeft;
    player.y = PlayerCar.offsetTop;
    window.requestAnimationFrame(gamePlay);
}
function gamePlay() {
    let myRoad = gameArea.getBoundingClientRect();
    if(player.start){
        moveVerticalLines();
        moveEnemyCar();
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed;}
        if(keys.ArrowRight && player.x < (myRoad.width - 100)){player.x += player.speed;}
        PlayerCar.style.left = `${player.x}px`;
        PlayerCar.style.top = `${player.y}px`;
        showScore();
        window.requestAnimationFrame(gamePlay); 
    }else{
        showStartScreen();
    }
}
function createVerticalLane() {
    gameArea.style.backgroundColor = "gray";
    gameArea.style.width = "500px";
    gameArea.style.height = "100vh";
    gameArea.style.top = "0";
    gameArea.style.position = "relative";
    gameArea.style.border = "10px dashed white";
    gameArea.style.borderBottom = "none";
    gameArea.style.borderTop = "none";
}

function createVerticalLines() {
    for (let i = 0; i < numOfLines; i++) {
        let line = document.createElement("div");
        line.style.width = "5px";
        line.style.height = "60px";
        line.style.backgroundColor = "white";
        line.style.zIndex = "1";
        line.style.position = "absolute"; 
        line.style.top = `${i * 100}px`;
        line.style.left = "33%";
        gameArea.appendChild(line);
        TotalLines.push(line);
    }
    for (let i = 0; i < numOfLines; i++) {
        let line = document.createElement("div");
        line.style.width = "5px";
        line.style.height = "60px";
        line.style.backgroundColor = "white";
        line.style.zIndex = "1";
        line.style.position = "absolute"; 
        line.style.top = `${i * 100}px`;
        line.style.left = "66%";
        gameArea.appendChild(line);
        TotalLines.push(line);
    }
}

function moveVerticalLines() {
    TotalLines.forEach(function (line, index) {
        line.style.top = `${line.offsetTop + lineSpeed}px`;
        if (line.offsetTop > gameArea.offsetHeight) {
            line.style.top = "-100px";
        }
    })
}
function checkCollision(player, enemy) {
    let playerCar = player.getBoundingClientRect();
    let enemyCar = enemy.getBoundingClientRect();
    if (playerCar.top <= enemyCar.bottom && playerCar.right >= enemyCar.left && playerCar.left <= enemyCar.right && playerCar.bottom >= enemyCar.top) {
        return true;
    }
    return false;
}
function moveEnemyCar() {
    enemyCar.forEach(function (item, index) {
        if(checkCollision(PlayerCar, item)){
            player.start = false;
        }
        item.style.top = `${item.offsetTop + enemyCarSpeed}px`;
        if (item.offsetTop > gameArea.offsetHeight) {
            item.style.top = "-1200px";
        }
    })
}
function createCar() {
    let car = document.createElement("div");
    car.style.width = "80px";
    car.style.height = "160px";
    car.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    car.style.position = "absolute";
    car.style.top = "0px";
    car.style.left = "0px";
    car.style.zIndex = "2";
    gameArea.appendChild(car);
    return car;
}
function createPlayer() {
    PlayerCar = createCar();
    PlayerCar.style.backgroundColor = "red";
    PlayerCar.classList.add("playerCar");
    PlayerCar.style.top = "80%";
}
function createEnemy(){
    for (let i = 0; i < numOfEnemyCars; i++) {
        let myCar = createCar();
        myCar.style.left = `${Math.random() * (gameArea.offsetWidth - 80)}px`;
        myCar.style.top = `${350*(i+1)*(-1)}px`;
        myCar.classList.add("enemyCar");
        enemyCar.push(myCar);
    }
}

function keyDownHandler(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function keyUpHandler(e) {
    e.preventDefault();
    keys[e.key] = false;
}    


function updateHighScore() {
    if(highScore == null){
        highScore = 0;
        localStorage.setItem("highScore", highScore);
    }
    if (TotalScore > highScore) {
        highScore = TotalScore;
        localStorage.setItem("highScore", highScore);
    }
}














