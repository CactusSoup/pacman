class Pacman {
  constructor(x, y, width, height, speed, direction) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = direction;
    this.nextDirection = this.direction;
    this.currentFrame = 1;
    this.frameCount = 7;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  move() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  eat() {
    for (let index = 0; index < map.length; index++) {
      for (
        let secondIndex = 0;
        secondIndex < map[index].length;
        secondIndex++
      ) {
        if (
          map[index][secondIndex] == 2 &&
          this.getMapX() == secondIndex &&
          this.getMapY() == index
        ) {
          map[index][secondIndex] = 3;
          score += 1;
        }
      }
    }
  }

  changeDirectionIfPossible() {
    if (this.direction == this.nextDirection) {
      return;
    }
    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
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

  checkGhostCollision() {
    for (let index = 0; index < ghosts.length; index++) {
      let ghost = ghosts[index];
      if (
        ghost.getMapX() == this.getMapX() &&
        ghost.getMapY() == this.getMapY()
      ) {
        return true;
      }
      return false;
    }
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

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasCtx.save();
    canvasCtx.translate(this.x + blockSize / 2, this.y + blockSize / 2);
    canvasCtx.rotate((this.direction * 90 * Math.PI) / 180);
    canvasCtx.translate(-this.x - blockSize / 2, -this.y - blockSize / 2);
    canvasCtx.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * blockSize,
      0,
      blockSize,
      blockSize,
      this.x,
      this.y,
      this.width,
      this.height,
    );
    canvasCtx.restore();
  }
}
