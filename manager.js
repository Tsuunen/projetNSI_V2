// const en = document.querySelector("#enigme");
// en.appendChild(game);
// en.insert(game)

let gameArea = document.querySelector("#game");

function game1(gameArea) {
  const container = document.createElement("div");
  container.classList.add("center");
  container.classList.add("game1");

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
  check2.id = "check1";

  const check2Label = document.createElement("label");
  check2Label.setAttribute("for", "check1");
  check2Label.textContent = "Veuillez cocher toutes les cases !";

  check1Container.appendChild(check1);
  check1Container.appendChild(check1Label);

  check2Container.appendChild(check2);
  check2Container.appendChild(check2Label);

  container.appendChild(playButton);
  container.appendChild(check1Container);
  container.appendChild(check2Container);

  gameArea.appendChild(container);
}

game1(gameArea);
