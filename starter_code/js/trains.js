class Train {
  constructor(ctx, track, time) {
    this.ctx = ctx;
    this.track = track;
    this.width = 30;
    this.height = 30;
    this.posX = this.getAllInterPoints().x;
    this.posY = this.getAllInterPoints().y;
    this.colour = track.colour;
    this.time = time;
    this.nodes = track.nodes;
    this.velocity = undefined
  }
  draw() {
    this.ctx.fillStyle = this.colour;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    // this.ctx.stroke();
  }

  getInterPoints(pos, nextPos, steps) {
    let xStep = (pos.x - nextPos.x) / steps;
    let yStep = (pos.y - nextPos.y) / steps;
    let interpolatedPoints = [];
    for (let i = 0; i < steps; i++) {
      let newPos = { x: pos.x + xStep, y: pos.y + yStep };
      interpolatedPoints.push(newPos);
    }
    return interpolatedPoints;
  }
  getAllInterPoints() {
    let allPoints = this.nodes.forEach(function(node, idx) {
      if (idx < this.nodes.length) {
        return this.getInterPoints(node, this.nodes[idx + 1], 10);
      }
    });
    console.log(allPoints);
  }
}
