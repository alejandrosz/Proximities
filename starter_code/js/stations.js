class Station {
  constructor(ctx, width, height, game, time) {
    this.game = game;
    this.number = game.stations.length;
    this.ctx = ctx;
    this.width = 40;
    this.height = 40;
    this.posX = undefined;
    this.posY = undefined;
    this.type = Math.floor(Math.random() * (4 - 1)) + 1; // entre 1 y 3
    this.passengers = [];
    this.image = new Image();
    this.chooseImage();
    this.chooseLocation(width, height);
    this.connectedStations = [];
  }
  chooseLocation(width, height) {
    let posX = Math.floor(
      width / 2 + (Math.floor(Math.random() * (5 - -5)) + -5) * 60
    );
    let posY = Math.floor(
      height / 2 + (Math.floor(Math.random() * (5 - -5)) + -5) * 60
    );
    let coincidences = 0;
    let range = 100;
    this.game.stations.forEach(station => {
      let wrongX = station.posX - range <= posX && posX < station.posX + range;
      let wrongY = station.posY - range <= posY && posY < station.posY + range;
      if (wrongX && wrongY) {
        coincidences += 1;
      }
      if (coincidences === 0) {
        this.posX = posX;
        this.posY = posY;
      } else {
        this.chooseLocation(width, height);
      }
    });
  }
  chooseImage() {
    switch (this.type) {
      case 1:
        this.image.src = "./images/stationTriangle.png";
        break;
      case 2:
        this.image.src = "./images/stationSquare.png";
        break;
      case 3:
        this.image.src = "./images/stationCircle.png";
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

  addPassenger(passenger) {
    this.passengers.push(passenger);
  }

  removePassengers() {
    this.passengers -= 1;
  }

  checkLimit() {
    if (this.passengers >= 12) {
      return true;
    } else {
      return false;
    }
  }

  connectStation(otherStation) {
    // la linea llama a esta funcion cuando acaba la linea y pushea a this.connectedStations la nueva estacion
  }
}
