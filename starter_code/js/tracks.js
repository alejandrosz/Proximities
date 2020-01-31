class Track {
  constructor(ctx, colour, time, width, height) {
    this.ctx = ctx;
    this.originStation = undefined;
    this.endStation = undefined;
    this.colour = colour;
    this.connectedStops = [];
    this.nodes = [];
    this.offset = 0;
    this.trains = [];
    this.time = time;
    this.width = width;
    this.height = height;
    this.availableTracks = undefined;
    this.maximumLength = 300;
  }

  draw() {
    this.availableTracks = Math.max(
      0,
      this.maximumLength - Math.floor(this.totalLength())
    );
    if (this.nodes.length > 1) {
      this.ctx.beginPath();
      this.ctx.lineWidth = "10";
      this.ctx.lineJoin = "round";
      this.ctx.strokeStyle = this.colour;
      this.ctx.moveTo(this.nodes[0].x + 20, this.nodes[0].y + 20);
      this.nodes.forEach((node, i) => {
        if (i > 0) {
          this.ctx.lineTo(node.x + 20, node.y + 20);
        }
      });
      this.ctx.stroke();
      this.ctx.closePath();
      this.drawTrains();
      this.drawText();
    }
  }
  drawText() {
    switch (this.colour) {
      case "blue":
        this.offset = +40;
        break;
      case "yellow":
        this.offset = +80;
        break;
      default:
        this.offset = 0;
    }
    this.ctx.font = "16px Helvetica";
    this.ctx.fillText(
      this.availableTracks,
      this.width - 85,
      this.height / 2 + 40 + this.offset,
      35
    );
  }
  drawTrains() {
    this.trains.forEach(train => train.draw());
  }

  getPath() {
    this.nodes = [];
    if (this.connectedStops.length !== 0) {
      // this.createTrain();
      this.connectedStops.forEach((station, i) => {
        this.nodes.push({
          x: station.posX, //+ this.offset,
          y: station.posY //- this.offset
        });
        if (i < this.connectedStops.length - 1) {
          let node = this.calcNode(
            station.posX,
            station.posY,
            this.connectedStops[i + 1].posX,
            this.connectedStops[i + 1].posY
          );
          this.nodes.push({ x: node.x, y: node.y }); // anadir aqui los offset
        }
      });
    }
  }

  totalLength() {
    let long = this.nodes
      .map((node, i) => {
        if (i < this.nodes.length - 1) {
          let x1 = node.x;
          let y1 = node.y;
          let x2 = this.nodes[i + 1].x;
          let y2 = this.nodes[i + 1].y;
          let partialLength = Math.sqrt(
            Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
          );
          return Math.ceil(partialLength / 5) * 5;
        } else {
          return 0;
        }
      })

      .reduce((a, b) => a + b, 0);
    return long;
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
    if (this.availableTracks > 0) {
      if (this.connectedStops.length === 0) {
        station.chooseImageConnected();
        previousStation.chooseImageConnected();
        this.connectedStops.push(previousStation, station);
        station.addTrack(this);
        previousStation.addTrack(this);
      } else if (
        this.connectedStops.length !== 0 &&
        !this.connectedStops.includes(previousStation)
      ) {
        return false;
      } else if (this.connectedStops[0].number === previousStation.number) {
        station.chooseImageConnected();
        this.connectedStops.unshift(station);
        station.addTrack(this);
      } else if (
        this.connectedStops[this.connectedStops.length - 1].number ===
        previousStation.number
      ) {
        station.chooseImageConnected();
        this.connectedStops.push(station);
        station.addTrack(this);
      }
      this.getPath();
      if (this.trains.length === 0) {
        this.createTrain();
      }
    }
  }
  createTrain() {
    this.trains.push(
      new Train(this.ctx, this.nodes, this.connectedStops, this.colour, this)
    );
  }
}
