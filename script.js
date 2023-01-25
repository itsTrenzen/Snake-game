//canvas
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
const frameWidth = 500;
const frameHeight = 500;

//snake
let snakeImg = document.getElementById("imgSnake");
let moves = ["right"];
let snake = {
        length: 4,
        direction: 'right', 
        posX: 245,
        posY: 245,
        score: 0,
        queue: ["right"]
}
const tileSize = 8;
//apple
let apple = {
    x: generateApplePosition(),
    y: generateApplePosition(),//Math.floor(Math.random() * frameHeight) + 8,
    imgApple: document.getElementById("imgApple")
}
//events
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowUp" && (snake.direction != "down" && snake.direction != "up")) snake.direction = "up", addDirection("up", snake.length);
    else if (e.code == "ArrowDown" && (snake.direction != "up" && snake.direction != "down")) snake.direction = "down", addDirection("down", snake.length);
    else if (e.code == "ArrowLeft" && (snake.direction != "right" && snake.direction != "left")) snake.direction = "left", addDirection("left", snake.length);
    else if (e.code == "ArrowRight" && (snake.direction != "left" && snake.direction != "right")) snake.direction = "right", addDirection("right", snake.length); 
});
//running interval
setInterval(() => {
    ctx.clearRect(0,0, frameWidth, frameHeight);

    for (let i = 0; i < snake.length; i++) { 
        let dir = getDirection();
        if (i == 0) {
           
            if (dir == "right") {
                addDirection("right", snake.length+3);
                snake.posX += tileSize-5;
                ctx.drawImage(snakeImg, snake.posX - i*(tileSize*2), snake.posY, tileSize, tileSize);
                }
            else if (dir == "left") {
                addDirection("left", snake.length+3);
                snake.posX -= tileSize-5;
                ctx.drawImage(snakeImg, snake.posX + i*(tileSize*2), snake.posY, tileSize, tileSize);
                }
            else if (dir == "up") {
                addDirection("up", snake.length+3);
                snake.posY -= tileSize-5; 
                ctx.drawImage(snakeImg, snake.posX, snake.posY - i*(tileSize*2), tileSize, tileSize);
                }
            else if (dir == "down") {
                addDirection("down", snake.length+3);
                snake.posY += tileSize-5; 
                ctx.drawImage(snakeImg, snake.posX, snake.posY + i*(tileSize*2), tileSize, tileSize);
                }
           }
        else if (i > 0) {
            let dir = getDirection();
            if (dir == "right") {
                snake.posX += tileSize-5;
                ctx.drawImage(snakeImg, snake.posX - i*(tileSize*2), snake.posY, tileSize, tileSize);
                }
            else if (dir == "left") {
                snake.posX -= tileSize-5;
                ctx.drawImage(snakeImg, snake.posX + i*(tileSize*2), snake.posY, tileSize, tileSize);
                }
            else if (dir == "up") {
                snake.posY -= tileSize-5; 
                ctx.drawImage(snakeImg, snake.posX, snake.posY - i*(tileSize*2), tileSize, tileSize);
                }
            else if (dir == "down") {
                snake.posY += tileSize-5; 
                ctx.drawImage(snakeImg, snake.posX, snake.posY + i*(tileSize*2), tileSize, tileSize);
                }
        }
    }
    ctx.drawImage(imgApple, apple.x, apple.y, tileSize, tileSize);
}, 200);
//check for apple
function isAppleTouched() {
    if (snake.posX == apple.x && snake.posY == apple.y) {
        snake.score += 50;
        snake.length += 1;
        document.getElementById("scorePoints").innerHTML = snake.score;
        alert("scored");
    }
}
//random positon for the apple
function generateApplePosition() {
    let temp = Math.floor(Math.random() * frameWidth) + 8;
    if (temp % 8 == 0) return temp;
    return generateApplePosition();  
}

function addDirection(dir, amount) {
    for (let i = 0; i < amount; i++) {
    snake.queue.push(dir);
    }
}

function removeDirection() {
    snake.queue.shift();
}

function getDirection() {
    let p = snake.queue.pop();
    return p;
}