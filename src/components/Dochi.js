export class Dochi {
  constructor(img, stageWidth, stageHeight) {
    this.img = img;

    this.totalFrame = 1;
    this.curFrame = 0;

    this.imgWidth = 300;
    this.imgHeight = 240;

    this.dochiWidth = 180;
    this.dochiHeight = 150;

    this.dochiWidthHalf = this.dochiWidth / 2;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = stageWidth; // 화면 오른쪽에서 시작
    this.y = stageHeight / 2; // 화면 중앙
    this.speed = Math.random() * 2 + 1;

    this.fps = 24;
    this.fpsTime = 1000 / this.fps;
  }

  draw(ctx, t, dots) {
    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.curFrame += 1;
      if (this.curFrame == this.totalFrame) {
        this.curFrame = 0;
      }
    }
    this.animate(ctx, dots);
  }

  animate(ctx, dots) {
    this.x -= this.speed;
    const closest = this.getY(this.x, dots);
    this.y = closest.y;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "#000000";
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.dochiWidthHalf,
      -this.dochiHeight + 20,
      this.dochiWidth,
      this.dochiHeight
    );
    ctx.restore();

    // 화면 왼쪽 끝에 도달하면 다시 오른쪽에서 나타나도록 함
    if (this.x < -this.dochiWidth) {
      this.x = this.stageWidth;
    }
  }

  getY(x, dots) {
    for (let i = 1; i < dots.length; i++) {
      if (x >= dots[i].x1 && x <= dots[i].x3) {
        return this.getY2(x, dots[i]);
      }
    }

    return {
      y: this.stageHeight / 2,
      rotation: 0,
    };
  }

  getY2(x, dot) {
    const total = 200;
    let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, 0);
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, t);

      if (x >= prevX && x <= pt.x) {
        return pt;
      }
      prevX = pt.x;
    }
    return pt;
  }

  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
    };
  }
}

export default Dochi;
