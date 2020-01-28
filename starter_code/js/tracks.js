class Track {
  constructor(ctx, colour) {
    this.ctx = ctx;
    this.originStation = undefined;
    this.endStation = undefined;
    // this.posX = randomX;
    // this.posY = randomY;
    this.colour = colour; //|| "#FF0000"; en caso de no tener color asignado, es rojo
    this.connectedStops = [];
    this.nodes = [];
    // this.path = [];
  }

  draw() {
    if (this.nodes.length > 1) {
      this.ctx.beginPath(); // Start a new path.
      this.ctx.lineWidth = "10";
      this.ctx.lineJoin = "round";
      this.ctx.strokeStyle = this.colour; // This path is green.
      this.ctx.moveTo(this.nodes[0].x + 20, this.nodes[0].y + 20);
      this.nodes.forEach((node, i) => {
        if (i > 0) {
          this.ctx.lineTo(node.x + 20, node.y + 20);
        }
      });
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  getPath() {
    this.nodes = [];
    if (this.connectedStops.length !== 0) {
      this.connectedStops.forEach((station, i) => {
        this.nodes.push({ x: station.posX, y: station.posY });
        if (i < this.connectedStops.length - 1) {
          let node = this.calcNode(
            station.posX,
            station.posY,
            this.connectedStops[i + 1].posX,
            this.connectedStops[i + 1].posY
          );
          this.nodes.push(node);
        }
      });
    }
  }

  // getPath() {
  //   this.path = this.connectedStops.map(station => ({
  //     x: station.posX,
  //     y: station.posY
  //   }));
  //   console.log(this.path);
  // }

  // getPath() {
  //   if (this.connectedStops.length >= 2) {
  //     let node = undefined;
  //     this.connectedStops.map((station, i) => {
  //       let stationPos = { x: station.posX, y: station.posY };
  //       if (i < this.connectedStops.length-1) {
  //         node = this.calcNode(
  //           station.posX,
  //           station.posX,
  //           this.connectedStops[i + 1].posX,
  //           this.connectedStops[i + 1].posX
  //         );
  //       }
  //       this.path.push(stationPos, node);
  //     });
  //     console.log(this.connectedStops)
  //     console.log(this.nodes);
  //   }
  // }

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
  addStop(previousStation, station) {
    if (this.connectedStops.length === 0) {
      this.connectedStops.push(previousStation, station);
      station.addTrack(this);
      previousStation.addTrack(this);
    } else if (
      this.connectedStops.length !== 0 &&
      !this.connectedStops.includes(previousStation)
    ) {
      return false;
    } else if (this.connectedStops[0].number === previousStation.number) {
      this.connectedStops.unshift(station);
    } else if (
      this.connectedStops[this.connectedStops.length - 1].number ===
      previousStation.number
    ) {
      this.connectedStops.push(station);
    }
    this.getPath();
    console.log(this.nodes);
    // console.log(this);
    // this.getPath();
  }

  // addStop(station) {
  //   if (!this.connectedStops.includes(station)) {
  //     this.connectedStops.push(station);
  //     station.addTrack(this);
  //   }
  //   console.log(this);
  //   this.getPath();
  // }
}
