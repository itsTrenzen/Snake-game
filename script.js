//canvas
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
const frameWidth = 500;
const frameHeight = 500;

//snake
let snakeImg = document.getElementById("imgSnake");
const tileSize = 8;
let gameOver = false;

setup(18);
//apple
let apple = {
    x: generateApplePosition(),
    y: generateApplePosition(),
    imgApple: document.getElementById("imgApple")
}
//events
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowUp" && (snake.direction != "down" && snake.direction != "up")) snake.direction = "up";
    else if (e.code == "ArrowDown" && (snake.direction != "up" && snake.direction != "down")) snake.direction = "down";
    else if (e.code == "ArrowLeft" && (snake.direction != "right" && snake.direction != "left")) snake.direction = "left";
    else if (e.code == "ArrowRight" && (snake.direction != "left" && snake.direction != "right")) snake.direction = "right"; 
});

//run
setInterval(() => {
    if (!gameOver) {
    ctx.clearRect(0,0, frameWidth, frameHeight);
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
        checkBorder();
        isAppleTouched();
    }}, 200);

//check for apple
function isAppleTouched() {
    
    if (apple.x == snake.getPosX() && apple.y == snake.getPosY()) {
        alert("scored");
        snake.score += 50;
        snake.length += 1;
        document.getElementById("scorePoints").innerHTML = snake.score;
        snake.tail.push({
            x: snake.posX - tileSize*(snake.length+1),
            y:snake.posY,
            nextMove: snake.tail[snake.length-1].oldMove,
            oldMove: "right",
            getX: function() {return this.x},
            getY: function() {return this.y},
            setX: function(p) {this.x += p},
            setY: function(p) {this.y += p}
        });
    }
}

//check for border
function checkBorder() {
    if (snake.getPosX() >= frameWidth || snake.getPosX() <= 0 || snake.posY >= frameHeight || snake.posY <= 0) {
        cnv.style.borderColor = "red";
        gameOver = true;
    }
}
//random positon for the apple
function generateApplePosition() {
    let temp = Math.floor(Math.random() * (frameWidth-16)) + 8;
    if (temp % 8 == 0) return temp;
    return generateApplePosition();  
}

function setup(len) {
    snake = {
        length: len,
        direction: 'right', 
        oldDirection: 'right',
        posX: 245,
        getPosX: function() {return this.posX},
        posY: 245,
        score: 0,
        tail: []
    }
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
