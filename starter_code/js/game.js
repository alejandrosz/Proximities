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

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
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
    console.log(this.tracks);
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.createStationsOnTime();
      this.createPassengersOnTime();
      this.drawAll();
      // this.generateAll();
      // this.moveAll();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.createStarterStations();
    this.createStartedTracks();
    this.setListeners();
  },
  drawAll() {
    this.background.draw();
    this.tracks.forEach(track => track.draw());
    this.stations.forEach(station => station.draw());
    this.passengers.forEach(passenger => passenger.draw());
    // this.trains.forEach(train => train.draw());
  },
  // moveAll() {
  // this.character.move();
  // this.character.jump();
  // this.obstacles.forEach(obs => obs.move());
  // this.background.move();
  // },

  gameOver() {
    clearInterval(this.interval);
  },

  setListeners() {
    this.station;
    this.endStation;

    this.canvas.addEventListener(
      "mousedown",
      // function() {
      //   console.log("ola k ase");
      // }
      //   (e => {
      //     let pressMouseX = e.clientX;
      //     let pressMouseY = e.clientY;
      //     selectedStation = this.closestClickedStation(pressMouseX, pressMouseY);
      //     if (selectedStation) {
      //       this.selectedTrack.addStop(selectedStation);
      //     }
      //     this.dragging = true;
      //   }
      // );
      e => {
        let selectedStation = this.closestClickedStation(e.clientX, e.clientY);
        if (selectedStation) {
          this.selectedTrack.addStop(selectedStation);
          console.log(this.selectedTrack);
        }
      }
    );

    //   this.canvas.addEventListeners(
    //     "mousemove",
    //     (e => {
    //       let currentMouseX = e.clientX;
    //       let currentMouseY = e.clientY;
    //       this.dragging = true;
    //     },
    //     false).bind(this)
    //   );

    //   this.canvas.addEventListeners(
    //     "mouseup",
    //     (e => {
    //       let releaseMouseX = e.clientX;
    //       let releaseMouseY = e.clientY;
    //       this.dragging = true;
    //     },
    //     false).bind(this)
    //   );
  },

  closestClickedStation(mouseX, mouseY) {
    return this.stations.find(station => {
      let goodX = station.posX - 10 <= mouseX && mouseX < station.posX + 90;
      let goodY = station.posY - 10 <= mouseY && mouseY < station.posY + 90;
      if (goodX && goodY) {
        return station;
      } else {
        return false;
      }
    });
  },

  createStartedTracks() {
    let redLine = new Track(this.ctx, "red");
    let blueLine = new Track(this.ctx, "blue");
    let yellowLine = new Track(this.ctx, "yellow");
    this.tracks.push(redLine, blueLine, yellowLine);
    this.selectedTrack = redLine;
  },

  createStarterStations() {
    // this.stations= new Array(4).fill(new Station(this.ctx, this.width, this.height))
    let station1 = new Station(this.ctx, this.width, this.height);
    let station2 = new Station(this.ctx, this.width, this.height);
    let station3 = new Station(this.ctx, this.width, this.height);
    let station4 = new Station(this.ctx, this.width, this.height);
    this.stations.push(station1, station2, station3, station4);
  },

  createStationsOnTime() {
    if (this.framesCounter % 500 === 0) {
      this.stations.push(new Station(this.ctx, this.width, this.height));
    }
  },

  createPassengersOnTime() {
    if (this.framesCounter % 100 === 0) {
      this.passengers.push(new Passenger(this.ctx, this.stations));
    }
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

// window.onresize = setDimensions;
