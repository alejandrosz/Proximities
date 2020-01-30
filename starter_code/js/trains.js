class Train {
  constructor(ctx, nodes, connectedStops, colour, track) {
    this.ctx = ctx;
    // this.track = track;
    this.width = 30;
    this.height = 30;
    this.nodes = nodes;
    this.posX = connectedStops[0].posX;
    this.posY = connectedStops[0].posY;
    this.colour = colour;
    this.velocity = undefined;
    this.node = 0;
    this.track = track;
    this.offset = 0;
    this.direction = 1;
    this.passengers = [];
  }
  draw() {
    this.ctx.fillStyle = this.colour;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    console.log(this.passengers);
    this.drawPassenger();
  }
  drawPassenger() {
    this.passengers.forEach((passenger, i) => {
      passenger.posX = this.posX + 10 * i ;
      passenger.posY = this.passengers.length === 1? this.posY+12: this.posY;
      passenger.draw();
    });
  }

  // : this.track.nodes; /* .reverse() */ // this.nodes;
  move() {
    let nodes = this.track.nodes.concat(
      [...this.track.nodes].reverse().slice(1, this.track.nodes.length)
    );
    let length = nodes.length;

    // if (length < this.track.nodes.length) {
    //   this.node = 0;
    //   this.posX = nodes[0].x;
    //   this.posY = nodes[0].y;
    // }
    let idx = this.node;
    if (idx < length - 1) {
      let x1 = nodes[idx].x;
      let y1 = nodes[idx].y;
      let x2 = nodes[idx + 1].x;
      let y2 = nodes[idx + 1].y;

      let points = { xa: x1, ya: y1, xb: x2, yb: y2 };
      if (points.xa === points.xb && points.ya === points.yb) {
        //this.node+= 1;
      } else if (points.xa === points.xb && points.ya > points.yb) {
        this.posX = this.posX;
        this.posY -= 1;
      } else if (points.xa < points.xb && points.ya > points.yb) {
        this.posX += 1;
        this.posY -= 1;
      } else if (points.xa < points.xb && points.ya === points.yb) {
        this.posX += 1;
        this.posY = this.posY;
      } else if (points.xa < points.xb && points.ya < points.yb) {
        this.posX += 1;
        this.posY += 1;
      } else if (points.xa === points.xb && points.ya < points.yb) {
        this.posX = this.posX;
        this.posY += 1;
      } else if (points.xa > points.xb && points.ya < points.yb) {
        this.posX -= 1;
        this.posY += 1;
      } else if (points.xa > points.xb && points.ya === points.yb) {
        this.posX -= 1;
        this.posY = this.posY;
      } else if (points.xa > points.xb && points.ya > points.yb) {
        this.posX -= 1;
        this.posY -= 1;
      }
      if (this.posX === points.xb && this.posY === points.yb) {
        this.node += 1;
        /* this.posX = node[0].x;
        this.posY = node[0].y; */
      }
    }
    if (idx === length - 1 || idx < 0) {
      this.node = 0;
      this.posX = nodes[0].x;
      this.posY = nodes[0].y;
      // this.direction *= -1;
    }
    this.checkStation();
  }

  checkStation() {
    this.track.connectedStops.find(station => {
      let goodX =
        this.posX <= station.posX + 40 && station.posX < this.posX + 40;
      let goodY =
        this.posY <= station.posY + 40 && station.posY < this.posY + 40;
      if (goodX && goodY) {
        this.passengers = this.passengers.filter(
          passenger => station.type !== passenger.type
        );
      }

      // console.log(this.track.connectedStops);
    });
  }
}
// getInterPoints(pos, nextPos, steps) {
//   let xStep = (pos.x - nextPos.x) / steps;
//   let yStep = (pos.y - nextPos.y) / steps;
//   let interpolatedPoints = [];
//   for (let i = 0; i < steps; i++) {
//     let newPos = { x: pos.x + xStep, y: pos.y + yStep };
//     interpolatedPoints.push(newPos);
//   }
//   console.log(interpolatedPoints);
//   return interpolatedPoints;
// }
// getAllInterPoints() {
//   let allPoints = this.nodes.forEach(function(node, idx) {
//     if (idx < this.nodes.length) {
//       return this.getInterPoints(node, this.nodes[idx + 1], 10);
//     }
//   });
//   console.log(allPoints);
// }
