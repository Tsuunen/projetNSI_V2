export default class Score {
  container;
  message;
  restartBtn;
  area;
  modalWindow;
  messageBox;
  messageBoxContent;
  ici;
  exitBtn;
  next;

  constructor(gameArea) {
    this.area = gameArea;
    this.next = document.querySelector(".suivant");

    this.container = document.createElement("div");
    this.container.classList.add("score");

    this.ici = document.createElement("span");
    this.ici.innerHTML = "ici";
    
    this.message = document.createElement("h2");
    this.message.innerHTML = "Merci d'avoir joué ! Pour tout bug trouvé, veuillez me contacter : ";

    this.restartBtn = document.createElement("button");
    this.restartBtn.innerHTML = "Recommencer";
    this.restartBtn.classList.add("recommencer");

    this.modalWindow = document.createElement("div");
    this.modalWindow.classList.add("modal-window");

    this.messageBox = document.createElement("div");
    this.messageBox.classList.add("message-box");

    this.messageBoxContent = document.createElement("p");
    this.messageBoxContent.classList.add("content");
    this.messageBoxContent.innerHTML = "C'est une blague ?!<br>Si il y a un bug, c'est un code : <a href='https://www.urbandictionary.com/define.php?term=pebkac' target='_blank'>PEBCAK</a>";

    this.exitBtn = document.createElement("button");
    this.exitBtn.innerHTML = "Ok j'ai compris";
    this.exitBtn.classList.add("exit-btn");

    this.message.appendChild(this.ici);
    this.messageBox.appendChild(this.messageBoxContent);
    this.messageBox.appendChild(this.exitBtn);
    this.modalWindow.appendChild(this.messageBox);

    this.container.appendChild(this.message);
    this.container.appendChild(this.restartBtn);
  }

  display() {
    this.next.style.display = "none";
    this.area.appendChild(this.container);
    this.area.appendChild(this.modalWindow);
  }

  main() {
    this.restartBtn.addEventListener("click", () => location.reload());
    this.ici.addEventListener("click", () => {
      console.log('test');
      this.modalWindow.style.display = "block";
    });
    this.exitBtn.addEventListener("click", () => {
      this.modalWindow.style.display = "none";
    })
  }
}