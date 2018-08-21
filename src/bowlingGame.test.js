import BowlingGame from "./bowlingGame";

describe("BowlingGame kata", () => {
  let game;

  beforeEach(function() {
    game = BowlingGame.create();
  });

  const rollMany = (n, pins) => {
    while (n--) {
      game.roll(pins);
    }
  };

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }

  function rollStrike() {
    game.roll(10);
  }

  it("should handle a gutter game", () => {
    rollMany(20, 0);
    expect(game.score()).toMatchSnapshot();
  });

  it("should handle all ones", () => {
    rollMany(20, 1);
    expect(game.score()).toMatchSnapshot();
  });

  it("should handle one spare", () => {
    rollSpare();
    game.roll(3);
    rollMany(17, 0);
    expect(game.score()).toMatchSnapshot();
  });

  it("should handle one strike", () => {
    rollStrike();
    game.roll(3);
    game.roll(4);
    rollMany(16, 0);
    expect(game.score()).toMatchSnapshot();
  });

  it("should handle a perfect game", () => {
    rollMany(12, 10);
    expect(game.score()).toMatchSnapshot();
  });
});
