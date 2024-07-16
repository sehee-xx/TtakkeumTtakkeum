export class Dochi {
  constructor(img, stageWidth, stageHeight) {
    this.img = img;

    this.totalFrame = 8;
    this.curFrame = 0;

    this.imgWidth = 360;
    this.imgHeight = 300;

    this.dochiWidth = 180;
    this.dochiHeight = 150;

    this.dochiWidthHalf = this.dochiWidth / 2;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = stageWidth / 2; // 화면 중앙
    this.y = stageHeight / 2; // 화면 중앙
    this.speed = Math.random() * 2 + 1;

    this.fps = 24;
    this.fpsTime = 1000 / this.fps;
  }

  draw(ctx, t, dots) {
    this.animate(ctx, dots);
  }

  animate(ctx, dots) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      -this.dochiWidthHalf,
      -this.dochiHeight / 2,
      this.dochiWidth,
      this.dochiHeight
    );
    ctx.restore();
  }
}

export default Dochi;
