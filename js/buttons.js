class Button {
  constructor(ctx, game, x, y, effect) {
    this.game = game;
    this.ctx = ctx;
    this.width = 26;
    this.height = 26;
    this.posX = x;
    this.posY = y;
    this.image = new Image();
    this.effect = effect;
    this.chooseImage();
  }

  chooseImage() {
    switch (this.effect) {
      case "red":
        this.image.src = "./images/redButton.png";
        break;
      case "blue":
        this.image.src = "./images/blueButton.png";
        break;
      case "yellow":
        this.image.src = "./images/yellowButton.png";
        break;
      case "fast":
        this.image.src = "./images/fastButton.png";
        break;
      case "play":
        this.image.src = "./images/playButton.png";
        break;
      case "pause":
        this.image.src = "./images/pauseButton.png";
        break;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
