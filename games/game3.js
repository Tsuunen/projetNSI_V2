export default class Game3 {
  container;
  torch;
  torchIcon;
  btn;
  torchEnable;
  area;
  next;

  constructor(gameArea) {
    this.area = gameArea;
    this.torchEnable = false;
    this.next = document.querySelector(".suivant");

    this.container = document.createElement("div");
    this.container.classList.add("game3");
    this.container.id = "container";

    this.torch = document.createElement("div");
    this.torch.classList.add("torch");

    this.torchIcon = document.createElement("button");
    this.torchIcon.classList.add("torch-icon");
    this.torchIcon.innerHTML = "Allumer la lampe torche"

    this.btn = document.createElement("button");
    this.btn.type = "button";
    this.btn.innerHTML = "Niveau suivant";
    this.btn.classList.add("finishBtn");

    this.container.appendChild(this.torch);
    this.container.appendChild(this.torchIcon);
    this.container.appendChild(this.btn);

    this.start();
  }

  display() {
    this.next.classList.remove("active");
    document.body.style.background = "#000";
    this.area.appendChild(this.container);
  }

  hide() {
    this.container.remove();
  }

  start() {
    this.torch.style.display = "none";
    document.body.style.cursor = "default";
    this.btn.style.cursor = "default";
    this.torchIcon.style.display = "block";

    this.btn.style.left = `${Math.random() * (screen.width - 100)}px`;
    this.btn.style.top = `${70 + Math.random() * (screen.height - 190)}px`;

  }

  main() {
    document.addEventListener("mousemove", e => {
      this.torch.style.left = `${e.x}px`;
      this.torch.style.top = `${e.y}px`;
    });
  
    this.torchIcon.addEventListener("click", () => {
      this.torch.style.display = "block";
      this.torchEnable = true;
      document.body.style.cursor = "none";
      this.btn.style.cursor = "pointer";
      this.torchIcon.style.display = "none";
    });
  
    this.btn.addEventListener("click", () => {
      if (this.torchEnable) {
        this.next.classList.add("active");
        this.start();
      }
    });
  }
}