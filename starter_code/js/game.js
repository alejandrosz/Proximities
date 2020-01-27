const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  stations: [],
  tracks: [],
  passengers: [],
  // trains: [],
  // keys: 32,
  // obstacles: [],

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    // this.allEventListeners();
    this.setDimensions();
    this.setListeners();
    this.start();
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      // if (this.isCollisionsTop()) {
      //   this.gameOver();
      // }
      // if (this.isCollisionsBottom()) {
      //   this.gameOver();
      // }
      // if (this.framesCounter > 1200) this.framesCounter = 0;
      this.drawAll();
      this.moveAll();
      this.generateObstacles();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    // this.character = new Character(this.ctx, 80, 80, 0, this.keys);
    // this.obstacles = [];
  },
  drawAll() {
    this.stations.forEach(station => station.draw());
    this.passengers.forEach(passenger => passenger.draw());
    this.tracks.forEach(track => track.draw());
    // this.trains.forEach(train => train.draw());
  },
  moveAll() {
    this.character.move();
    this.character.jump();
    this.obstacles.forEach(obs => obs.move());
    // this.background.move();
  },



  gameOver() {
    clearInterval(this.interval);
  },

  setListeners() {
    this.station;
    this.endStation;

    this.canvas.addEventListeners(
      "mousedown",
      (e => {
        let pressMouseX = e.clientX;
        let pressMouseY = e.clientY;
        selectedStation = this.closestClickedStation(pressMouseX, pressMouseY);
        if (selectedStation) {
          this.selectedTrack.addStop(selectedStation);
        }
        this.dragging = true;
      },
      false).bind(this)
    );

    this.canvas.addEventListeners(
      "mousemove",
      (e => {
        let currentMouseX = e.clientX;
        let currentMouseY = e.clientY;
        this.dragging = true;
      },
      false).bind(this)
    );

    this.canvas.addEventListeners(
      "mouseup",
      (e => {
        let releaseMouseX = e.clientX;
        let releaseMouseY = e.clientY;
        this.dragging = true;
      },
      false).bind(this)
    );
  },

  closestClickedStation(mouseX, mouseY) {
    return this.stations.find(station => {
      let goodX = station.posX - 25 <= mouseX && mouseX < station.posX + 25;
      let goodY = station.posY - 25 <= mouseY && mouseY < station.posY + 25;
      if (goodX && goodY) {
        return true;
      } else {
        return false;
      }
    });
  },

  createTracks() {
    let redLine = new Track(this.ctx, "red");
    let blueLine = new Track(this.ctx, "blue");
    let yellowLine = new Track(this.ctx, "yellow");
    this.tracks.push(redLine, blueLine, yellowLine);
    this.selectedTrack = redLine;
  },

  selectTrack(colour) {
    this.selectedTrack = this.tracks.find(track => (track.colour = colour));
  }

  // generateObstacles() {
  //   if (this.framesCounter % 90 === 0) {
  //     this.obstacles.push(new Obstacles(this.ctx, this.canvas.width));
  //     //   console.log(this.obstacles);
  //   }
  // },
  // isCollisionsTop() {
  //   return this.obstacles.some(
  //     obs =>
  //       this.character._posX + this.character._width >= obs._posX &&
  //       this.character._posY + this.character._height >= obs._posY &&
  //       this.character._posX <= obs._posX + obs._width &&
  //       this.character._posY <= obs._posY + obs._height
  //   );
  //   console.log(this.character._posX);
  // },

  // isCollisionsBottom() {
  //   return this.obstacles.some(
  //     obs =>
  //       this.character._posX + this.character._width >= obs._posX &&
  //       this.character._posY + this.character._height >= obs._posYBot &&
  //       this.character._posX <= obs._posX + obs._width &&
  //       this.character._posY <= obs._posYBot + obs._height
  //   );
  //   console.log(this.character._posX);
  // },
};

window.onresize = setDimensions;
