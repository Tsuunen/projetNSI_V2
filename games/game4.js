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
    idWord;
    currentWord;
    randomWords;
  
      constructor(gameArea) {
      document.body.style.cursor = "default";
  
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
  
      gameArea.appendChild(this.container);
  
      this.idWord = document.querySelector("#word");
      this.start();
  
    }
  
  
    async start() {
      this.currentWord = 0;
      this.score = 0;
      this.input.value = "";
      this.idWord.innerHTML = "";
      this.isPlaying = false;
      this.startBtn.classList.add("active");
      this.input.classList.remove("active");
      this.wordsContainer.classList.remove("active");
  
      let listeItems = document.querySelectorAll("li");
      listeItems.forEach(item => {
        item.remove();
      });
      await this.getRandomWords(5);
    }
    afficheTexte(text) {
      if (this.idWord != null) {
        this.idWord.innerHTML = text;
      }
    }
    async getRandomWords(numWords) {
      // this.randomWords = ["misanthropes","antinodes","submit","repertoire","excreter","shorthand","beknot","hyperinflation","feastful","asparagus","gleeked","apostrophise","classons","keglings","schmeared","victorias","illuminates","untrussing","confirmable","questionnaire"];
      try {
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${numWords}`);
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
        console.log('score : ', score);
        console.log("time : ", time);
        return Math.round(score / ((time * 0.001) / 60)); // * (score / randomWords.lenght);
      }
      return 0;
    }
  
    async main() {
      this.startBtn.addEventListener("click", () => {
        this.startBtn.classList.toggle("active");
        this.input.classList.toggle("active");
        this.wordsContainer.classList.toggle("active");
        this.input.focus();
        this.isPlaying = true;
        console.log(this.currentWord);
        this.afficheTexte(this.randomWords[this.currentWord]);
        this.timeStart = new Date().getTime();
      });
  
      document.addEventListener("keyup", e => {
        console.log("isPlaying : ", this.isPlaying);
        if (this.isPlaying) {
          if (e.key == 'Enter') {
            this.currentWord++;
            if (this.currentWord <= this.randomWords.length) {
              if (this.input.value == this.idWord.textContent) {
                this.score++;
                this.createListItem(this.liste, "green");
              }
              else {
                this.createListItem(this.liste, "red");
                this.afficheTexte("Vous avez fait une erreur. La partie est invalidée.<br> Le jeu redémarre...", this.wordsContainer);
                setTimeout(function () {
                  game4.start();
                }, 4000);
                return 0;
              }
              if (this.currentWord < this.randomWords.length) {
                this.afficheTexte(this.randomWords[this.currentWord], this.wordsContainer);
              }
              else {
                this.timer = new Date().getTime() - this.timeStart;
                console.log(this.timer);
                let finalScore = this.getScore(this.timer, this.score);
                console.log("final score : ", finalScore);
                this.afficheTexte(`Votre score est de ${finalScore} mot(s) par minute`, this.wordsContainer);
                this.isPlaying = false;
              }
              this.input.value = "";
            }
          }
        }
      })
    }
  }
  