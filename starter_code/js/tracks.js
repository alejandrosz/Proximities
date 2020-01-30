class Track {
  constructor(ctx, colour, time, width, height) {
    this.ctx = ctx;
    this.originStation = undefined;
    this.endStation = undefined;
    this.colour = colour; //|| "#FF0000"; en caso de no tener color asignado, es rojo
    this.connectedStops = [];
    this.nodes = [];
    this.offset = 0;
    this.trains = [];
    this.time = time;
    this.width = width;
    this.height = height;
    this.availableTracks = undefined;
    this.maximumLength = 300;
    // this.createFirstTrain()
  }

  draw() {
    this.availableTracks = Math.max(
      0,
      this.maximumLength - Math.floor(this.totalLength())
    );
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
      this.drawTrains();
      this.drawText();
      // console.log("this.trains", this.trains);
    }
  }
  drawText() {
    switch (this.colour) {
      case "blue":
        this.offset = +30;
        break;
      case "yellow":
        this.offset = +60;
        break;
      default:
        this.offset = 0;
    }
    this.ctx.font = "16px Helvetica";
    this.ctx.fillText(
      this.availableTracks,
      this.width - 80,
      this.height - 295 + this.offset,
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

    // console.log("nodes del track", this.nodes);
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
      // .reduce((acc, current) => acc + current);
      // .reduce(function(a,b){return a + b})
      // .reduce( ( sum, { x } ) => sum + x , 0)
      .reduce((a, b) => a + b, 0);
    return long;
  }

  // availableTracks() {
  //   let availableTracks = this.maximumLength - this.availableTracks();
  //   return availableTracks;
  // }

  // addNode(station, nextStation) {
  //   if (nextStation) {
  //     let newNode = this.calcNode(
  //       station.posX + 20,
  //       station.posY + 20,
  //       nextStation.posX + 20,
  //       nextStation.posY + 20
  //     );
  //     if (newNode.x && newNode.y) {
  //       return this.ctx.lineTo(newNode.x, newNode.y);
  //     }
  //   }
  // }

  calcNode(x1, y1, x2, y2) {
    const xDif = Math.abs(x1 - x2);
    const yDif = Math.abs(y1 - y2);
    const dif = xDif < yDif ? xDif : yDif;
    const x = x1 + (x1 > x2 ? -1 : 1) * dif;
    const y = y1 + (y1 > y2 ? -1 : 1) * dif;
    const newNode = { x, y };
    return newNode;
  }
  // createFirstTrain() {
  //   if (this.connectedStops.length === 2 && this.trains.length === 0) {
  //     this.createTrain;
  //   }
  // }

  addStop(previousStation, station) {
    if (this.availableTracks > 0) {
      if (this.connectedStops.length === 0) {
        this.connectedStops.push(previousStation, station);
        station.addTrack(this);
        previousStation.addTrack(this);
        // this.createTrain();
      } else if (
        this.connectedStops.length !== 0 &&
        !this.connectedStops.includes(previousStation)
      ) {
        return false;
      } else if (this.connectedStops[0].number === previousStation.number) {
        this.connectedStops.unshift(station);
        //this.trains.forEach( si va en la direccion 1 train.nextIndex += 1, si no, no haces nada)
        station.addTrack(this);
      } else if (
        this.connectedStops[this.connectedStops.length - 1].number ===
        previousStation.number
      ) {
        this.connectedStops.push(station);
        //this.trains.forEach, si va en la direccion -1, le restas un indice, y si no no haces nada
        station.addTrack(this);
      }
      this.getPath();

      console.log(this.availableTracks);
      if (this.trains.length === 0) {
        this.createTrain();
      }
    }
  }
  createTrain() {
    this.trains.push(
      new Train(this.ctx, this.nodes, this.connectedStops, this.colour, this)
    );
    console.log("new train");
  }
}
