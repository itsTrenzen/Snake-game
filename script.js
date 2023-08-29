//canvas
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
const frameWidth = 500;
const frameHeight = 500;

//snake
let snakeImg = document.getElementById("imgSnake");
const tileSize = 8;
let gameOver = false;

let tickSpeed = 200;
let pastTicks = 0;

//apple
let apple = {
    x: generateApplePosition(),
    y: generateApplePosition(),
    imgApple: document.getElementById("imgApple")
}
setup(8);
//Keyboard events
document.addEventListener('keyup', (e) => {
    if (pastTicks >= 200) {
    if (e.code == "ArrowUp" && (snake.direction != "down" && snake.direction != "up")) {snake.direction = "up"; pastTicks = 0;}
    else if (e.code == "ArrowDown" && (snake.direction != "up" && snake.direction != "down")) {snake.direction = "down"; pastTicks = 0;}
    else if (e.code == "ArrowLeft" && (snake.direction != "right" && snake.direction != "left")) {snake.direction = "left"; pastTicks = 0;}
    else if (e.code == "ArrowRight" && (snake.direction != "left" && snake.direction != "right")) {snake.direction = "right"; pastTicks = 0;}
    } 
});

//Touch events
function getTouch(touch) {
    if (touch == "moveUp" && (snake.direction != "down" && snake.direction != "up")) snake.direction = "up";
    else if (touch == "moveDown" && (snake.direction != "up" && snake.direction != "down")) snake.direction = "down";
    else if (touch == "moveLeft" && (snake.direction != "right" && snake.direction != "left")) snake.direction = "left";
    else if (touch == "moveRight" && (snake.direction != "left" && snake.direction != "right")) snake.direction = "right";
}


//run
function intervalFunction() {
    if (!gameOver) {
        ctx.clearRect(0,0, frameWidth, frameHeight);
        isAppleTouched();
        //transfering moves
        for (let i = 1; i < snake.length; i++) {
            if (i == 1) {
                snake.tail[i].oldMove = snake.tail[i].nextMove;
                snake.tail[i].nextMove = snake.oldDirection;
                snake.oldDirection = snake.direction;
            } else {
                snake.tail[i].oldMove = snake.tail[i].nextMove;
                snake.tail[i].nextMove = snake.tail[i-1].oldMove;
            } 
        }

    for (let i = 0; i < snake.length; i++) { 
        //head
        if (i == 0) {
            let dir = snake.direction;
            
            if (dir == "right") {
                snake.posX += tileSize;
                ctx.drawImage(snakeImg, snake.posX , snake.posY, tileSize, tileSize);
                }
            else if (dir == "left") {
                snake.posX -= tileSize;
                ctx.drawImage(snakeImg, snake.posX, snake.posY, tileSize, tileSize);
                }
            else if (dir == "up") {
                snake.posY -= tileSize; 
                ctx.drawImage(snakeImg, snake.posX, snake.posY, tileSize, tileSize);
                }
            else if (dir == "down") {
                snake.posY += tileSize; 
                ctx.drawImage(snakeImg, snake.posX, snake.posY, tileSize, tileSize);
                }
           }
           //tail
        else if (i > 0) {
            if (snake.tail[i].nextMove == "right") { 
                snake.tail[i].setX(tileSize);
                ctx.drawImage(snakeImg, snake.tail[i].getX(), snake.tail[i].getY(), tileSize, tileSize);
                }
            else if (snake.tail[i].nextMove == "left") {
                snake.tail[i].setX(-tileSize);
                ctx.drawImage(snakeImg, snake.tail[i].getX(), snake.tail[i].getY(), tileSize, tileSize);
                }
            else if (snake.tail[i].nextMove == "up") {
                snake.tail[i].setY(-tileSize); 
                ctx.drawImage(snakeImg, snake.tail[i].getX(), snake.tail[i].getY(), tileSize, tileSize);
                }
            else if (snake.tail[i].nextMove == "down") {
                snake.tail[i].setY(tileSize); 
                ctx.drawImage(snakeImg, snake.tail[i].getX(), snake.tail[i].getY(), tileSize, tileSize);
                }
            }
        }
        ctx.drawImage(apple.imgApple, apple.x, apple.y, tileSize, tileSize);
        checkGameOver();
    pastTicks += 200;
    }
}

