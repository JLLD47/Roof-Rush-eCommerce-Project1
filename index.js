let playField = document.getElementById("playfield");
let restartView = document.getElementById("restart");
let buttonRestart = document.getElementById("btn-restart");
let buttonStart = document.getElementById("btn-start");
let startView = document.getElementById("start");
let player;
let platform;
let platforms = [];
let coins = [];
let refreshRate = 16;
let gameInterval;
let platformInterval;
let i = 0;
let coinsSpawnInterval;
let scoreInterval
let increment = 1000;
const deadSound = new Audio("./sounds/fall.wav");
const levelSound = new Audio("./sounds/level.wav");
const menuSound = new Audio(  "./sounds/menu.wav"
);
let crazySpeed = true;
let stopPlease;
let checkCollisions;

function gameLoop() {
  stopSound();
  crazySpeed = true;
  levelSound.loop = true;
  levelSound.play();
  newPlayer();
  
  insertFirstPlatform();
  insertSecondPlatform();
  newCoin();
  speedIncrement();
  scoreInterval = setInterval(sumScore, 1000);
  gameInterval = setInterval(updateGame, refreshRate);
}

function newPlayer() {
  player = new Player(300, 200);
  player.spawn();
}

function updateGame() {
  if (player.y + player.height >= 600) {
    endGame();
  } else {
    player.updatePosition();
    player.checkCollision();
    scoreUpdate();
  }
}

function scoreUpdate() {
  let score = document.getElementById("score");
  score.innerText = player.score;
  let endScore = document.getElementById("endScore");
  endScore.innerText = player.score;
}

window.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    player.countJump = 25;
  }
});

function endGame() {
  playField.style.display = "none";
  restartView.classList.add("show");
  document.body.style.overflow = "hidden";
  stopSound();
  cleanAllIntervals();
  cleanArrays();
  player.gameOver();
  deadSound.play()
  stopIncrement();
}

function generateLevel() {
  if (i < levelConfig.length) {
    platform = new Platforms(
      levelConfig[i].width,
      levelConfig[i].height,
      levelConfig[i].x
    );
    platform.insert();
    platforms.push(platform);
    i++;
  } else {
    i = 0;
  }
}

function insertFirstPlatform() {
  let firstPlat = new Platforms(1000, 20, 150);
  firstPlat.insert();
  platforms.push(firstPlat);
}

function insertSecondPlatform() {
  let secondPlat = new Platforms(150, 50);
  secondPlat.insert();
  platforms.push(secondPlat);
}

function newCoin() {
  coinsSpawnInterval = setInterval(function () {
    let random = Math.floor(Math.random() * 5);
    let altura = 0;
    if (random == 0) {
      altura = 400;
    }
    if (random == 1) {
      altura = 350;
    }
    if (random == 2) {
      altura = 300;
    }
    if (random == 3) {
      altura = 250;
    }
    if (random == 4) {
      altura = 375;
    }

    let coin = new Coin(1260, altura);
    coins.push(coin);
    coin.insert();
  }, 500);
}

buttonStart.addEventListener("click", function (event) {
  gameLoop();
  playField.style.display = "block";
  startView.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  if (e.key === " " && !restartView.classList.contains("show")) {
    player.jump();
  }
  if (e.key === " " && restartView.classList.contains("show")){
    restart()
  }
});

buttonRestart.addEventListener("click", function (event) {
restart()
});


function restart(){
  stopSound();
  cleanAllIntervals();
  cleanArrays();
  stopIncrement();
  gameLoop();
  playField.style.display = "block";

  restartView.classList.remove("show");
  document.body.style.overflow = "auto";
}


const levelConfig = [
  { width: 200, height: 100 },
  { width: 180, height: 120 },
  { width: 160, height: 90 },
  { width: 720, height: 110 },
  { width: 220, height: 110 },
  { width: 240, height: 80 },
  { width: 180, height: 130 },
  { width: 160, height: 150 },
  { width: 150, height: 170 },
  { width: 280, height: 130 },
  { width: 180, height: 110 },
  { width: 200, height: 160 },
  { width: 500, height: 140 },
];

function speedIncrement() {
  generateLevel();
  if (crazySpeed) {
    platformInterval = setInterval(generateLevel, increment);

    stopPlease = setTimeout(function () {
      clearInterval(platformInterval);
      increment -= 100;
      Platforms.speed += 1;
      levelSound.playbackRate += 0.09;
      speedIncrement();
    }, 10000);
  }
}

function stopIncrement() {
  crazySpeed = false;
  Platforms.speed = 7;
  increment = 1000;
  clearTimeout(stopPlease);
  i = 0;
}

function cleanAllIntervals() {
  clearInterval(coinsSpawnInterval);
  clearInterval(platformInterval);
  clearInterval(gameInterval);
  clearInterval(scoreInterval);
}

function cleanArrays() {
  if (coins.length) {
    for (let index = 0; index < coins.length; index++) {
      coins[index].remove();
    }
  }
  coins = [];

  platforms.forEach(function (platform) {
    platform.remove();
  });
  platforms = [];
}

function stopSound() {
  coinSound.currentTime = 0;
  coinSound.pause();
  levelSound.pause();
  levelSound.currentTime = 0;
  menuSound.pause();
  levelSound.playbackRate = 1
}


function sumScore () {
player.score += 20;
}

menuSound.play();
