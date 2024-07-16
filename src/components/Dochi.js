// components/Dochi.js
export class Dochi {
  constructor(img, controller, stageWidth, stageHeight) {
    this.img = img;
    this.controller = controller;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.totalFrame = 8;
    this.curFrame = 0;

    this.imgWidth = 260;
    this.imgHeight = 300;

    this.dochiWidth = 180;
    this.dochiHeight = 150;

    this.dochiWidthHalf = this.dochiWidth / 2;
    this.x = stageWidth + this.dochiWidth;
    this.y = 0;
    this.speed = Math.random() * 2 + 1;

    this.fps = 24;
    this.fpsTime = 1000 / this.fps;

    this.x = 0;
    this.y = 0;
    this.vx = Math.random() * 4 + 1;
    this.vy = Math.random() * 4 + 1;

    this.width = 100;
    this.height = 100;
  }

  draw(ctx, t, dots) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.update();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.width > this.stageWidth || this.x < 0) {
      this.vx *= -1;
    }
    if (this.y + this.height > this.stageHeight || this.y < 0) {
      this.vy *= -1;
    }
  }
}

export default Dochi;
