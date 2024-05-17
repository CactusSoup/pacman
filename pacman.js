class Pacman {
  constructor(x, y, size, speed, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.direction = direction;
    this.nextDirection = this.direction;
    this.currentFrame = 0;
    this.frameCount = 6;

    setInterval(() => {
      this.changeAnimation();
    }, 1000 / fps);
  }

  move() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  eat() {
    if (map[this.getMapY()][this.getMapX()] == 2) {
      map[this.getMapY()][this.getMapX()] = 3;
      score += 1;
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
    return (
      map[this.getMapY()][this.getMapX()] == 1 ||
      map[this.getMapYRightSide()][this.getMapX()] == 1 ||
      map[this.getMapY()][this.getMapXRightSide()] == 1 ||
      map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
    );
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

  changeAnimation() {
    this.currentFrame = (this.currentFrame + 1) % this.frameCount;
  }

  draw() {
    canvasCtx.save();
    canvasCtx.translate(this.x + blockSize / 2, this.y + blockSize / 2);
    canvasCtx.rotate((this.direction * 90 * Math.PI) / 180);
    canvasCtx.translate(-this.x - blockSize / 2, -this.y - blockSize / 2);
    canvasCtx.drawImage(
      pacmanFrames,
      this.currentFrame * blockSize,
      0,
      blockSize,
      blockSize,
      this.x,
      this.y,
      this.size,
      this.size,
    );
    canvasCtx.restore();
  }
}
