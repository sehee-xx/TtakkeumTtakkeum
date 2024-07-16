export class Hill {
  constructor(color, speed, total) {
    this.color = color;
    this.speed = speed;
    this.total = total;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = [];
    this.gap = Math.ceil(this.stageWidth / (this.total - 2));

    for (let i = 0; i < this.total; i++) {
      this.points[i] = {
        x: i * this.gap,
        y: this.getY(),
      };
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    let dots = [];

    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();

    this.update();

    return dots;
  }

  update() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].x -= this.speed;
    }

    const firstPoint = this.points[0];
    if (firstPoint.x < -this.gap) {
      const lastPoint = this.points[this.points.length - 1];
      this.points.push({
        x: lastPoint.x + this.gap,
        y: this.getYInRange(lastPoint.y),
      });
      this.points.shift();
    }
  }

  getY() {
    const min = this.stageHeight / 4;
    const max = this.stageHeight - min;
    return min + Math.random() * (max - min);
  }

  getYInRange(prevY) {
    const range = this.stageHeight / 8; // 이전보다 작은 범위로 설정
    const min = Math.max(this.stageHeight / 4, prevY - range);
    const max = Math.min(
      this.stageHeight - this.stageHeight / 4,
      prevY + range
    );
    return min + Math.random() * (max - min);
  }
}

export default Hill;
