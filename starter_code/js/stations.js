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
    this.tracks = [];
    console.log(this)
  }
  chooseLocation(width, height, i = 0) {
    let posX = Math.floor(
      width / 2 + (Math.floor(Math.random() * (5 - -5)) + -5) * 60
    );
    let posY = Math.floor(
      height / 2 + (Math.floor(Math.random() * (5 - -5)) + -5) * 60
    );
    let coincidences = 0;
    // let range = 100;
    this.game.stations.forEach(station => {
      let wrongX = station.posX - 100 <= posX && posX < station.posX + 100;
      let wrongY = station.posY - 100 <= posY && posY < station.posY + 100;
      if (wrongX && wrongY) {
        coincidences += 1;
      }
      if (coincidences === 0) {
        this.posX = posX;
        this.posY = posY;
      } else {
        if (i < 4) {
          this.chooseLocation(width, height, i + 1);
        }
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

  drawText() {
    // this.ctx.font = "15px Verdana";
    this.ctx.fillText(this.number, this.posX-11, this.posY-1, 35)
  }

  addPassenger(passenger) {
    this.passengers.push(passenger);
  }

  removePassenger(passenger) {
    this.passengers = this.passengers.filter(
      item => item.number !== passenger.number /* item.isGone !== true */
    );
  }

  checkLimit() {
    if (this.passengers.length >= 12) {
      return true;
    } else {
      return false;
    }
  }
  addTrack(track) {
    if (!this.tracks.find(t => t.number === track.number)) {
      this.tracks.push(track);
    }
  }

  getConnectedStations() {
    let connectedStations = this.tracks
      .map(track => track.connectedStops)
      .flat();
    // console.log(this.tracks); 
    return connectedStations;
  }
  // connectStation(otherStation) {
  // la linea llama a esta funcion cuando acaba la linea y pushea a this.connectedStations la nueva estacion
  // }
}
