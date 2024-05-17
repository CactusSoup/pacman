const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghosts");

let fps = 30;
let blockSize = 20;
let wallColour = "#342DCA";
let wallInnerColour = "black";
let wallSpaceWidth = blockSize / 1.3;
let wallOffset = (blockSize - wallSpaceWidth) / 2;

let createRect = (x,y,width,height,color) => {
    canvasCtx.fillStyle = color;
    canvasCtx.fillRect(x,y,width,height);
}

let createBlock = (x,y,color) => {
    createRect(x * blockSize,y * blockSize,blockSize,blockSize,color);
}

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

let gameLoop = () => {
    update();
    draw();
}

let update = () => {
    //TODO: Update Method.
}

let draw = () => {
    createRect(0,0,canvas.width, canvas.height, "black");
    drawWalls();
    //TODO: Drawing method.
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
