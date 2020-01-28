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
  buttons: [],
  pickedStations: [],
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
    console.log(this.buttons);
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.passengers = this.getAllPassengers();
      this.createStationsOnTime();
      this.createPassengersOnTime();
      this.removePassengersOnTime();
      this.drawAll();
      // this.moveAll();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.createStarterStations();
    this.createStartedTracks();
    this.generateButtons();
    this.setListeners();
  },
  drawAll() {
    this.background.draw();
    this.tracks.forEach(track => track.draw());
    this.stations.forEach(station => station.draw());
    this.stations.forEach(station => station.drawText());
    this.passengers.forEach(passenger => passenger.draw());
    this.passengers.forEach(passenger => passenger.drawText());
    this.buttons.forEach(button => button.draw());
    // this.trains.forEach(train => train.draw());
  },
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
        let selectedStation = this.closestClickedElement(
          e.clientX,
          e.clientY,
          this.stations,
          70
        );
        if (selectedStation && this.pickedStations.length < 2) {
          this.pickedStations.push(selectedStation);
        }
        if (selectedStation && this.pickedStations.length === 2) {
          this.selectedTrack.addStop(
            this.pickedStations[0],
            this.pickedStations[1]
          );
          this.pickedStations = [];
        }

        // let selectedStation = this.closestClickedElement(
        //   e.clientX,
        //   e.clientY,
        //   this.stations,
        //   70
        // );
        // if (selectedStation) {
        //   this.selectedTrack.addStop(selectedStation);
        //   this.previousStation = selectedStation;
        //   // console.log(this.tracks[0]);
        // }

        let selectedButton = this.closestClickedElement(
          e.clientX,
          e.clientY,
          this.buttons,
          20
        );
        if (selectedButton) {
          switch (selectedButton.effect) {
            case "red":
              this.selectTrack("red");
              break;
            case "blue":
              this.selectTrack("blue");
              break;
            case "yellow":
              this.selectTrack("yellow");
              break;
            case "fast":
              console.log("fast");
              break;
            case "play":
              console.log("play");
              break;
            case "pause":
              console.log("pause");
              break;
          }
        }
      }
    );

    //   this.canvas.addEventListeners(
    //   "mouseup",
    //   (e => {
    //     let releaseMouseX = e.clientX;
    //     let releaseMouseY = e.clientY;
    //     this.dragging = true;
    //   },
    //   false).bind(this)
    // );
  },

  closestClickedElement(mouseX, mouseY, elements, range) {
    return elements.find(element => {
      let goodX = element.posX <= mouseX && mouseX < element.posX + range;
      let goodY = element.posY <= mouseY && mouseY < element.posY + range;
      if (goodX && goodY) {
        return element;
      } else {
        return false;
      }
    });
  },
  // closestClickedStation(mouseX, mouseY) { EL BUENO
  //   return this.stations.find(station => {
  //     let goodX = station.posX <= mouseX && mouseX < station.posX + 70;
  //     let goodY = station.posY <= mouseY && mouseY < station.posY + 70;
  //     if (goodX && goodY) {
  //       return station;
  //     } else {
  //       return false;
  //     }
  //   });
  // },
  generateButtons() {
    let pauseButton = new Button(
      this.ctx,
      this,
      this.width - 52,
      this.height / 2 - 75,
      "pause"
    );
    let playButton = new Button(
      this.ctx,
      this,
      this.width - 55,
      this.height / 2 - 45,
      "play"
    );
    let fastButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 - 15,
      "fast"
    );
    let redButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 + 15,
      "red"
    );
    let blueButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 + 45,
      "blue"
    );
    let yellowButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 + 75,
      "yellow"
    );
    this.buttons.push(
      pauseButton,
      playButton,
      fastButton,
      redButton,
      blueButton,
      yellowButton
    );
  },

  createStartedTracks() {
    let redLine = new Track(this.ctx, "red");
    let blueLine = new Track(this.ctx, "blue");
    let yellowLine = new Track(this.ctx, "yellow");
    this.tracks.push(redLine, blueLine, yellowLine);
    this.selectedTrack = redLine;
  },

  getAllPassengers() {
    let allPassengers = this.stations.map(station => station.passengers).flat();
    return allPassengers;
  },

  createStarterStations() {
    // this.stations= new Array(4).fill(new Station(this.ctx, this.width, this.height))
    let station1 = new Station(this.ctx, this.width, this.height, this);
    this.stations.push(station1);
    let station2 = new Station(this.ctx, this.width, this.height, this);
    this.stations.push(station2);
    let station3 = new Station(this.ctx, this.width, this.height, this);
    this.stations.push(station3);
    let station4 = new Station(this.ctx, this.width, this.height, this);
    this.stations.push(station4);
  },

  createStationsOnTime() {
    if (this.framesCounter % 300 === 0) {
      this.stations.push(new Station(this.ctx, this.width, this.height, this));
    }
  },

  createPassengersOnTime() {
    if (this.framesCounter % 150 === 0) {
      new Passenger(this.ctx, this.stations, this);
    }
  },

  removePassengersOnTime() {
    //funciona raro
    if (this.framesCounter % 100 === 0) {
      this.passengers.forEach(passenger => passenger.travel());
    }
  },

  selectTrack(colour) {
    this.selectedTrack = this.tracks.find(track => (track.colour = colour));
  }

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
