let totalScore = 0;
var highScore = localStorage.getItem("highScore");
let gameOver = false;
let gameStarted = false;
let gamePaused = false;
let isKeyPressed = false;
var startScreen = document.getElementById('startScreen');
var gameArea = document.getElementById('gameArea');
var ground = document.createElement('div');
var scoreDiv = document.getElementById('scoreArea');
let obstacleLength = 20;
let gapHight = 200;
let obstacleSpeed = 3;
let gravity_slope = 2;
let gravity_constant = 1;
let playerJumpSpeed = 2;
let obstacles = {top:[] , bottom:[]};

var birdType = ["blue", "red"]
function getRandomBird(){
    randomIndex = Math.floor(Math.random()*10)%2;
    return birdType[randomIndex];
}

var pipeType = ["green", "red"]
function getRandomPipe(){
    randomIndex = Math.floor(Math.random()*10)%2;
    return pipeType[randomIndex];
}


var backgroundType = ["day", "night"]
function getRandomBackground(){
    randomIndex = Math.floor(Math.random()*10)%2;
    return backgroundType[randomIndex];
}

var gameType = {
    myBird: getRandomBird(),
    myPipe: getRandomPipe(),
    myBackground: getRandomBackground()

}


var gameContainer = document.body
gameContainer.style.position = 'relative';
gameContainer.style.width = '100%';
gameContainer.style.height = '100vh';
gameContainer.style.display = 'flex';
gameContainer.style.justifyContent = 'center';
gameContainer.style.alignItems = 'center';
gameContainer.style.backgroundImage = 'url("https://source.unsplash.com/random?landscape,city")';
gameContainer.style.backgroundSize = 'cover';
gameContainer.style.backgroundRepeat = 'repeat';
gameContainer.style.backgroundColor = 'cyan';


function createScore() {
    totalScore++;
    scoreDiv.style.position = 'absolute';
    scoreDiv.style.top = '50px';
    scoreDiv.style.left = '50px';
    scoreDiv.style.width = '200px';
    scoreDiv.style.height = 'auto';
    scoreDiv.style.color = '#fff';
    scoreDiv.style.fontSize = '1.2rem';
    scoreDiv.style.zIndex = '800';
    scoreDiv.style.textAlign = 'center';
    scoreDiv.innerHTML = `<h1>Score: ${totalScore}</h1>`;

}


function createStartScreen(){
    startScreen.style.position = 'absolute';
    startScreen.style.width = '60%';
    startScreen.style.height = '60vh';
    startScreen.style.textAlign = 'center';
    startScreen.style.margin = '50%';
    startScreen.style.backgroundImage = 'url("https://source.unsplash.com/random?landscape,Fashion")';
    startScreen.style.backgroundSize = 'cover';
    startScreen.style.backgroundRepeat = 'no-repeat';
    startScreen.style.border = '10px solid white';
    startScreen.style.color = '#fff';
    startScreen.style.padding = '50px';
    startScreen.style.fontSize = '2.5rem';
    startScreen.style.borderRadius = '10px';
    startScreen.innerHTML = `<h1>Flappy Bird</h1><br> <img src='./sprites/gameover.png'/> <br> high Score : ${highScore} <br> <button class="btn btn-success" id="startButton">Start Game</button>`;
}

createStartScreen();



function startGame() {
    startScreen.style.display = 'none';
    resetGame();
    createGameArea();
    createGround();
    createScore();
    createPlayer();
    createObstacle();
    updateHighScore();
    gameStarted = true;
    gameArea.style.display = 'block';
    scoreDiv.style.display = 'block';
    playGameLoop();
}
function resetGame(){
    gameArea.innerHTML = '';
    totalScore = 0;
    gameOver = false;
    gameStarted = false;
    gamePaused = false;
    isKeyPressed = false;
    gravity_slope = 2;
    obstacleSpeed = 3;
    gravity_constant = 1;
    playerJumpSpeed = 2;
    obstacles = {top:[] , bottom:[]};
    ground.innerHTML = '';
}

function playerGroundCollisionAndGravity() {
    gravity_slope = gravity_slope +0.001
    player.y =player.y + gravity_slope + gravity_constant;
    player.draw();
    if (player.y > ground.offsetTop - player.height) {
        gameOver = true;
        gameStarted = false;
        gamePaused = false;
    }
}

function playerJump(){
    player.y = player.y - playerJumpSpeed - gravity_slope * playerJumpSpeed;
    player.draw();
}
function playGameLoop() {
    if (gameStarted) {
        if(gameType.myBird == "blue"){
            myplayer = document.getElementsByClassName('player__blue')[0];
        }else{
            myplayer = document.getElementsByClassName('player__red')[0];
        }
        createScore()
        moveObstacles();
        updateHighScore();
        if (isKeyPressed) {
            playerJump();
            if(gameType.myBird == "blue"){
                myplayer.classList.add('jump__animation__blue');
            }else{
                myplayer.classList.add('jump__animation__red');
            }
        }
        if(!isKeyPressed){
            if(gameType.myBird == "blue"){
                if(myplayer.classList.contains('jump__animation__blue')){
                    myplayer.classList.remove('jump__animation__blue');
                }            
            }else{
                    if(myplayer.classList.contains('jump__animation__red')){
                        myplayer.classList.remove('jump__animation__red');
                    }
            }
        }
        playerGroundCollisionAndGravity();
        window.requestAnimationFrame(playGameLoop);
    }else{
        startScreen.innerHTML = '';
        createStartScreen();
        startScreen.style.display = 'block';
        gameArea.style.display = 'none';
        }
}

