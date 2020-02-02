class Passenger {
  constructor(ctx, stations, game) {
    this.ctx = ctx;
    this.width = 10;
    this.height = 10;
    this.station =
      stations[Math.floor(Math.random() * (stations.length - 0)) + 0]; 
    this.type = this.getType(); //Math.floor(Math.random() * (4 - 1)) + 1; 
    this.image = new Image();
    this.station.addPassenger(this);
    this.number = this.station.passengers.length;
    this.chooseImage();

    this.posX = this.station.posX + (this.station.passengers.length - 1) * 11;
    this.posY = this.posY = this.station.posY - 10;
    this.train = undefined;
  }

  getType() {
    let types = [1, 2, 3];
    let filtered = types.filter(e => e !== this.station.type);
    let random = Math.floor(Math.random() * (2 - 0)) + 0;
    return filtered[random];
  }
  getPosition() {
    if (this.train) {
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
    this.ctx.drawImage(
      this.image,
      this.posX, 
      this.posY, 
      this.width,
      this.height
    );
  }

  // drawText() {
  //   this.ctx.fillText(this.number, this.posX + 2, this.posY - 2, 15);
  // }

  travel() {
    let choosenStation = this.checkDestination();
    let choosedTrain = this.checkTrain();
    if (choosenStation && choosedTrain) {
      this.isGone = true;
      this.station.removePassenger(this);
      this.getTrain();
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
