//canvas
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
const frameWidth = 500;
const frameHeight = 500;

//snake
let snakeImg = document.getElementById("imgSnake");
let moves;
let snake = {
        length: 4,
        direction: 'right', 
        posX: frameWidth/2,
        posY: frameHeight/2,
        score: 0
    }
const tileSize = 8;

//apple
let apple = {
    x: Math.floor(Math.random() * frameWidth) + 8,
    y: Math.floor(Math.random() * frameHeight) + 8,
    imgApple: document.getElementById("imgApple")
}

//events
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowUp" && snake.direction != "down") snake.direction = "up";
    else if (e.code == "ArrowDown" && snake.direction != "up") snake.direction = "down";
    else if (e.code == "ArrowLeft" && snake.direction != "right") snake.direction = "left";
    else if (e.code == "ArrowRight" && snake.direction != "left") snake.direction = "right"; 
});
//running interval
setInterval(() => {
    ctx.clearRect(0,0, frameWidth, frameHeight);

    for (let i = 0; i < snake.length; i++) { 
        
        if (snake.direction == "right") {
            snake.posX += tileSize;
            ctx.drawImage(snakeImg, snake.posX - i*(tileSize*2), snake.posY, tileSize, tileSize);
        }
        if (snake.direction == "left") {
            snake.posX -= tileSize;
            ctx.drawImage(snakeImg, snake.posX + i*(tileSize*2), snake.posY, tileSize, tileSize);
        }
        if (snake.direction == "up") {
            snake.posY -= tileSize; 
            ctx.drawImage(snakeImg, snake.posX, snake.posY - i*(tileSize*2), tileSize, tileSize);
        }
        if (snake.direction == "down") {
            snake.posY += tileSize; 
            ctx.drawImage(snakeImg, snake.posX, snake.posY + i*(tileSize*2), tileSize, tileSize);
        }
    }
    ctx.drawImage(imgApple, apple.x, apple.y, tileSize, tileSize);
}, 200);

function isAppleTouched() {
    if (snake.posX == apple.x && snake.posY == apple.y) {
        snake.score += 50;
        document.getElementById("scorePoints").innerHTML = snake.score;
        alert("scored");
    }
}