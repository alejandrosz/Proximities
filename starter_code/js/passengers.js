class Passenger {
  constructor(ctx, stations, game) {
    this.ctx = ctx;
    this.width = 10;
    this.height = 10;
    this.station =
      stations[Math.floor(Math.random() * (stations.length - 0)) + 0]; // una estacion random
    this.type = Math.floor(Math.random() * (4 - 1)) + 1; // entre 1 y 3
    this.image = new Image();
    this.station.addPassenger(this);
    this.number = this.station.passengers.length;
    this.chooseImage();
    this.posX = this.station.posX + (this.station.passengers.length - 1) * 11;
    this.posY = this.station.posY - 10;
    console.log(this);
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

  drawText() {
    this.ctx.fillText(this.number, this.posX + 2, this.posY - 2, 15);
  }

  travel() {
    let choosenStation = this.checkDestination();
    if (choosenStation) {
      this.isGone = true;
      console.log("Gone", this);
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
        Math.floor(Math.random() * possibleStations.length) // aqui habia un +1 sospechoso
      ];
    } else {
      return false;
    }
  }
}
