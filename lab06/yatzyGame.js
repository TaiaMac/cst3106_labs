import Dice from "./dice.js";
import YatzyEngine from "./YatzyEngine.js";

export default class YatzyGame {
  constructor(players = ["You"]) {
    this.players = players;
    this.currentPlayerIndex = 0;
    this.currentRound = 1;
    this.dice = new Dice();
    this.engine = new YatzyEngine();
    this.scores = {};
    this.players.forEach(p => this.scores[p] = structuredClone(this.engine.scoreTable));
  }

  startNewGame() {
    this.currentRound = 1;
    this.engine = new YatzyEngine();
    this.players.forEach(p => this.scores[p] = structuredClone(this.engine.scoreTable));
    console.log("🎲 New Yatzy game started!");
  }

  rollDice() {
    const values = this.dice.roll();
    console.log(`${this.getCurrentPlayer()} rolled: ${values.join(", ")}`);
    return values;
  }

  recordScore(category, diceValues) {
  const score = this.engine.calculateScore(category, diceValues);
  this.engine.updateScore(category, score);
  
  this.scores[this.getCurrentPlayer()][category] = score;

  const total = Object.values(this.scores[this.getCurrentPlayer()])
    .filter(v => typeof v === "number")
    .reduce((acc, val) => acc + val, 0);
  this.scores[this.getCurrentPlayer()].total_score = total;

  console.log(`${this.getCurrentPlayer()} scored ${score} in ${category}`);
  }

  endTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    if (this.currentPlayerIndex === 0) this.currentRound++;
    console.log(`Next up: ${this.getCurrentPlayer()} (Round ${this.currentRound})`);
  }

  endGame() {
  const totals = this.players.map(p => ({
    player: p,
    total: this.scores[p].total_score || 0
  }));
  totals.sort((a, b) => b.total - a.total);
  console.log(`🏁 Game Over! Winner: ${totals[0].player} with ${totals[0].total} points!`);
  } 

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}