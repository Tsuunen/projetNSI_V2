let gameArea = document.querySelector("#game");

function clean() {
  const container = document.querySelector("#container");
  container.remove();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

function game2(gameArea) {
  // clean();

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

    timeoutHandle = window.setTimeout( function() {
      colorArea.classList.remove("red");
      colorArea.classList.add("green");
      btnStop.innerHTML = "Cliquez !!!";
      timerTop = new Date().getTime();

      resetTimeoutHandle = window.setTimeout(function() {
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
  setTimeout(game3, 1500);
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

function game3() {
  clean();
}

game2(gameArea);
