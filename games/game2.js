export default class Game2 {
  container;
  consigne;
  colorArea;
  btnStart;
  btnStop;
  timeStart;
  latence;
  timerTop;
  timeoutHandle;
  resetTimeoutHandle;
  area;

  constructor(gameArea) {
    this.area = gameArea;
    this.container = document.createElement("div");
    this.container.id = "container";
    this.container.classList.add("game2");
  
    this.consigne = document.createElement("p");
    this.consigne.innerHTML = "Cliquez sur le bouton 'commencer' et testez votre rapidité !";
  
    this.colorArea = document.createElement("div");
    this.colorArea.classList.add("color-area");
  
    this.btnStart = document.createElement("button");
    this.btnStart.type = "button";
    this.btnStart.classList.add("active");
    this.btnStart.id = "btnStart";
    this.btnStart.innerHTML = "Commencer";
  
    this.btnStop = document.createElement("button");
    this.btnStop.type = "button";
    this.btnStop.id = "btnStop";
    this.btnStop.innerHTML = "Attendez ...";
  
    this.container.appendChild(this.consigne);
    this.container.appendChild(this.colorArea);
    this.container.appendChild(this.btnStart);
    this.container.appendChild(this.btnStop);

    this.start(this);
  }

  display() {
    this.area.appendChild(this.container);
  }

  hide() {
    this.container.remove();
  }

  start(parent) {
    parent.colorArea.classList.remove("red");
    parent.colorArea.classList.remove("green");
  
    parent.btnStop.classList.remove("active");
    parent.btnStart.classList.add("active");
  
    parent.resetTimeoutHandle = null;
  
    parent.btnStop.innerHTML = "Attendez ...";
  }

  perdu(timeDiff, m) {
    this.btnStop.innerHTML = m;
    this.setTimeoutManual(this.start, 1500, this);
  }

  setTimeoutManual(func, tps, parent) {
    window.setTimeout(func, tps, parent);
  }
  
  affichePerf(timeDiff) {
    this.btnStop.innerHTML = `${timeDiff}ms`;
    setTimeout(this.hide, 1500);
  }

  timerTimeout(game) {
    game.colorArea.classList.remove("red");
    game.colorArea.classList.add("green");
    game.btnStop.innerHTML = "Cliquez !!!";
    game.timerTop = new Date().getTime();

    game.resetTimeoutHandle = window.setTimeout(game.start, 1500, game);
  }

  main() {
    this.btnStart.addEventListener("click", () => {
      this.latence = 1000 + Math.random() * 2000;
      this.colorArea.classList.add("red");
      this.btnStart.classList.toggle("active");
      this.btnStop.classList.toggle("active");
      this.timeStart = this.timerTop = new Date().getTime();
  
      this.timeoutHandle = window.setTimeout(this.timerTimeout, this.latence, this);
    });
  
    this.btnStop.addEventListener("click", () => {
      window.clearTimeout(this.timeoutHandle);
      if (this.resetTimeoutHandle !== null) {
        window.clearTimeout(this.resetTimeoutHandle);
      }
  
      let timer = new Date().getTime();
  
      if (timer - this.timeStart < this.latence) {
        this.perdu(timer - this.timeStart, "TRICHEUR !!!");
      }
      else {
        let perf = timer - this.timerTop;
  
        if (perf > 300) {
          this.perdu(perf, "Trop lent !");
        }
        else {
          this.affichePerf(perf);
        }
      }
    });
  }
}