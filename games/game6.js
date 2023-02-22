export default class Game6 {
  container;
  consigne;
  startBtn;
  compteur;
  score;
  scoreDisplay;
  area;
  startBtn;
  next;
  timer;
  reboursInterval;
  isPlaying;
  xMouse;
  yMouse;
  currentId;
  nbRow;
  nbCol;


  constructor(gameArea) {
    this.area = gameArea;
    this.next = document.querySelector(".suivant");

    this.container = document.createElement("div");
    this.container.id = "container";
    this.container.classList.add("game6");

    this.startBtn = document.createElement("button");
    this.startBtn.innerHTML = "Commencer";

    this.compteur = document.createElement("p");

    this.scoreDisplay = document.createElement("h4");

    this.nbRow = 4;
    this.nbCol = 4;

    for (let r = 0; r < this.nbRow; r++) {
      let divRow = this.createDiv("row");
      for (let c = 0; c < this.nbCol; c++) {
        divRow.appendChild(this.createDiv("col", `${r*this.nbCol + c}`));
      }
      this.container.appendChild(divRow);
    }

    this.container.appendChild(this.compteur);
    this.container.appendChild(this.startBtn);
    this.container.appendChild(this.scoreDisplay);

    this.start();
  }

  start() {
    this.timer = 30;
    this.score = 0;
    this.currentId = 0;
    this.isPlaying = false;
    this.reboursInterval = null;

    this.afficheScore(this.score);
  }

  createDiv(classCSS, id = null) {
    let div = document.createElement("div");
    div.classList.add(classCSS);
    if (id != null) {
      div.id = id;
    }
    return div;
  }

  display() {
    this.area.appendChild(this.container);
  }

  hide() {
    this.container.remove();
  }

  changeCurrentLighted() {
    this.currentId = Math.round(Math.random() * ((this.nbCol * this.nbRow) - 1));
    document.getElementById(this.currentId).classList.add("light");
  }

  compteARebourd(parent) {
    if (parent.timer > 0) {
      parent.timer--;
    }
    else {
      parent.isPlaying = false;
      document.getElementById(parent.currentId).classList.remove("light");
      clearInterval(parent.reboursInterval);
    }
    parent.compteur.innerHTML = parent.timer;
  }

  afficheScore(score) {
    this.scoreDisplay.innerHTML = `Score : ${this.score}`;
  }

  main() {
    this.startBtn.addEventListener("click", () => {
      this.reboursInterval = setInterval(this.compteARebourd, 1000, this);
      console.log(this.reboursInterval);
      this.changeCurrentLighted();
      this.isPlaying = true;
    });

    document.addEventListener("mousemove", e => {
      // e = e || window.event;
      this.x = e.clientX;
      this.y = e.clientY;
    });

    document.addEventListener("click", () => {
      let clickedId = document.elementFromPoint(this.x, this.y).id;
      if (this.isPlaying) {
        if (this.currentId == clickedId) {
          this.afficheScore(++this.score);
          document.getElementById(this.currentId).classList.remove("light");
          this.changeCurrentLighted();
        }
      }
    }); 
  }
}