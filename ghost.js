const ghostLocations = [
  { x: 0, y: 0 },
  { x: 176, y: 0 },
  { x: 0, y: 121 },
  { x: 176, y: 121 },
];

let randomTargetsForGhosts = [
  { x: 1 * blockSize, y: 1 * blockSize },
  { x: 1 * blockSize, y: (map.length - 2) * blockSize },
  { x: (map[0].length - 2) * blockSize, y: blockSize },
  { x: (map[0].length - 2) * blockSize, y: (map.length - 2) * blockSize },
];

class Ghost {
  constructor(
    x,
    y,
    width,
    height,
    speed,
    direction,
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    range,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = direction;
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.range = range;
    this.randomTargetIndex = parseInt(
      Math.random() * randomTargetsForGhosts.length,
    );
    this.target = randomTargetsForGhosts[this.randomTargetIndex];

    setInterval(() => {
      this.changeRandomDirection();
    }, 8000);
  }

  changeRandomDirection() {
    this.randomTargetIndex = parseInt(
      Math.random() * randomTargetsForGhosts.length,
    );
  }

  move() {
    if (this.isInRangeOfPacman()) {
      this.target = pacman;
    } else {
      this.target = randomTargetsForGhosts[this.randomTargetIndex];
    }
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  isInRangeOfPacman() {
    return (
      Math.sqrt(
        Math.abs((pacman.getMapX() - this.getMapX()) ** 2) +
          Math.abs(pacman.getMapY() - this.getMapY()) ** 2,
      ) <= this.range
    );
  }

  changeDirectionIfPossible() {
    let tempDirection = this.direction;
    this.direction = this.calculateNewDirection(
      map,
      parseInt(this.target.x / blockSize),
      parseInt(this.target.y / blockSize),
    );
    if (typeof this.direction == "undefined") {
      this.direction = tempDirection;
      return;
    }

    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  calculateNewDirection(map, destX, destY) {
    let mapCopy = [];
    for (let index = 0; index < map.length; index++) {
      mapCopy[index] = map[index].slice();
    }
    let queue = [
      {
        x: this.getMapX(),
        y: this.getMapY(),
        moves: [],
      },
    ];
    while (queue.length > 0) {
      let popped = queue.shift();
      if (popped.x == destX && popped.y == destY) {
        return popped.moves[0];
      } else {
        mapCopy[popped.y][popped.x] = 1;
        let neighbourList = this.addNeighbours(popped, mapCopy);
        for (let index = 0; index < neighbourList.length; index++) {
          queue.push(neighbourList[index]);
        }
      }
    }
    return DIRECTION_UP;
  }

  addNeighbours(popped, mapCopy) {
    let queue = [];
    let numOfRows = mapCopy.length;

    if (
      popped.x - 1 >= 0 &&
      popped.x - 1 < numOfRows &&
      mapCopy[popped.y][popped.x - 1] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION_LEFT);
      queue.push({ x: popped.x - 1, y: popped.y, moves: tempMoves });
    }
    if (
      popped.x + 1 >= 0 &&
      popped.x + 1 < numOfRows &&
      mapCopy[popped.y][popped.x + 1] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION_RIGHT);
      queue.push({ x: popped.x + 1, y: popped.y, moves: tempMoves });
    }
    if (
      popped.y - 1 >= 0 &&
      popped.y - 1 < numOfRows &&
      mapCopy[popped.y - 1][popped.x] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION_UP);
      queue.push({ x: popped.x, y: popped.y - 1, moves: tempMoves });
    }
    if (
      popped.y + 1 >= 0 &&
      popped.y + 1 < numOfRows &&
      mapCopy[popped.y + 1][popped.x] != 1
    ) {
      let tempMoves = popped.moves.slice();
      tempMoves.push(DIRECTION_DOWN);
      queue.push({ x: popped.x, y: popped.y + 1, moves: tempMoves });
    }
    return queue;
  }

  moveBackwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y += this.speed;
        break;
      case DIRECTION_DOWN:
        this.y -= this.speed;
        break;
    }
  }
  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_DOWN:
        this.y += this.speed;
        break;
    }
  }

  checkCollision() {
    if (
      map[this.getMapY()][this.getMapX()] == 1 ||
      map[this.getMapYRightSide()][this.getMapX()] == 1 ||
      map[this.getMapY()][this.getMapXRightSide()] == 1 ||
      map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
    ) {
      return true;
    }

    return false;
  }

  getMapX() {
    return parseInt(this.x / blockSize);
  }

  getMapY() {
    return parseInt(this.y / blockSize);
  }

  getMapXRightSide() {
    return parseInt((this.x + 0.9999 * blockSize) / blockSize);
  }

  getMapYRightSide() {
    return parseInt((this.y + 0.9999 * blockSize) / blockSize);
  }

  draw() {
    canvasCtx.save();
    canvasCtx.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
    canvasCtx.restore();
    //        canvasCtx.beginPath();
    //      canvasCtx.strokeStyle = "red";
    //    canvasCtx.arc( this.x + blockSize /2, this.y + blockSize /2, this.range * blockSize, 0, 2*Math.PI);
    //  canvasCtx.stroke();
  }
}
