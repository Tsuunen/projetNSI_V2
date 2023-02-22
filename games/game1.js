export default class Game1 {
  container;
  playButton;
  check1Container;
  check1;
  check1Label;
	check2Container;
	check2;
	check2Label;
  area;
  next;

	constructor(gameArea) {
    this.area = gameArea;
    this.next = document.querySelector(".suivant");

    this.container = document.createElement("div");
    this.container.classList.add("center");
    this.container.classList.add("game1");
    this.container.id = "container";

    this.container = document.createElement("div");
    this.container.classList.add("center");
    this.container.classList.add("game1");
    this.container.id = "container";

    this.playButton = document.createElement("div");
    this.playButton.classList.add("play-button");

    this.check1Container = document.createElement("div");
    this.check1Container.classList.add("checkbox");

    this.check1 = document.createElement("input");
    this.check1.type = "checkbox";
    this.check1.id = "check1";

    this.check1Label = document.createElement("label");
    this.check1Label.setAttribute("for", "check1");
    this.check1Label.textContent = "Veuillez cocher la case avant de commencer";

    this.check2Container = document.createElement("div");
    this.check2Container.classList.add("checkbox");

    this.check2 = document.createElement("input");
    this.check2.type = "checkbox";
    this.check2.id = "check2";

    this.check2Label = document.createElement("label");
    this.check2Label.setAttribute("for", "check2");
    this.check2Label.textContent = "Veuillez cocher toutes les cases !";

    this.check1Container.appendChild(this.check1);
    this.check1Container.appendChild(this.check1Label);

    this.check2Container.appendChild(this.check2);
    this.check2Container.appendChild(this.check2Label);

    this.container.appendChild(this.playButton);
    this.container.appendChild(this.check1Container);
    this.container.appendChild(this.check2Container);
	}

  display() {
    this.area.appendChild(this.container);
  }

  hide() {
    this.container.remove();
  }

  main() {
    this.playButton.addEventListener("click", () => {
      if (!this.check1.checked) {
        this.check1Container.style.display = "block";
      }
      else if (!this.check2.checked && this.check1.checked) {
        this.check2Container.style.display = "block";
      }
      else if (this.check1.checked && this.check2.checked) {
        this.next.click();
      }
    });
  }
}