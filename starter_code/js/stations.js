class Stations {
  constructor(ctx, time) {
    this.ctx = ctx;
    this.width = 30;
    this.height = 30;
    this.posX = randomX; //dentro de un rango que se amplia con el tiempo restarle la mitad del ancho
    this.posY = randomY; //dentro de un rango que se amplia con el tiempo restarle la mitad del alto
    this.type = Math.floor(Math.random() * (3 - 1)) + 1; // entre 1 y 3
    this.passengers = 0;
    this.image = new Image();
    this.chooseImage();
    this.connectedStations = []
  }

  chooseImage() {
    switch (this.type) {
      case 1:
        this.image.src = "images/stationTriangle.png";
        break;
      case 2:
        this.image.src = "images/stationSquare.png";
        break;
      case 3:
        this.image.src = "images/stationCircle.png";
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

  addPassenger() {
    this.passengers += 1;
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

  connectStation(otherStation){
      // la linea llama a esta funcion cuando acaba la linea y pushea a this.connectedStations la nueva estacion
  }
}
