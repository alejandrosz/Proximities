const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  stations: [],
  tracks: [],
  buttons: [],
  pickedStations: [],
  multi: 0.9,

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.imageGO = document.querySelector(".game-over-div");
    this.setDimensions();
    this.start();
  },

  setDimensions() {
    this.width =
      window.innerWidth % 2 === 0 ? window.innerWidth : window.innerWidth - 1;
    this.height =
      window.innerHeight % 2 === 0
        ? window.innerHeight
        : window.innerHeight - 1;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  },

  gameOver() {
    clearInterval(this.interval);
    this.imageGO.classList.toggle("hide");
    this.canvas.classList.toggle("hide");
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.createStationsOnTime();
      this.createPassengersOnTime();
      this.removePassengersOnTime();
      // this.tracks.forEach(track => track.availableTracks());
      this.stations.forEach(station => {
        station.checkTrain();
        if (station.checkLimit()) {
          this.gameOver();
        }
      });
      if (this.framesCounter % 800 === 0) {
        this.tracks.forEach(track => (track.maximumLength += 100));
      }
      this.drawAll();
      this.moveAll();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.createStarterTracks();
    this.generateButtons();
    this.createStarterStations();
    this.setListeners();
  },
  createStarterStations() {
    let station1 = new Station(this.ctx, this.width, this.height, this, 1);
    this.stations.push(station1);
    let station2 = new Station(this.ctx, this.width, this.height, this, 2);
    this.stations.push(station2);
    let station3 = new Station(this.ctx, this.width, this.height, this, 3);
    this.stations.push(station3);
  },
  createStarterTracks() {
    let redLine = new Track(
      this.ctx,
      "red",
      this.framesCounter,
      this.width,
      this.height
    );
    let blueLine = new Track(
      this.ctx,
      "blue",
      this.framesCounter,
      this.width,
      this.height
    );
    let yellowLine = new Track(
      this.ctx,
      "yellow",
      this.framesCounter,
      this.width,
      this.height
    );
    this.tracks.push(blueLine, yellowLine, redLine);
    this.selectedTrack = redLine;
  },

  drawAll() {
    this.background.draw();
    this.tracks.forEach(track => {
      track.draw();
    });
    this.stations.forEach(station => {
      station.draw();
      // station.drawText();
      station.passengers.forEach(passenger => {
        passenger.draw();
        // passenger.drawText();
      });
    });
    this.buttons.forEach(button => button.draw());
  },
  moveAll() {
    this.tracks.forEach(track => track.trains.forEach(train => train.move()));
  },

  setListeners() {
    this.station;
    this.endStation;

    this.canvas.addEventListener("mousedown", e => {
      this.onMouseDown(e);
    });

    this.canvas.addEventListener("mouseup", e => {
      this.onMouseUp(e);
    });

    this.canvas.addEventListener("ontouchstart", e => {
      this.onMouseDown(e);
    });

    this.canvas.addEventListener("ontouchend", e => {
      this.onMouseUp(e);
    });
  },

  onMouseDown(e) {
    let selectedStation = this.closestClickedElement(
      e.clientX,
      e.clientY,
      this.stations,
      70
    );
    if (selectedStation && this.pickedStations.length < 2) {
      this.pickedStations.push(selectedStation);
    }

    let selectedButton = this.closestClickedElement(
      e.clientX,
      e.clientY,
      this.buttons,
      30
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
          this.upSpeed();
          break;
        case "play":
          this.normalSpeed();
          break;
        case "pause":
          this.pause();
          break;
      }
    }
  },

  onMouseUp(e) {
    let selectedStation = this.closestClickedElement(
      e.clientX,
      e.clientY,
      this.stations,
      70
    );
    if (selectedStation && this.pickedStations.length === 1) {
      this.selectedTrack.addStop(this.pickedStations[0], selectedStation);
    }
    this.pickedStations = [];
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

  generateButtons() {
    let pauseButton = new Button(
      this.ctx,
      this,
      this.width - 52,
      this.height / 2 - 100,
      "pause"
    );
    let playButton = new Button(
      this.ctx,
      this,
      this.width - 55,
      this.height / 2 - 60,
      "play"
    );
    let fastButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 - 20,
      "fast"
    );
    let redButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 + 20,
      "red"
    );
    let blueButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 + 60,
      "blue"
    );
    let yellowButton = new Button(
      this.ctx,
      this,
      this.width - 50,
      this.height / 2 + 100,
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

  selectTrack(colour) {
    this.selectedTrack = this.tracks.find(track => track.colour === colour);
  },

  pause() {
    this.multi = 10000000;
  },

  normalSpeed() {
    this.multi = 0.9;
  },

  upSpeed() {
    this.multi = 0.3;
  },

  createStationsOnTime() {
    if (this.framesCounter % (650 * this.multi) === 0) {
      this.stations.push(new Station(this.ctx, this.width, this.height, this));
    }
  },

  createPassengersOnTime() {
    if (this.framesCounter % (220 * this.multi) === 0) {
      new Passenger(this.ctx, this.stations, this);
    }
  },

  removePassengersOnTime() {
    if (this.framesCounter % (10 * this.multi) === 0) {
      this.stations.forEach(function(station) {
        station.passengers.forEach(passenger => passenger.travel());
      });
    }
  }
};
