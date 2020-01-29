class Train {
  constructor(ctx, game, track, time) {
    this.ctx = ctx;
    this.game = game;
    this.track = track;
    this.width = 30;
    this.height = 30;
    this.posX = undefined;
    this.posY = undefined;
    this.colour = track.colour;
    this.time = time
  }
  draw() {
    this.ctx.fillStyle = this.colour;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    this.ctx.stroke()
  }
  move() {}

  // getInterPoints(pos, nextPos){
  //   const steps = 10;
  //   const xStep= (pos.x-nextPos.x)/steps;
  //   const yStep= (pos.y-nextPos.y)/steps;
  //   const interpolatedPoints = [];
  //   for(let i=0;i<steps;i++){
  //     const newPos ={x:pos.x + xStep,y:pos.y + yStep}
  //     interpolatedPoints.push(newPos)
  //   }
  //   return interpolatedPoints
  // }
}
