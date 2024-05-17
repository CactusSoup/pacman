const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let score = 0;
let lives = 3;

let ghosts = [];
let ghostCount = 4;

const fps = 30;
const pacmanSpeed = blockSize / 5;
let gameLoop = () => {
  draw();
  update();
};
let gameInterval = setInterval(gameLoop, 1000 / fps);

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;

let createRect = (x, y, width, height, color) => {
  canvasCtx.fillStyle = color;
  canvasCtx.fillRect(x, y, width, height);
};

let drawText = (x, y, text) => {
  canvasCtx.font = "20px Emulogic";
  canvasCtx.fillStyle = "white";
  canvasCtx.fillText(text, x, y);
};

let update = () => {
  pacman.move();
  pacman.eat();
  for (let index = 0; index < ghosts.length; index++) {
    ghosts[index].move();
  }
  if (pacman.checkGhostCollision()) {
    createNewPacman();
    createGhosts();
    lives--;
    if (lives == 0) {
      drawText(150, 200, "Game Over!");
      clearInterval(gameInterval);
    }
  }
  if (score >= foodCount) {
    drawText(150, 200, "Winner!");
    clearInterval(gameInterval);
  }
};

let draw = () => {
  createRect(0, 0, canvas.width, canvas.height, "black");
  drawMap();
  pacman.draw();
  drawText(0, blockSize * (map.length + 1) + 10, "Score: " + score);
  for (let index = 0; index < ghosts.length; index++) {
    ghosts[index].draw();
  }
  drawText(260, blockSize * (map.length + 1) + 10, "Lives: ");
  for (let index = 0; index < lives; index++) {
    canvasCtx.drawImage(
      pacmanFrames,
      2 * blockSize,
      0,
      blockSize,
      blockSize,
      350 + index * blockSize,
      blockSize * map.length + 10,
      blockSize,
      blockSize,
    );
  }
};

let createNewPacman = () => {
  pacman = new Pacman(
    blockSize,
    blockSize,
    blockSize,
    pacmanSpeed,
    DIRECTION_RIGHT,
  );
};

let createGhosts = () => {
  ghosts = [];
  for (let index = 0; index < ghostCount; index++) {
    let newGhost = new Ghost(
      9 * blockSize + (index % 2) * blockSize,
      10 * blockSize + (index % 2) * blockSize,
      blockSize,
      blockSize,
      pacman.speed / 2,
      DIRECTION_RIGHT,
      ghostLocations[index % 4].x,
      ghostLocations[index % 4].y,
      124,
      116,
      6 + index,
    );
    ghosts.push(newGhost);
  }
};

createNewPacman();
createGhosts();
gameLoop();

window.addEventListener("keydown", (event) => {
  let k = event.keyCode;
  setTimeout(() => {
    if (k == 37 || k == 65) {
      pacman.nextDirection = DIRECTION_LEFT;
    } else if (k == 38 || k == 87) {
      pacman.nextDirection = DIRECTION_UP;
    } else if (k == 39 || k == 68) {
      pacman.nextDirection = DIRECTION_RIGHT;
    } else if (k == 40 || k == 83) {
      pacman.nextDirection = DIRECTION_DOWN;
    }
  }, 1);
});
