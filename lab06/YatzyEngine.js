
export default class YatzyEngine {
  constructor() {
    this.scoreTable = {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      sum: 0,
      bonus: 0,
      three_of_a_kind: null,
      four_of_a_kind: null,
      full_house: null,
      small_straight: null,
      large_straight: null,
      chance: null,
      yatzy: null,
      total_score: 0
    };
  }

  calculateScore(category, diceValues) {
    switch (category) {
      case "ones":
        return diceValues.filter(v => v === 1).reduce((a, b) => a + b, 0);
      case "twos":
        return diceValues.filter(v => v === 2).reduce((a, b) => a + b, 0);
      case "threes":
        return diceValues.filter(v => v === 3).reduce((a, b) => a + b, 0);
      case "fours":
        return diceValues.filter(v => v === 4).reduce((a, b) => a + b, 0);
      case "fives":
        return diceValues.filter(v => v === 5).reduce((a, b) => a + b, 0);
      case "sixes":
        return diceValues.filter(v => v === 6).reduce((a, b) => a + b, 0);
      default:
        return 0;
    }
  }

  updateScore(category, score) {
    if (this.scoreTable[category] === null) {
      this.scoreTable[category] = score;
      this.updateTotals();
    }
  }

  updateTotals() {
    const upperCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"];
    const upperSum = upperCategories.reduce((sum, cat) => sum + (this.scoreTable[cat] || 0), 0);
    this.scoreTable.sum = upperSum;
    this.scoreTable.bonus = upperSum >= 63 ? 35 : 0;

    const lowerCategories = [
      "three_of_a_kind", "four_of_a_kind", "full_house",
      "small_straight", "large_straight", "chance", "yatzy"
    ];
    const lowerSum = lowerCategories.reduce((sum, cat) => sum + (this.scoreTable[cat] || 0), 0);

    this.scoreTable.total_score = upperSum + this.scoreTable.bonus + lowerSum;
  }
}