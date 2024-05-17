const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let fps = 30;
let blockSize = 20;
let wallColour = "#342DCA";
let wallInnerColour = "black";
let wallSpaceWidth = blockSize / 1.3;
let wallOffset = (blockSize - wallSpaceWidth) / 2;

let foodColour = "#FEB897";
let foodCount = 0;

let score = 0;
let lives = 3;

let ghosts = [];
let ghostCount = 4;

let createRect = (x,y,width,height,color) => {
    canvasCtx.fillStyle = color;
    canvasCtx.fillRect(x,y,width,height);
}

let createBlock = (x,y,color) => {
    createRect(x * blockSize,y * blockSize,blockSize,blockSize,color);
}

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;


let ghostLocations = [
    {x: 0, y: 0},
    {x: 176, y: 0},
    {x: 0, y: 121},
    {x:176,  y:121}
]

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
    for (let index = 0; index < map.length; index++) {
        for (let secondIndex = 0; secondIndex < map[index].length; secondIndex++){
            if (map[index][secondIndex] == 2) {
                foodCount++;
            }
        }
    }

let randomTargetsForGhosts = [
    {x: 1 * blockSize, y: 1 * blockSize},
    {x: 1 * blockSize, y: (map.length - 2) * blockSize},
    {x: (map[0].length -2) * blockSize, y: blockSize},
    {x: (map[0].length -2) * blockSize, y: (map.length -2) * blockSize}
]

let gameLoop = () => {
    draw();
    update();
}

let update = () => {
    pacman.move();
    pacman.eat();
    for (let index = 0; index < ghosts.length; index++){
        ghosts[index].move();
    }
    if (pacman.checkGhostCollision()){
        restartGame();
    }
    if (score >= foodCount) { 
        drawWin();
        clearInterval(gameInterval);
    }
}

let restartGame = () => {
    createNewPacman();
    createGhosts();
    lives--;
    if (lives == 0) {
        gameOver();
    }
}


let gameOver = () => {
    drawGameOver();
    clearInterval(gameInterval);
}

let drawGameOver = () => {
    canvasCtx.font = "20px Emulogic";
    canvasCtx.fillStyle = "white";
    canvasCtx.fillText("Game Over!", 150, 200);
}

let drawWin = () => {
    canvasCtx.font = "20px Emulogic";
    canvasCtx.fillStyle = "white";
    canvasCtx.fillText("Winner!", 150, 200);
}

let drawLives = () => {
    canvasCtx.font = "20px Emulogic";
    canvasCtx.fillStyle = "white";
    canvasCtx.fillText("Lives: ", 260, blockSize * (map.length +1) + 10);
    for (let index = 0; index < lives; index++) {
        canvasCtx.drawImage(pacmanFrames, 2 * blockSize, 0, blockSize, blockSize, 350 + index * blockSize, blockSize * map.length + 10, blockSize, blockSize);
    }
}

let draw = () => {
    createRect(0,0,canvas.width, canvas.height, "black");
    drawWalls();
    pacman.draw();
    drawFood();
    drawScore();
    drawGhosts();
    drawLives();
}

let drawGhosts = () => {
    for (let index = 0; index < ghosts.length; index++){
        ghosts[index].draw();
    }
}

let drawScore = () => {
    canvasCtx.font = "20px Emulogic";
    canvasCtx.fillStyle = "white";
    canvasCtx.fillText( "Score: " + score, 0, blockSize * (map.length + 1) + 10);
}
let gameInterval = setInterval(gameLoop, 1000/ fps);

let drawWalls = () => {
    for (let index = 0; index < map.length; index++) {
        for (let secondIndex = 0; secondIndex < map[index].length; secondIndex++){
            if (map[index][secondIndex] == 1) {
                // Wall
                createBlock(secondIndex, index, wallColour);
                if (secondIndex > 0 && map[index][secondIndex -1] == 1){
                    createRect(secondIndex * blockSize, index * blockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColour);
                }
                if (secondIndex < map[index].length - 1 && map[index][secondIndex + 1] == 1){
                    createRect(secondIndex * blockSize + wallOffset, index * blockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColour);
                }
                if (index > 0 && map[index - 1][secondIndex] == 1){
                    createRect(secondIndex * blockSize + wallOffset, index * blockSize  , wallSpaceWidth , wallSpaceWidth + wallOffset, wallInnerColour);
                }
                if (index < map.length - 1 && map[index + 1][secondIndex] == 1){
                    createRect(secondIndex * blockSize + wallOffset, index * blockSize + wallOffset , wallSpaceWidth , wallSpaceWidth + wallOffset, wallInnerColour);
                }
            }
        }
    }
}

let drawFood = () => {
    for (let index = 0; index < map.length; index++) {
        for (let secondIndex = 0; secondIndex < map[index].length; secondIndex++){
            if (map[index][secondIndex] == 2) {
                // Food
                createRect(secondIndex * blockSize + blockSize /3,index * blockSize + blockSize /3, blockSize/3, blockSize /3, foodColour);
            }
        }
    }
}

let createNewPacman = () => {
    pacman = new Pacman(
        blockSize,
        blockSize,
        blockSize,
        blockSize,
        blockSize / 5,
        DIRECTION_RIGHT
    );
}

let createGhosts = () => {
    ghosts = []
    for (let index = 0; index < ghostCount; index++){
        let newGhost = new Ghost(
            9 * blockSize + (index %2 == 0 ? 0 : 1) * blockSize,
            10 * blockSize + (index %2 == 0 ? 0 : 1 ) * blockSize,
            blockSize,
            blockSize,
            pacman.speed/2,
            DIRECTION_RIGHT,
            ghostLocations[index % 4].x,
            ghostLocations[index % 4].y,
            124, 116, 6 + index
        );
        ghosts.push(newGhost);
    }

}

createNewPacman();
createGhosts();
gameLoop();

window.addEventListener("keydown", (event) => {
    let k = event.keyCode

    setTimeout(() => {
        if (k == 37 || k == 65){
            pacman.nextDirection =DIRECTION_LEFT;
        } else if (k == 38 || k == 87) {
            pacman.nextDirection =DIRECTION_UP;

        } else if (k == 39 || k == 68){
            pacman.nextDirection =DIRECTION_RIGHT;

        } else if (k == 40 || k == 83){
            pacman.nextDirection =DIRECTION_DOWN;

        }

    }, 1)
})
