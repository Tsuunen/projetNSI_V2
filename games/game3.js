export default class Game3 {
  container;
  torch;
  torchIcon;
  btn;
  torchEnable;
  area;

  constructor(gameArea) {
    this.area = gameArea;
    this.torchEnable = false;

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
  }

  display() {
    document.body.style.background = "#000";
    this.area.appendChild(this.container);
  }

  hide() {
    this.container.remove();
  }

  main() {
    this.btn.style.left = `${Math.random() * (screen.width - 100)}px`;
    this.btn.style.top = `${70 + Math.random() * (screen.height - 190)}px`;
  
    document.addEventListener("mousemove", e => {
      if (this.torchEnable) {
        this.torch.style.left = `${e.x}px`;
        this.torch.style.top = `${e.y}px`;
      }
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
        document.body.style.background = "#F1F1F1";
        document.body.style.cursor = "default";
        this.hide();
      }
    });
  }
}