function createGameArea() {
    gameArea.style.position = 'absolute';
    gameArea.style.width   = '100%';
    gameArea.style.height  = '100vh';
    gameArea.style.overflow = 'hidden'
    gameArea.style.display = 'none';
    if(gameType.myBackground == "day"){
        gameArea.classList.add('gameArea__day');
    }else{
        gameArea.classList.add('gameArea__night');
    }
}
function createGround() {
    ground.style.position = 'absolute';
    ground.style.width = '700%';
    ground.style.height = '10vh';
    ground.style.bottom = '0';
    ground.style.zIndex = '200';
    ground.style.left = '0';
    ground.classList.add('ground');
    gameArea.appendChild(ground);
}
function checkCollision(player, obstacle) {
    let playerRect = player.element.getBoundingClientRect();
    let obstacleRect = obstacle.element.getBoundingClientRect();
    return !(playerRect.right < obstacleRect.left || playerRect.left > obstacleRect.right || playerRect.bottom < obstacleRect.top || playerRect.top > obstacleRect.bottom);
}
function updateHighScore() {
    if(highScore == null){
        highScore = 0;
        localStorage.setItem("highScore", highScore);
    }
    if (totalScore > highScore) {
        highScore = totalScore;
        localStorage.setItem("highScore", highScore);
    }
}
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.element = document.createElement('div');
        this.draw();
    }
    draw() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        if(gameType.myBird == "blue"){
            this.element.classList.add("player__blue")
        }
        else{
            this.element.classList.add("player__red")
        }
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.position = 'absolute';
        gameArea.appendChild(this.element);
    }
}
class Obstacle {
    constructor(x, y, width, height, flag) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flag = flag;
        this.element = document.createElement('div');
        this.draw();
    }
    draw() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        if(this.flag == 'top'){
            if(gameType.myPipe == "green"){
                this.element.classList.add("obstacle__top__green")
            }else{
                this.element.classList.add("obstacle__top__red")
            }
        }
        if(this.flag == 'bottom'){
            if(gameType.myPipe == "green"){
                this.element.classList.add("obstacle__bottom__green")
            }else{
                this.element.classList.add("obstacle__bottom__red")
            }
        }
        this.element.classList.add("obstacle")
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '100';
        gameArea.appendChild(this.element);
    }
}
function moveObstacles() {
    obstacles.top.forEach(obstacle => {
        if(checkCollision(player,obstacle)){
            gameOver = true;
            gamePaused = true;
            gameStarted = false;
        }
        obstacle.x -= obstacleSpeed;
        if(obstacle.x < -100){
            obstacle.x = 3900;
        }
        obstacle.draw();
    });
    obstacles.bottom.forEach(obstacle => {
        if(checkCollision(player, obstacle)){
            gameOver = true;
            gamePaused = true;
            gameStarted = false;
        }
        obstacle.x -= obstacleSpeed;
        if(obstacle.x < -100){
            obstacle.x = 3900;
        }
        obstacle.draw();
    });
}
function createPlayer(){
    player = new Player(20, 0, 50, 50 );
    player.element.style.top = '50%';
}
function createObstacle(){
    for (let i = 0; i < obstacleLength; i++) {
        let x_top = 200*(i+1) + 400;
        let y_top = 0;
        let width_top = 50;
        let height_top = Math.floor(Math.random() * (800/2 - 200)) + 200;
        obstacles.top.push(new Obstacle(x_top, y_top, width_top, height_top, 'top'));
        let x_bottom = 200*(i+1) + 400;
        let y_bottom = height_top + gapHight;
        let width_bottom = 50;
        let height_bottom = gameContainer.offsetHeight - height_top - gapHight;
        obstacles.bottom.push(new Obstacle(x_bottom, y_bottom, width_bottom, height_bottom, 'bottom'));
    }    
}
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
startScreen.addEventListener('click', startGame);
window.addEventListener('resize', updateGameArea);
function updateGameArea() {
    gameArea.style.width   = '100%';
    gameArea.style.height  = '100vh';
}
function keyDownHandler(e) {
    e.preventDefault();
    isKeyPressed = true;
}
function keyUpHandler(e) {
    e.preventDefault();
    isKeyPressed = false;
}    
function increaseComplexity() {
    obstacleSpeed += 2;
}
setInterval(()=>{
    increaseComplexity();
}, 1000*60*1);

