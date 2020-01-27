class Tracks {
  constructor(ctx, colour) {
    this.ctx = ctx;
    this.originStation = undefined;
    this.endStation = undefined;
    // this.posX = randomX;
    // this.posY = randomY;
    this.colour = colour; //|| "#FF0000"; en caso de no tener color asignado, es rojo
    this.connectedStops = [];
  }

  draw() {
    this.ctx.beginPath(); // Start a new path.
    this.ctx.lineWidth = "3";
    this.ctx.strokeStyle = this.colour; // This path is green.
    this.ctx.moveTo(this.connectedStops[0].posX, this.connectedStops[0].posY);
    this.connectedStops.forEach((station, i) => {
      this.ctx.lineTo(station.posX, station.posY);
      this.addNode(station, this.connectedStops[i + 1]);
    }); //meterle una comprobacion de que hay que meter otro nodo
    this.ctx.stroke();
    this.ctx.closePath(); // Close the current path.
  }

  addNode(station, nextStation) {
    if (nextStation) {
      let newNode = calcNode(
        station.posX,
        station.posY,
        nextStation.posX,
        nextStation.posY
      );
      if (newNode.x && newNode.y) {
        return this.ctx.lineTo(newNode.x, newNode.y);
      }
    }
  }

  calcNode(x1, y1, x2, y2) {
    // comprobar signos
    let xdif = Math.abs(x1 - x2);
    let ydif = Math.abs(y1 - y2);
    let x;
    let y;
    if (xdif < ydif) {
      x = x1;
      y = y1 - y2 - (x1 - x2);
    } else if (ydif > xdif) {
      x = x1 - x2 - (y1 - y2);
      y = y1;
    }
    let newNode = { x, y };
    return newNode;
  }
  addStop(station) {
    this.connectedStops.push(station);
  }
}
