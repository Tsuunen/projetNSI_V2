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
  consigne;
  next;

	constructor(gameArea) {
    this.area = gameArea;
    this.next = document.querySelector(".suivant");

    this.container = document.createElement("div");
    this.container.classList.add("center");
    this.container.classList.add("game1");
    this.container.id = "container";

    this.container = document.createElement("div");
    this.container.classList.add("game1");
    this.container.id = "container";

    this.playButton = document.createElement("div");
    this.playButton.classList.add("play-button");
    this.playButton.innerHTML = "LET'S PLAY";

    this.check1Container = document.createElement("div");
    this.check1Container.classList.add("checkbox");

    this.check1 = document.createElement("input");
    this.check1.type = "checkbox";
    this.check1.id = "check1";
    this.check1.classList.add("tgl-flip");

    this.check1Label = document.createElement("label");
    this.check1Label.setAttribute("for", "check1");
    this.check1Label.textContent = "Êtes-vous sûr de vouloir jouer ?";

    this.check2Container = document.createElement("div");
    this.check2Container.classList.add("checkbox");

    this.check2 = document.createElement("input");
    this.check2.type = "checkbox";
    this.check2.id = "check2";
    this.check2.classList.add("tgl-flip");

    this.check2Label = document.createElement("label");
    this.check2Label.setAttribute("for", "check2");
    this.check2Label.textContent = "Absolument sûr ?";

    this.consigne = document.createElement("h3");
    this.consigne.innerHTML = "Recliquez sur le bouton après avoir validé vos choix"

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
    this.area.appendChild(this.consigne);
  }

  hide() {
    this.consigne.remove();
    this.container.remove();
  }

  main() {
    this.playButton.addEventListener("click", () => {
      if (!this.check1.checked) {
        this.check1Container.style.display = "block";
        this.consigne.classList.add("active");
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