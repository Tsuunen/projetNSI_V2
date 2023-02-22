export default class Game5 {
  container;
  consigne;
  mot;
  randomWord;
  area;
  slicedWord;
  motEnCours;
  recommencer;
  score;
  div1;
  div2;
  perf;

  constructor(gameArea) {
    this.area = gameArea;
    this.motEnCours = [];

    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.container.classList.add("game5");

    this.consigne = document.createElement("h3");
    this.consigne.innerHTML = "Retrouvez le mot caché (en anglais) en tapant les lettres sur votre clavier";

    this.mot = document.createElement("p");
    this.mot.innerHTML = "";

    this.recommencer = document.createElement("button");
    this.recommencer.innerHTML = "Recommencer";

    this.perf = document.createElement("h4");

    this.container.appendChild(this.consigne);
    this.container.appendChild(this.mot);
    this.container.appendChild(this.perf);
    this.container.appendChild(this.recommencer);
    
    this.start();
  }

  async start() {
    this.motEnCours = [];
    await this.getRandomWords(1);
    this.slicedWord = this.randomWord[0].split('');
    this.slicedWord.forEach(letter => {
      this.motEnCours.push("_");
    });
    this.afficheMot(this.motEnCours.join(''));
    console.log(this.slicedWord);

    this.score = 0;
    this.perf.innerHTML = "";
  }

  display() {
    this.area.appendChild(this.container);
  }

  hide() {
    this.container.remove();
  }

  afficheMot(word) {
    this.mot.innerHTML = word;
  }

  actualiseReponse(letter) {
    for (let i = 0; i < this.slicedWord.length; i++) {
      if (this.slicedWord[i] == letter) {
        console.log(i, letter);
        this.motEnCours[i] = letter;
      }      
    }
  }

  async getRandomWords(numWords) {
    // this.randomWords = ["misanthropes","antinodes","submit","repertoire","excreter","shorthand","beknot","hyperinflation","feastful","asparagus","gleeked","apostrophise","classons","keglings","schmeared","victorias","illuminates","untrussing","confirmable","questionnaire"];
    try {
      const response = await fetch(`https://random-word-api.herokuapp.com/word?lang=en&number=${numWords}`);
      const data = await response.json();
      this.randomWord = data; // Affecte le tableau de mots retourné à la variable globale
    } catch (error) {
      console.log(error);
    }
  }

  getCorrectLetterCount() {
    let count = 0;
    for (let i = 0; i < this.slicedWord.length; i++) {
      if (this.slicedWord[i] == this.motEnCours[i]) {
        count++;
      }      
    }
    return count;
  }

  main() {
    document.addEventListener("keyup", e => {
      let index = this.actualiseReponse(e.key);
      console.log(e.key);
      this.afficheMot(this.motEnCours.join(''));
      this.score++;
      
      let letterCount = this.getCorrectLetterCount();
      if (letterCount == this.slicedWord.length) {
        this.perf.innerHTML = `Vous avez gagné en ${this.score} coups <br> Votre score est ${Math.round(this.slicedWord.length / this.score * 100)}`;
        console.log(`gagné en ${this.score} coups`);
      }
    });

    this.recommencer.addEventListener("click", () => {
      this.start();
    });
  }
}