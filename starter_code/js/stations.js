class Station {
  constructor(ctx, width, height, time) {
    this.ctx = ctx;
    this.width = 40;
    this.height = 40;
    this.posX = width/2 + (Math.floor(Math.random() * (4 - (-4))) + (-4))*60; //dentro de un rango que se amplia con el tiempo restarle la mitad del ancho
    this.posY = height/2 + (Math.floor(Math.random() * (4 - (-4))) + (-4))*60; //dentro de un rango que se amplia con el tiempo restarle la mitad del alto
    this.type = Math.floor(Math.random() * (4 - 1)) + 1; // entre 1 y 3
    this.passengers = 0;
    this.image = new Image();
    this.chooseImage();
    // this.image.src = "./images/stationTriangle.png";

    // this.image.src = "images/bg.png";
    this.connectedStations = []
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
