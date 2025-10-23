import YatzyGame from "./yatzyGame.js";

const game = new YatzyGame(["You"]);
game.startNewGame();

const diceValues = game.rollDice();
game.recordScore("ones", diceValues);
game.endTurn();
game.endGame();
