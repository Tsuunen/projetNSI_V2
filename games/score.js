export default class Score {
  container;
  message;
  restartBtn;
  area;
  ici;
  next;

  constructor(gameArea) {
    this.area = gameArea;
    this.next = document.querySelector(".suivant");

    this.container = document.createElement("div");
    this.container.classList.add("score");

    this.ici = document.createElement("span");
    this.ici.innerHTML = "ici";
    
    this.message = document.createElement("h3");
    this.message.innerHTML = "Merci d'avoir joué ! Pour tout bug trouvé, veuillez me contacter : ";

    this.restartBtn = document.createElement("button");
    this.restartBtn.innerHTML = "Recommencer";

    this.message.appendChild(this.ici);

    this.container.appendChild(this.message);
    this.container.appendChild(this.restartBtn);
  }

  display() {
    this.next.style.display = "none";
    this.area.appendChild(this.container);
  }

  main() {
    this.restartBtn.addEventListener("click", () => location.reload());
    this.ici.addEventListener("click", () => window.alert("Et non, c'était une blague. En cas de bug cela doit venir de chez vous !"));
  }
}