let gameInterval = setInterval(() => {intervalFunction()}, tickSpeed);

//check for apple
function isAppleTouched() {
    if (apple.x == snake.getPosX() && apple.y == snake.getPosY()) {
        
        clearInterval(gameInterval);
        if (tickSpeed >= 50) tickSpeed -= 5;
        gameInterval = setInterval(() => {intervalFunction()}, tickSpeed);

        apple.x = generateApplePosition();
        apple.y = generateApplePosition();
        snake.score += 50;
        document.getElementById("scorePoints").innerHTML = snake.score;
        snake.tail.push({
            x: null,
            y: null,
            nextMove: snake.tail[snake.length-1].oldMove,
            oldMove: "right",
            getX: function() {return this.x},
            getY: function() {return this.y},
            setX: function(p) {this.x += p},
            setY: function(p) {this.y += p}
        });
        if (snake.tail[snake.length-1].oldMove == "up") {
            snake.tail[snake.length].x = snake.tail[snake.length-1].getX();
            snake.tail[snake.length].y = snake.tail[snake.length-1].getY()+tileSize;
        }
        else if (snake.tail[snake.length-1].oldMove == "down") {
            snake.tail[snake.length].x = snake.tail[snake.length-1].getX();
            snake.tail[snake.length].y = snake.tail[snake.length-1].getY()-tileSize;
        }
        else if (snake.tail[snake.length-1].oldMove == "right") {
            snake.tail[snake.length].x = snake.tail[snake.length-1].getX()-tileSize;
            snake.tail[snake.length].y = snake.tail[snake.length-1].getY();
        }
        else if (snake.tail[snake.length-1].oldMove == "left") {
            snake.tail[snake.length].x = snake.tail[snake.length-1].getX()+tileSize;
            snake.tail[snake.length].y = snake.tail[snake.length-1].getY();
        }
        snake.length += 1;
        
    }
}

//check for border
function checkGameOver() {
    if (snake.getPosX() >= frameWidth || snake.getPosX() <= 0 || snake.posY >= frameHeight || snake.posY <= 0) {
        cnv.style.borderColor = "red";
        gameOver = true;
    }
    for (let i = 1; i < snake.length; i++) { 
        if (snake.getPosX() == snake.tail[i].getX() && snake.getPosY() == snake.tail[i].getY()) {
            cnv.style.borderColor = "red";
            gameOver = true;
        }
    }
}
//random positon for the apple
function generateApplePosition() {
    let temp = Math.floor(Math.random() * (frameWidth-16)) + 8;
    if (temp % tileSize == 0) return temp;
    return generateApplePosition();  
    }

function setup(len) {
    gameOver = false;
    cnv.style.borderColor = "blue";
    apple.x = generateApplePosition();
    apple.y = generateApplePosition();
    snake = {
        length: len,
        direction:'right', 
        oldDirection:'right',
        posX: 240,
        getPosX: function() {return this.posX},
        getPosY: function() {return this.posY},
        posY: 240,
        score: 0,
        tail: []
    }
    document.getElementById("scorePoints").innerHTML = snake.score;
    for (let index = 0; index < len; index++) {
        if (index == 0) {
            snake.tail = [{}];
        } else {
            snake.tail.push({ 
                x: snake.posX - tileSize*index,
                y: snake.posY, 
                nextMove: "right",
                oldMove: "right",
                getX: function() {return this.x},
                getY: function() {return this.y},
                setX: function(p) {this.x += p},
                setY: function(p) {this.y += p}
            });
        }
    }
}
