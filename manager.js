import Game1 from "./games/game1.js";
import Game2 from "./games/game2.js";
import Game3 from "./games/game3.js";
import Game4 from "./games/game4.js";
import Game5 from "./games/game5.js";
import Game6 from "./games/game6.js";
import Score from "./games/score.js";

const gameArea = document.querySelector("#game");
const suiv = document.querySelector(".navMenu");

let game1 = new Game1(gameArea);
let game2 = new Game2(gameArea);
let game3 = new Game3(gameArea);
let game4 = new Game4(gameArea);
let game5 = new Game5(gameArea);
let game6 = new Game6(gameArea);
let score = new Score(gameArea);

let level = 1;

function menu(level) {
  switch (level) {
    case 1:
      clean();
      game1.display();
      game1.main();
      break;
    case 2:
      clean();
      game2.display();
      game2.main();
      break;
    case 3:
      clean();
      game3.display();
      game3.main();
      break;
    case 4:
      clean();
      game4.display();
      game4.main();
      break;
    case 5:
      clean();
      game5.display();
      game5.main();
      break
    case 6:
      clean()
      game6.display();
      game6.main();
      break
      
    default:
      clean();
      score.display();
      score.main();
      break;
  }
}

function clean() {
  game1.hide();
  game2.hide();
  game3.hide();
  game4.hide();
  game5.hide();
  game6.hide();
}

suiv.addEventListener("click", () => menu(++level));

menu(level);