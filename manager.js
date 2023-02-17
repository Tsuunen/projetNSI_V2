let gameArea = document.querySelector("#game");

function clean() {
  const container = document.querySelector("#container");
  container.remove();
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
      game2();
    }
  });
}

function game2(gameArea) {
  // clean();

  const container = document.createElement("div");
  container.id = "container";
  container.classList.add("game2");
  container.classList.add("center");

  const colorArea = document.createElement("div");
  colorArea.classList.add("color-area");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = "Commencer";

  container.appendChild(colorArea);
  container.appendChild(btn);

  gameArea.appendChild(container);
}

game2(gameArea);
