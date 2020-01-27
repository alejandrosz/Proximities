class Passengers {
  constructor(ctx, stations) {
    this.ctx = ctx;
    this.width = 10;
    this.height = 10;
    this.station =
      stations[Math.floor(Math.random() * (stations.lenght - 1)) + 1]; // una estacion random
    this.type = Math.floor(Math.random() * (3 - 1)) + 1; // entre 1 y 3
    this.image = new Image();
    this.chooseImage();
  }

  chooseImage() {
    switch (this.type) {
      case 1:
        this.image.src = "images/passengerTriangle.png";
        break;
      case 2:
        this.image.src = "images/passengerSquare.png";
        break;
      case 3:
        this.image.src = "images/passengerCircle.png";
        break;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.station.posX, // mas un margen
      this.station.posY, // mas un margen
      this.width,
      this.height
    );
  }

  checkDestination(){
      this.station.connectedStations // hace un filter para ver si son de su tipo
  }

  travel(){
      // hace las animaciones correspondientes o desaparece a los 4 segundos de checkear que se puede mover 
  }

}
