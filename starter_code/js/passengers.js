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
    this.posX = undefined;
    this.posY = undefined;
    this.train = undefined;
  }
  getPosition() {
    console.log("train x", this.train);
    if (this.train ) {
      this.posX = this.train.posX + 60;
      this.posY = this.train.posY - 60;
    } else {
      this.posX = this.station.posX + (this.station.passengers.length - 1) * 11;
      this.posY = this.station.posY - 10;
    }
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
    this.getPosition()
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
    let choosedTrain = this.checkTrain();
    if (choosenStation && choosedTrain) {
      this.isGone = true;
      this.station.removePassenger(this);
      this.getTrain();
      console.log(this.train)
      //this.getPosition()
      this.train.passengers.push(this);
    }
  }

  checkTrain() {
    let availableTrain = this.station.isTrain;
    return availableTrain;
  }
  getTrain() {
    let myTrain = this.station.tracks[0].trains[0];
    this.train = myTrain;
    
  }

  checkDestination() {
    let availableStations = this.station.getConnectedStations();
    let possibleStations = availableStations.filter(
      station => station.type === this.type
    );
    if (possibleStations) {
      return possibleStations[
        Math.floor(Math.random() * possibleStations.length)
      ];
    } else {
      return false;
    }
  }
}
