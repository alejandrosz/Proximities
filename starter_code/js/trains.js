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
    this.drawPassenger();
  }
  drawPassenger() {
    this.passengers.forEach((passenger, i) => {
      passenger.posX = this.posX + 10 * i;
      passenger.posY =
        this.passengers.length === 1 ? this.posY + 12 : this.posY;
      passenger.draw();
    });
  }

  // : this.track.nodes; /* .reverse() */ // this.nodes;
  move() {
    if (this.nodes.length === 0) {
      this.nodes = [...this.track.nodes];
    }
    let nodes = this.nodes;
    let idx = this.node;
    if (nodes[idx] && nodes[idx + this.direction]) {
      // console.log('------Idx', this.node, idx + this.direction);
      let x1 = nodes[idx].x;
      let y1 = nodes[idx].y;
      let x2 = nodes[idx + this.direction].x;
      let y2 = nodes[idx + this.direction].y;
      let points = { xa: x1, ya: y1, xb: x2, yb: y2 };
      if (points.xa === points.xb && points.ya === points.yb) {
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
        this.node += this.direction;
      }
    }
    if (
      this.node === this.nodes.length - 1 &&
      this.nodes.length < this.track.nodes.length
    ) {
      if (
        this.nodes[0].x !== this.track.nodes[0].x &&
        this.nodes[0].y !== this.track.nodes[0].y
      ) {
        /* console.log(
          'Añadido al principio estando al final',
        ); */
        this.direction = -1;
        this.node = [...this.track.nodes].findIndex(
          n =>
            n.x === this.nodes[this.nodes.length - 1].x &&
            n.y === this.nodes[this.nodes.length - 1].y
        );
        this.nodes = [...this.track.nodes];
        this.posX = this.nodes[this.node].x;
        this.posY = this.nodes[this.node].y;
      } else if (
        this.nodes[0].x === this.track.nodes[0].x &&
        this.nodes[0].y === this.track.nodes[0].y
      ) {
        /* console.log(
          'Añadido al final estando al final',
        ); */
        this.node = [...this.track.nodes].findIndex(
          n =>
            n.x === this.nodes[this.nodes.length - 1].x &&
            n.y === this.nodes[this.nodes.length - 1].y
        );
        this.nodes = [...this.track.nodes];
        this.posX = this.nodes[this.node].x;
        this.posY = this.nodes[this.node].y;
      }
    } else if (this.node === 0 && this.nodes.length < this.track.nodes.length) {
      if (
        this.nodes[0].x !== this.track.nodes[0].x &&
        this.nodes[0].y !== this.track.nodes[0].y
      ) {
        /* console.log(
          'Añadido al principio estando en el principio',
        ); */
        this.node = [...this.track.nodes].findIndex(
          n => n.x === this.nodes[0].x && n.y === this.nodes[0].y
        );
        this.nodes = [...this.track.nodes];
        this.posX = this.nodes[this.node].x;
        this.posY = this.nodes[this.node].y;
      } else if (
        this.nodes[0].x === this.track.nodes[0].x &&
        this.nodes[0].y === this.track.nodes[0].y
      ) {
        /* console.log(
          'Añadido al final estando en el principio',
        ); */
        this.direction = -1;
        this.node = [...this.track.nodes].findIndex(
          n => n.x === this.nodes[0].x && n.y === this.nodes[0].y
        );
        this.nodes = [...this.track.nodes];
        this.posX = this.nodes[this.node].x;
        this.posY = this.nodes[this.node].y;
      }
    } else if (
      this.node === 0 &&
      this.posX === this.nodes[0].x &&
      this.posY === this.nodes[0].y
    ) {
      // console.log('vuelta al principio');
      this.direction = 1;
    } else if (
      this.node === this.nodes.length - 1 &&
      this.posX === this.nodes[this.nodes.length - 1].x &&
      this.posY === this.nodes[this.nodes.length - 1].y
    ) {
      // console.log('vuelta al final');
      this.direction = -1;
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
    });
  }
}
