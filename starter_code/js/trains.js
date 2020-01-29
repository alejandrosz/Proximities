class Train {
  constructor(ctx, track, time) {
    this.ctx = ctx;
    this.track = track;
    this.width = 30;
    this.height = 30;
    this.nodes = track.nodes;
    this.posX = this.track.connectedStops[0].posX;
    this.posY = this.track.connectedStops[0].posY;
    this.colour = track.colour;
    this.time = time;
    this.velocity = undefined;
  }
  draw() {
    this.ctx.fillStyle = this.colour;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    // this.ctx.stroke();
  }

  move() {
    // this.getInterPoints({ x: 100, y: 100 }, { x: 300, y: 300 }, 10);
    this.nodes.forEach(function(node, idx) {
      if (idx < this.nodes.length) {
        let x1 = node.x;
        let y1 = node.y;
        let x2 = this.nodes[idx + 1].x;
        let y2 = this.nodes[idx + 1].y;
        let points = { xa: x1, ya: y1, xb: x2, yb: y2 };
        switch (points) {
          // case 00:00
          case points.xa === points.xb && points.ya > points.yb:
            this.posX = this.posX;
            this.posY -= 1;
            break;
          //case 13:30
          case points.xa < points.xb && points.ya > points.yb:
            this.posX += 1;
            this.posY -= 1;
            break;
          //case 15:00
          case points.xa < points.xb && points.ya === points.yb:
            this.posX += 1;
            this.posY = this.posY;
            break;
          //case 16:30
          case points.xa < points.xb && points.ya < points.yb:
            this.posX += 1;
            this.posY += 1;
            break;
          //case 18:00
          case points.xa === points.xb && points.ya < points.yb:
            this.posX = this.posX;
            this.posY += 1;
            break;
          //case 19:30
          case points.xa > points.xb && points.ya < points.yb:
            this.posX -= 1;
            this.posY += 1;
            break;
          //case 21:00
          case points.xa > points.xb && points.ya === points.yb:
            this.posX -= 1;
            this.posY = this.posY;
            break;
          //case 22:30
          case points.xa > points.xb && points.ya > points.yb:
            this.posX -= 1;
            this.posY -= 1;
            break;
        }
      }
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
