//canvas
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
const frameWidth = 500;
const frameHeight = 500;

//snake
let snakeImg = document.getElementById("imgSnake");
let moves;
let snake;
let posX = frameWidth/2;
let posY = frameHeight/2;
const tileSize = 8;

setup();

setInterval(() => {
    ctx.clearRect(0,0, frameWidth, frameHeight);
    for (let i = 0; i < snake; i++) { 
        
        ctx.drawImage(snakeImg, posX - i*(tileSize*2), posY, tileSize, tileSize);
        posX += tileSize;
        posY += 0;
    }
}, 200);

function setup() {
    snake = 4;
}