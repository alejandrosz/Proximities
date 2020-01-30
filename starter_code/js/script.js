window.onload = function() {
  document.getElementById("start-image").onclick = function() {
    startGame();
  };

  function startGame() {
    Game.init();
  }
};
