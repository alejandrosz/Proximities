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
        this.addNode(station, this.connectedStops[i + 1]);
      });
      this.ctx.stroke();

      this.ctx.closePath(); // Close the current path.
    }
  }

  addNode(station, nextStation) {
    if (nextStation) {
      let newNode = this.calcNode(
        station.posX + 20,
        station.posY + 20,
        nextStation.posX + 20,
        nextStation.posY + 20
      );
      if (newNode.x && newNode.y) {
        return this.ctx.lineTo(newNode.x, newNode.y);
      }
    }
  }

  calcNode(x1, y1, x2, y2) {
    const xDif = Math.abs(x1 - x2);
    const yDif = Math.abs(y1 - y2);
    const dif = xDif < yDif ? xDif : yDif;
    const x = x1 + (x1 > x2 ? -1 : 1) * dif;
    const y = y1 + (y1 > y2 ? -1 : 1) * dif;
    const newNode = { x, y };
    return newNode;
  }
  addStop(station) {
    if (!this.connectedStops.includes(station)) {
      this.connectedStops.push(station);
      station.addTrack(this)
    }
  }
}
