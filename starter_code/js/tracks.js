class Track {
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
    this.ctx.lineWidth = "10";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = this.colour; // This path is green.
    if (this.connectedStops.length !== 0) {
      this.ctx.moveTo(
        this.connectedStops[0].posX + 20,
        this.connectedStops[0].posY + 20
      );
      this.connectedStops.forEach((station, i) => {
        this.ctx.lineTo(station.posX + 20, station.posY + 20);
        // this.addNode(station, this.connectedStops[i + 1]);
      });
      this.ctx.stroke();

      this.ctx.closePath(); // Close the current path.
    }
  }

  addNode(station, nextStation) {
    if (nextStation) {
      let newNode = this.calcNode(
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
      y = y2 + 20 - Math.abs(x1 + 20 - x2 + 20);
    } else if (ydif < xdif) {
      x = x2 + 20 - Math.abs(y1 + 20 - y2 + 20);
      y = y1;
    }
    let newNode = { x, y };
    return newNode;
  }
  addStop(station) {
    if (!this.connectedStops.includes(station)) {
      this.connectedStops.push(station);
    }
  }
}
