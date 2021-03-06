class Station {
  constructor(ctx, width, height, game, type) {
    this.game = game;
    this.number = game.stations.length;
    this.ctx = ctx;
    this.width = 40;
    this.height = 40;
    this.posX = width / 2;
    this.posY = height / 2;
    this.type = type || Math.floor(Math.random() * (4 - 1)) + 1; 
    this.passengers = [];
    this.image = new Image();
    this.chooseImage();
    this.chooseLocation(width, height);
    this.tracks = [];
    this.isTrain = false;
  }

  chooseLocation(width, height, i = 0) {
    let posX = Math.floor(
      width / 2 + (Math.floor(Math.random() * (6 - -6)) + -6) * 60
    );
    let posY = Math.floor(
      height / 2 + (Math.floor(Math.random() * (5 - -5)) + -5) * 60
    );
    let coincidences = 0;
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
        if (i < 5) {
          this.chooseLocation(width, height, i + 1);
        }
      }
    });
  }

  checkTrain() {
    this.tracks
      .map(track => track.trains)
      .find(train => {
        let goodX =
          this.posX <= train[0].posX + 30 && train[0].posX < this.posX + 40;
        let goodY =
          this.posY <= train[0].posY + 30 && train[0].posY < this.posY + 40;
        if (goodX && goodY) {
          return (this.isTrain = true);
        } else {
          return (this.isTrain = false);
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

  chooseImageConnected() {
    switch (this.type) {
      case 1:
        this.image.src = "./images/passengerTriangle.png";
        break;
      case 2:
        this.image.src = "./images/passengerSquare.png";
        break;
      case 3:
        this.image.src = "./images/passengerCircle.png";
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

  // drawText() {
  //   this.ctx.fillText(this.number, this.posX - 11, this.posY - 1, 35);
  // }

  addPassenger(passenger) {
    this.passengers.push(passenger);
  }

  removePassenger(passenger) {
    this.passengers = this.passengers.filter(
      item => item.number !== passenger.number
    );
  }

  checkLimit() {
    if (this.passengers.length >= 6) {
      return true;
    } else {
      return false;
    }
  }
  addTrack(track) {
    if (!this.tracks.find(t => t.colour === track.colour)) {
      this.tracks.push(track);
    }
  }

  getConnectedStations() {
    let connectedStations = this.tracks
      .map(track => track.connectedStops)
      .flat();
    return connectedStations;
  }
}
