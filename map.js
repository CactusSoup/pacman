const blockSize = 20;
const wallColour = "#342DCA";
const wallInnerColour = "black";
const wallSpaceWidth = blockSize / 1.3;
const wallOffset = (blockSize - wallSpaceWidth) / 2;

const foodColour = "#FEB897";
let foodCount = 0;

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
  for (let secondIndex = 0; secondIndex < map[index].length; secondIndex++) {
    if (map[index][secondIndex] == 2) {
      foodCount++;
    }
  }
}

let drawMap = () => {
  for (let xIndex = 0; xIndex < map.length; xIndex++) {
    for (let secondIndex = 0; secondIndex < map[xIndex].length; secondIndex++) {
      if (map[xIndex][secondIndex] == 1) {
        drawWalls(xIndex, secondIndex);
      } else if (map[xIndex][secondIndex] == 2) {
        drawFood(xIndex, secondIndex);
      }
    }
  }
};

let drawWalls = (x, y) => {
  createRect(y * blockSize, x * blockSize, blockSize, blockSize, wallColour);
  if (y > 0 && map[x][y - 1] == 1) {
    createRect(
      y * blockSize,
      x * blockSize + wallOffset,
      wallSpaceWidth + wallOffset,
      wallSpaceWidth,
      wallInnerColour,
    );
  }
  if (y < map[x].length - 1 && map[x][y + 1] == 1) {
    createRect(
      y * blockSize + wallOffset,
      x * blockSize + wallOffset,
      wallSpaceWidth + wallOffset,
      wallSpaceWidth,
      wallInnerColour,
    );
  }
  if (x > 0 && map[x - 1][y] == 1) {
    createRect(
      y * blockSize + wallOffset,
      x * blockSize,
      wallSpaceWidth,
      wallSpaceWidth + wallOffset,
      wallInnerColour,
    );
  }
  if (x < map.length - 1 && map[x + 1][y] == 1) {
    createRect(
      y * blockSize + wallOffset,
      x * blockSize + wallOffset,
      wallSpaceWidth,
      wallSpaceWidth + wallOffset,
      wallInnerColour,
    );
  }
};

let drawFood = (x, y) => {
  createRect(
    y * blockSize + blockSize / 3,
    x * blockSize + blockSize / 3,
    blockSize / 3,
    blockSize / 3,
    foodColour,
  );
};
