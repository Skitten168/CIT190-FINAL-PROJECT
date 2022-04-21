const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakeSection{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width/tileCount-2;//creating a tile size  that will fit in the canvas
let headX = 10;
let headY = 10;
const snakeSections = [];
let tailLength = 2;

let fruitX = 5;
let fruitY = 5;

let inputsXVelocity=0;
let inputsYVelocity=0;

let xVelocity=0;
let yVelocity=0;

let score = 0;

const gulpSound = new Audio("media/gulp_sound.wav");

let previousXVelocity=0;
let previousYVelocity=0;
//first audio attempt
//game loop
// function sound(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     document.body.appendChild(this.sound);
//     this.play = function(){
//         this.sound.play();
//     }
//     this.stop = function(){
//         this.sound.pause();
//     }
//     }

//loop for game play
function drawGame(){
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    console.log("End", xVelocity, yVelocity);
//prevent the snake from crashing into itself by going in the opposite direction.
    if(previousXVelocity ===1 && xVelocity === -1){
        xVelocity = previousXVelocity;
    }
    if (previousXVelocity === -1 && xVelocity === 1) {
        xVelocity = previousXVelocity;
      }
    if (previousYVelocity === -1 && yVelocity === 1) {
    yVelocity = previousYVelocity;
    }
    if (previousYVelocity === 1 && yVelocity === -1) {
    yVelocity = previousYVelocity;
    }

    previousXVelocity = xVelocity;
    previousYVelocity = yVelocity;

    changeSnakePosition();
    let status = gameStatus();
    if(status){
        document.body.removeEventListener("keydown", keyDown);
        return;
    }
    clearScreen();
    checkFruitCollision();
    drawFruit();
    drawSnake();
    drawScoreBoard();
    //increasing difficulty with game progression
    if(score >2){
        speed = 9;
    }
    if(score>5){
        speed=11;
    }
    if (score>10){
        speed=13;
    }
    if(score>25){
        speed=17
    }
    if(score>50){
        speed= 25
    }
    setTimeout(drawGame, 1000/ speed);
}
//function to end the game for various reasons
function gameStatus(){
    let gameOver= false;

    if(yVelocity===0 && xVelocity ===0){
        return false;
    }
    //wall collision check
    if(headX <0){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }
    for(let i =0; i < snakeSections.length; i++){
        let section = snakeSections[i];
        if(section.x === headX && section.y === headY){
            gameOver = true;
            break;
        }
    } 

    if (gameOver){
        ctx.fillStyle="white";
        ctx.font = "55px Fantasy";
        //making the text color fancy!!
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "darkorange");
        gradient.addColorStop("0.5", "yellow");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!!", canvas.width / 7, canvas.height/2);
    }
    return gameOver;
}

function drawScoreBoard(){
    ctx.fillStyle = "yellow";
    ctx.font = "18px Fantasy"
    ctx.fillText("Score= " + score, canvas.width - 100, 20);
}

function clearScreen(){
    ctx.fillStyle = 'DarkOliveGreen';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'DarkKhaki';
    for(let i =0; i < snakeSections.length; i++){
        let section = snakeSections[i];
        ctx.fillRect(section.x * tileCount, section.y*tileCount, tileSize, tileSize)
    }

    snakeSections.push(new snakeSection(headX, headY)); //adding the next section where the head was to 'show movement'
    while(snakeSections.length > tailLength){
        snakeSections.shift();//removes the last section to show 'movement' if the snake sections exceed the snake length
    }
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);
    
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawFruit(){
    ctx.fillStyle = "red";
    ctx.fillRect(fruitX* tileCount, fruitY* tileCount, tileSize, tileSize)
}

function checkFruitCollision(){
    if(fruitX === headX && fruitY == headY){
       createFruit();
        tailLength ++;//add one tail section each time collision is detected
        score ++;//add one to score with each collision
      gulpSound.play();
    }
}

function createFruit(){
    let newFruitX = Math.floor(Math.random()*tileCount);
    let newFruitY = Math.floor(Math.random()*tileCount);

    const generatedFruitPositionInSnake = snakeSections.some(
        (section) => section.x === newFruitX || section.y === newFruitY
    );
    if(headX == newFruitX && headY == newFruitY){
        createFruit();
    }
    else if (generatedFruitPositionInSnake) {
        createFruit();
    }
    else {
        fruitX = newFruitX;
        fruitY = newFruitY;
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    console.log(inputsXVelocity, inputsYVelocity);
    //setting 'up' movement to up key
    if(event.keyCode == 38){//up arrow keycode = 38
        inputsYVelocity = -1;//moving up one position by decrementing y
        inputsXVelocity = 0;
    }
    //setting 'down' movement to down key
    if(event.keyCode == 40){//down arrow keycode = 40
        inputsYVelocity = 1;//moving down one position by incrementing y
        inputsXVelocity = 0;
    }

     //setting 'left' movement to right key
     if(event.keyCode == 37){//left arrow keycode = 37
        inputsYVelocity = 0; 
        inputsXVelocity = -1;//moving left one position by decrementing x
    }

       //setting 'right' movement to right key
       if(event.keyCode == 39){//right arrow keycode = 39
        inputsYVelocity = 0; 
        inputsXVelocity = +1;//moving right one position by incrementing x
    }
}
drawGame();


