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
      game4(gameArea);
    }
  });
}

// Jeu 4

async function game4(gameArea) {
  // clean();

  document.body.style.cursor = "default";

  const container = document.createElement("div");
  container.id = "container";
  container.classList.add("game4");

  const wordsContainer = document.createElement("div");
  wordsContainer.classList.add("words-container");

  const motASaisir = document.createElement("p");
  motASaisir.id = "word";
  motASaisir.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";

  const consigne = document.createElement("p");
  consigne.classList.add("consigne");
  consigne.innerHTML = "Tapez les mots qui apparaissent à l'écran le plus rapidement possible, appuyez sur 'Enter' pour valider et passer au mot suivant.";

  const liste = document.createElement("ol");

  const startBtn = document.createElement("button");
  startBtn.type = "button";
  startBtn.classList.add("start-btn");
  startBtn.classList.add("active")
  startBtn.innerHTML = "Commencer";

  wordsContainer.appendChild(motASaisir);

  container.appendChild(consigne);
  container.appendChild(wordsContainer);
  container.appendChild(input);
  container.appendChild(startBtn);
  container.appendChild(liste);

  gameArea.appendChild(container);

  let score = 0;
  let timeStart;
  let timer;
  let isPlaying = false;

  initGame4();

  startBtn.addEventListener("click", () => {
    startBtn.classList.toggle("active");
    input.classList.toggle("active");
    wordsContainer.classList.toggle("active");
    isPlaying = true;
    input.focus();

    afficheTexte(randomWords[currentWord]);
    timeStart = new Date().getTime();
  });

  document.addEventListener("keyup", e => {
    const word = document.querySelector("#word");
    console.log("isPlaying : ", isPlaying);
    if (isPlaying) {
      if (e.key == 'Enter') {
        currentWord++;
        if (currentWord <= randomWords.length) {
          if (input.value == word.textContent) {
            score++;
            createListItem(liste, "green");
          }
          else {
            createListItem(liste, "red");
            afficheTexte("Vous avez fait une erreur. La partie est invalidée.<br> Le jeu redémarre...", wordsContainer);
            setTimeout(function () {
              score = 0;
              isPlaying = false;
              initGame4();
            }, 4000);
            return 0;
          }
          if (currentWord < randomWords.length) {
            afficheTexte(randomWords[currentWord], wordsContainer);
          }
          else {
            timer = new Date().getTime() - timeStart;
            console.log(timer);
            let finalScore = getScore(timer, score);
            console.log("final score : ", finalScore);
            afficheTexte(`Votre score est de ${finalScore} mot(s) par minute`, wordsContainer);
            isPlaying = false;
            }
          input.value = "";
        }           
        }
      }
  })
}

function initGame4() {
  const startBtn = document.querySelector(".start-btn");
  const input = document.querySelector("input");
  const wordsContainer = document.querySelector(".words-container");
  const listeItems = document.querySelectorAll("li");
  const mot = document.querySelector("#word");
  currentWord = 0;

  startBtn.classList.add("active");
  input.classList.remove("active");
  wordsContainer.classList.remove("active");

  input.value = "";
  mot.innerHTML = "";

  listeItems.forEach(item => {
    item.remove();
  });

  getRandomWords(5);
}

function afficheTexte(text) {
  const mot = document.querySelector("#word");
  if (mot != null) {
    mot.innerHTML = text;
  }
}

async function getRandomWords(numWords) {
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${numWords}`);
    const data = await response.json();
    randomWords = data; // Affecte le tableau de mots retourné à la variable globale
  } catch (error) {
    console.log(error);
  }
}

function createListItem(liste, color) {
  const listItem = document.createElement("li");
  listItem.innerHTML = randomWords[currentWord - 1];
  listItem.style.color = color;

  liste.appendChild(listItem);
}

function getScore(time, score) {
  if (time != 0) {
    console.log('score : ', score);
    console.log("time : ", time);
    return Math.round(score / ((time * 0.001) / 60)); // * (score / randomWords.lenght);
  }
  return 0;
}

game4(gameArea);
