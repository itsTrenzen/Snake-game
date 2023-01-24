let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");

let snakeImg = document.getElementById("imgSnake");
let snake = [3];
let moves = new Queue();

setInterval(() => {
    for (let i = 0; i < snake.length; i++) { 
        ctx.drawImage(snakeImg, 200, 200, 8, 8);
}}, 400);

