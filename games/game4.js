export default class Game4 {
    input;
    score;
    timeStart;
    timer;
    isPlaying;
    container;
    wordsContainer;
    motASaisir;
    consigne;
    liste;
    startBtn;
    currentWord;
    randomWords;
    area;
    Btn;
    next;
  
    constructor(gameArea) {
      this.area = gameArea;
      this.next = document.querySelector(".suivant");
  
      this.container = document.createElement("div");
      this.container.id = "container";
      this.container.classList.add("game4");
  
      this.wordsContainer = document.createElement("div");
      this.wordsContainer.classList.add("words-container");
  
      this.motASaisir = document.createElement("p");
      this.motASaisir.id = "word";
      this.motASaisir.innerHTML = "";
  
      this.input = document.createElement("input");
      this.input.type = "text";
  
      this.consigne = document.createElement("p");
      this.consigne.classList.add("consigne");
      this.consigne.innerHTML = "Tapez les mots qui apparaissent à l'écran le plus rapidement possible, appuyez sur 'Enter' pour valider et passer au mot suivant.";
  
      this.liste = document.createElement("ol");
  
      this.startBtn = document.createElement("button");
      this.startBtn.type = "button";
      this.startBtn.classList.add("start-btn");
      this.startBtn.classList.add("active")
      this.startBtn.innerHTML = "Commencer";

      this.wordsContainer.appendChild(this.motASaisir);
  
      this.container.appendChild(this.consigne);
      this.container.appendChild(this.wordsContainer);
      this.container.appendChild(this.input);
      this.container.appendChild(this.startBtn);
      this.container.appendChild(this.liste);

      this.start(this);
  
    }

    display() {
      this.next.classList.remove("active");
      document.body.style.cursor = "default";
      document.body.style.background = "#F1F1F1";
      this.area.appendChild(this.container);
    }  

    hide() {
      this.container.remove();
    }
  
    async start(parent) {
      parent.currentWord = 0;
      parent.score = 0;
      parent.input.value = "";
      parent.isPlaying = false;
      parent.startBtn.classList.add("active");
      parent.input.classList.remove("active");
      // parent.wordsContainer.classList.remove("active");      
      // parent.motASaisir.innerHTML = "";
  
      let listeItems = document.querySelectorAll("li");
      listeItems.forEach(item => {
        item.remove();
      });
      await parent.getRandomWords(5);
    }
    afficheTexte(text) {
      if (this.motASaisir != null) {
        this.motASaisir.innerHTML = text;
      }
    }
    async getRandomWords(numWords) {
      // this.randomWords = ["misanthropes","antinodes","submit","repertoire","excreter","shorthand","beknot","hyperinflation","feastful","asparagus","gleeked","apostrophise","classons","keglings","schmeared","victorias","illuminates","untrussing","confirmable","questionnaire"];
      try {
        const response = await fetch(`https://random-word-api.herokuapp.com/word?lang=en&number=${numWords}`);
        const data = await response.json();
        this.randomWords = data; // Affecte le tableau de mots retourné à la variable globale
      } catch (error) {
        console.log(error);
      }
    }
  
    createListItem(liste, color) {
      const listItem = document.createElement("li");
      listItem.innerHTML = this.randomWords[this.currentWord - 1];
      listItem.style.color = color;
  
      liste.appendChild(listItem);
    }
  
    getScore(time, score) {
      if (time != 0) {
        return Math.round(score / ((time * 0.001) / 60)); // * (score / randomWords.lenght);
      }
      return 0;
    }

    async main() {
      this.startBtn.addEventListener("click", () => {
        this.startBtn.classList.toggle("active");
        this.input.classList.toggle("active");
        this.wordsContainer.classList.add("active");
        this.input.focus();
        this.isPlaying = true;
        this.afficheTexte(this.randomWords[this.currentWord]);
        this.timeStart = new Date().getTime();
      });
  
      document.addEventListener("keyup", e => {
        if (this.isPlaying) {
          if (e.key == 'Enter') {
            this.currentWord++;
            if (this.currentWord <= this.randomWords.length) {
              if (this.input.value == this.motASaisir.textContent) {
                this.score++;
                this.createListItem(this.liste, "green");
              }
              else {
                this.createListItem(this.liste, "red");
                this.afficheTexte("Vous avez fait une erreur. La partie est invalidée.<br> Le jeu redémarre...", this.wordsContainer);
                setTimeout(this.start, 4000, this);
                return 0;
              }
              if (this.currentWord < this.randomWords.length) {
                this.afficheTexte(this.randomWords[this.currentWord], this.wordsContainer);
              }
              else {
                this.timer = new Date().getTime() - this.timeStart;
                let finalScore = this.getScore(this.timer, this.score);
                this.afficheTexte(`Votre score est de ${finalScore} mots par minute`, this.wordsContainer);
                this.isPlaying = false;
                this.next.classList.add("active");
                this.start(this);
              }
              this.input.value = "";
            }
          }
        }
      })
    }
  }
  