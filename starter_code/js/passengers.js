class Passenger {
  constructor(ctx, stations, game) {
    this.number = game.passengers.length;
    this.ctx = ctx;
    this.width = 10;
    this.height = 10;
    this.station =
      stations[Math.floor(Math.random() * (stations.length - 0)) + 0]; // una estacion random
    this.type = Math.floor(Math.random() * (4 - 1)) + 1; // entre 1 y 3
    this.image = new Image();
    this.station.addPassenger(this);
    this.chooseImage();
    this.posX = this.station.posX + (this.station.passengers.length - 1) * 11;
    this.posY = this.station.posY - 10;
  }

  chooseImage() {
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
      this.posX, // mas un margen
      this.posY, // mas un margen
      this.width,
      this.height
    );
  }

  travel() {
    let choosenStation = this.checkDestination();
    if (choosenStation) {
      this.isGone=true
      this.station.removePassenger(this);
    }
  }

  checkDestination() {
    let availableStations = this.station.getConnectedStations();
    let possibleStations = availableStations.filter(
      station => station.type === this.type
    );
    if (possibleStations) {
      return possibleStations[
        Math.floor(Math.random() * possibleStations.length) + 1
      ];
    } else {
      return false;
    }
    console.log(this)
  }
}
