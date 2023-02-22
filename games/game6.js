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
  div;
  reboursInterval;
  isPlaying;
  xMouse;
  footer;
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

    this.consigne = document.createElement("h3");
    this.consigne.innerHTML = "Testez votre rapidité en éteignant le plus de lumière dans le temps imparti";

    this.startBtn = document.createElement("button");
    this.startBtn.innerHTML = "Commencer";

    this.compteur = document.createElement("p");

    this.scoreDisplay = document.createElement("h4");

    this.div = document.createElement("div");
    this.div.classList.add("rowBlock");

    this.footer = document.createElement("footer");

    this.nbRow = 4;
    this.nbCol = 7;

    this.container.appendChild(this.consigne);

    for (let r = 0; r < this.nbRow; r++) {
      let divRow = this.createDiv("row");
      for (let c = 0; c < this.nbCol; c++) {
        divRow.appendChild(this.createDiv("col", `${r*this.nbCol + c}`));
      }
      this.div.appendChild(divRow);
    }

    this.footer.appendChild(this.scoreDisplay);
    this.footer.appendChild(this.compteur);
    this.footer.appendChild(this.startBtn);

    this.container.appendChild(this.div);
    this.container.appendChild(this.footer);

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
    parent.compteur.innerHTML = parent.timer;
    if (parent.timer > 0) {
      parent.timer--;
    }
    else {
      parent.isPlaying = false;
      document.getElementById(parent.currentId).classList.remove("light");
      parent.startBtn.style.display = "block";
      parent.compteur.style.display = "none";
      clearInterval(parent.reboursInterval);
    }
  }

  afficheScore(score) {
    this.scoreDisplay.innerHTML = `Score : ${this.score}`;
  }

  main() {
    this.startBtn.addEventListener("click", () => {
      this.start();
      this.startBtn.style.display = "none";
      this.compteur.style.display = "block";
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