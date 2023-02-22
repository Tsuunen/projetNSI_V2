import Game1 from "./games/game1.js";
import Game2 from "./games/game2.js";
import Game3 from "./games/game3.js";
import Game4 from "./games/game4.js";

const gameArea = document.querySelector("#game");

let game1 = new Game1(gameArea);
let game2 = new Game2(gameArea);
let game3 = new Game3(gameArea);
let game4 = new Game4(gameArea);

