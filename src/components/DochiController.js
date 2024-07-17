import Dochi from "./Dochi";

export default class DochiController {
  constructor(stageWidth, stageHeight) {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "/mainDochi.svg";

    this.items = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.cur = 0;
    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addDochi();
  }

  addDochi() {
    this.items.push(new Dochi(this.img, this.stageWidth, this.stageHeight));
  }

  draw(ctx, t, dots) {
    if (this.isLoaded) {
      this.cur += 1;
      if (this.cur > 200) {
        this.cur = 0;
        this.addDochi();
      }

      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.x < -item.dochiWidth) {
          this.items.splice(i, 1);
          this.addDochi();
        } else {
          item.draw(ctx, t, dots);
        }
      }
    }
  }
}
