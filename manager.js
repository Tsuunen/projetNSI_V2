import Game4 from "./games/game4.js";

const gameArea = document.querySelector("#game");
let randomWords = [];
let currentWord = 0;

function clean() {
  const container = document.querySelector("#container");
  container.remove();
}

// Jeu 1

function game1(gameArea) {
  const container = document.createElement("div");
  container.classList.add("center");
  container.classList.add("game1");
  container.id = "container";

  const playButton = document.createElement("div");
  playButton.classList.add("play-button");

  const check1Container = document.createElement("div");
  check1Container.classList.add("checkbox");

  const check1 = document.createElement("input");
  check1.type = "checkbox";
  check1.id = "check1";

  const check1Label = document.createElement("label");
  check1Label.setAttribute("for", "check1");
  check1Label.textContent = "Veuillez cocher la case avant de commencer";

  const check2Container = document.createElement("div");
  check2Container.classList.add("checkbox");

  const check2 = document.createElement("input");
  check2.type = "checkbox";
  check2.id = "check2";

  const check2Label = document.createElement("label");
  check2Label.setAttribute("for", "check2");
  check2Label.textContent = "Veuillez cocher toutes les cases !";

  check1Container.appendChild(check1);
  check1Container.appendChild(check1Label);

  check2Container.appendChild(check2);
  check2Container.appendChild(check2Label);

  container.appendChild(playButton);
  container.appendChild(check1Container);
  container.appendChild(check2Container);

  gameArea.appendChild(container);

  playButton.addEventListener("click", () => {
    if (!check1.checked) {
      check1Container.style.display = "block";
    }
    else if (!check2.checked && check1.checked) {
      check2Container.style.display = "block";
    }
    else if (check1.checked && check2.checked) {
      game2(gameArea);
    }
  });
}

// Jeu 2

function game2(gameArea) {
  clean();

  const container = document.createElement("div");
  container.id = "container";
  container.classList.add("game2");

  const consigne = document.createElement("p");
  consigne.innerHTML = "Cliquez sur le bouton 'commencer' et testez votre rapidité !";

  const colorArea = document.createElement("div");
  colorArea.classList.add("color-area");

  const btnStart = document.createElement("button");
  btnStart.type = "button";
  btnStart.classList.add("active");
  btnStart.id = "btnStart";
  btnStart.innerHTML = "Commencer";

  const btnStop = document.createElement("button");
  btnStop.type = "button";
  btnStop.id = "btnStop";
  btnStop.innerHTML = "Attendez ...";

  container.appendChild(consigne);
  container.appendChild(colorArea);
  container.appendChild(btnStart);
  container.appendChild(btnStop);

  gameArea.appendChild(container);

  // initGame2();

  let timeStart;
  let latence;
  let timerTop;
  let timeoutHandle;
  let resetTimeoutHandle = null;

  btnStart.addEventListener("click", () => {
    latence = 1000 + Math.random() * 2000;
    colorArea.classList.add("red");
    btnStart.classList.toggle("active");
    btnStop.classList.toggle("active");
    timeStart = timerTop = new Date().getTime();

    timeoutHandle = window.setTimeout(function () {
      colorArea.classList.remove("red");
      colorArea.classList.add("green");
      btnStop.innerHTML = "Cliquez !!!";
      timerTop = new Date().getTime();

      resetTimeoutHandle = window.setTimeout(function () {
        initGame2();
      }, 1500);
    }, latence);
  });

  btnStop.addEventListener("click", () => {
    window.clearTimeout(timeoutHandle);
    if (resetTimeoutHandle !== null) {
      window.clearTimeout(resetTimeoutHandle);
    }

    let timer = new Date().getTime();

    if (timer - timeStart < latence) {
      perdu(timer - timeStart, "TRICHEUR !!!");
    }
    else {
      let perf = timer - timerTop;

      if (perf > 300) {
        perdu(perf, "Trop lent !");
      }
      else {
        affichePerf(perf);
      }
    }
  });
}

function perdu(timeDiff, m) {
  btnStop.innerHTML = m;
  setTimeout(initGame2, 1500);
}

function affichePerf(timeDiff) {
  console.log("gagné", timeDiff);
  btnStop.innerHTML = `${timeDiff}ms`;
  setTimeout(game3(gameArea), 1500);
}

function initGame2() {
  const colorArea = document.querySelector(".color-area");
  const btnStop = document.querySelector("#btnStop");
  const btnStart = document.querySelector("#btnStart");

  colorArea.classList.remove("red");
  colorArea.classList.remove("green");

  btnStop.classList.remove("active");
  btnStart.classList.add("active");

  resetTimeoutHandle = null;

  btnStop.innerHTML = "Attendez ...";
}

// Jeu 3

function game3(gameArea) {
  clean();

  document.body.style.background = "#000";

  const container = document.createElement("div");
  container.classList.add("game3");
  container.id = "container";

  const torch = document.createElement("div");
  torch.classList.add("torch");

  const torchIcon = document.createElement("button");
  torchIcon.classList.add("torch-icon");
  torchIcon.innerHTML = "Allumer la lampe torche"

  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = "Niveau suivant";
  btn.classList.add("finishBtn");

  container.appendChild(torch);
  container.appendChild(torchIcon);
  container.appendChild(btn);

  gameArea.appendChild(container);

  let torchEnable = false;

  btn.style.left = `${Math.random() * (screen.width - 100)}px`;
  btn.style.top = `${70 + Math.random() * (screen.height - 190)}px`;

  document.addEventListener("mousemove", e => {
    if (torchEnable) {
      torch.style.left = `${e.x}px`;
      torch.style.top = `${e.y}px`;
    }
  });

  torchIcon.addEventListener("click", () => {
    torch.style.display = "block";
    torchEnable = true;
    document.body.style.cursor = "none";
    btn.style.cursor = "pointer";
    torchIcon.style.display = "none";
  });

  btn.addEventListener("click", () => {
    if (torchEnable) {
      document.body.style.background = "#F1F1F1";
      // game4(gameArea);
    }
  });
}

// Jeu 4

let game4 = new Game4(gameArea);

game4.main();
