import Game1 from "./games/game1.js";
import Game2 from "./games/game2.js";
import Game3 from "./games/game3.js";
import Game4 from "./games/game4.js";

const gameArea = document.querySelector("#game");
const prev = document.querySelectorAll(".navMenu")[0];
const suiv = document.querySelectorAll(".navMenu")[1];

let game1 = new Game1(gameArea);
let game2 = new Game2(gameArea);
let game3 = new Game3(gameArea);
let game4 = new Game4(gameArea);

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
  
    default:
      break;
  }
}

function clean() {
  game1.hide();
  game2.hide();
  game3.hide();
  game4.hide();
}

suiv.addEventListener("click", () => menu(++level));
prev.addEventListener("click", () => menu(--level));

menu(1);