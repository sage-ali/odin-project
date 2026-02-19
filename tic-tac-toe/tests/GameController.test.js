import { describe, it, expect, beforeEach, afterEach } from "vitest";
import GameController from "../src/GameController.js";
import Gameboard from "../src/Gameboard.js";

const resetAll = () => {
  Gameboard.resetBoard();
  GameController.resetGame();
  GameController.resetScores();
};

describe("GameController Win Logic", () => {
  beforeEach(resetAll);
  afterEach(resetAll);

  it("should detect a horizontal win (top row)", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.placeMarker(1, "X");
    Gameboard.placeMarker(2, "X");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a horizontal win (middle row)", () => {
    Gameboard.placeMarker(3, "O");
    Gameboard.placeMarker(4, "O");
    Gameboard.placeMarker(5, "O");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a horizontal win (bottom row)", () => {
    Gameboard.placeMarker(6, "X");
    Gameboard.placeMarker(7, "X");
    Gameboard.placeMarker(8, "X");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a vertical win (left column)", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.placeMarker(3, "X");
    Gameboard.placeMarker(6, "X");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a vertical win (middle column)", () => {
    Gameboard.placeMarker(1, "O");
    Gameboard.placeMarker(4, "O");
    Gameboard.placeMarker(7, "O");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a vertical win (right column)", () => {
    Gameboard.placeMarker(2, "X");
    Gameboard.placeMarker(5, "X");
    Gameboard.placeMarker(8, "X");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a diagonal win (top-left to bottom-right)", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.placeMarker(4, "X");
    Gameboard.placeMarker(8, "X");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should detect a diagonal win (top-right to bottom-left)", () => {
    Gameboard.placeMarker(2, "O");
    Gameboard.placeMarker(4, "O");
    Gameboard.placeMarker(6, "O");

    expect(GameController.checkWin()).toBe(true);
  });

  it("should return false if there is no win", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.placeMarker(1, "O");
    Gameboard.placeMarker(2, "X");

    expect(GameController.checkWin()).toBe(false);
  });

  it("performance: win check should be extremely fast", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.placeMarker(1, "X");
    Gameboard.placeMarker(2, "X");

    performance.mark("winCheck-start");
    GameController.checkWin();
    performance.mark("winCheck-end");
    const measure = performance.measure(
      "winCheck",
      "winCheck-start",
      "winCheck-end",
    );
    expect(measure.duration).toBeLessThan(0.5); // Win check should be sub-millisecond
  });
});

describe("GameController Flow", () => {
  beforeEach(resetAll);
  afterEach(resetAll);

  it("should start with Player X as the active player", () => {
    expect(GameController.getActivePlayer().getSymbol()).toBe("X");
  });

  it("should switch turns after a valid move", () => {
    GameController.playRound(0); // Player X move
    expect(GameController.getActivePlayer().getSymbol()).toBe("O");
    GameController.playRound(1); // Player O move
    expect(GameController.getActivePlayer().getSymbol()).toBe("X");
  });

  it("should not switch turns if the move is invalid", () => {
    GameController.playRound(0); // X moves to 0
    expect(GameController.getActivePlayer().getSymbol()).toBe("O");
    GameController.playRound(0); // O tries to move to 0 (invalid)
    expect(GameController.getActivePlayer().getSymbol()).toBe("O");
  });

  it("should detect a tie when the board is full", () => {
    const moves = [0, 1, 2, 5, 3, 6, 4, 8, 7];
    moves.forEach((move) => GameController.playRound(move));

    expect(GameController.checkWin()).toBe(false);
    expect(GameController.isGameOver()).toBe(true);
    expect(GameController.getWinner()).toBe(null); // It's a tie
  });

  it("should identify the winner after a win", () => {
    GameController.playRound(0); // X
    GameController.playRound(3); // O
    GameController.playRound(1); // X
    GameController.playRound(4); // O
    GameController.playRound(2); // X (Wins)

    expect(GameController.isGameOver()).toBe(true);
    expect(GameController.getWinner().getSymbol()).toBe("X");
  });

  it("should prevent further moves after the game is over", () => {
    GameController.playRound(0); // X
    GameController.playRound(3); // O
    GameController.playRound(1); // X
    GameController.playRound(4); // O
    GameController.playRound(2); // X (Wins)

    expect(GameController.getActivePlayer().getSymbol()).toBe("O"); // Turn stopped swapping
    GameController.playRound(5); // Attempt O move
    expect(Gameboard.getBoard()[5]).toBe(null); // Move not registered
  });

  it("should allow setting custom player names", () => {
    GameController.setPlayerNames("Alice", "Bob");
    expect(GameController.getActivePlayer().getName()).toBe("Alice");

    // Play a round to switch to next player
    GameController.playRound(0);
    expect(GameController.getActivePlayer().getName()).toBe("Bob");
  });
});

describe("GameController Score Tracking", () => {
  beforeEach(() => {
    resetAll();
    GameController.setPlayerNames("Player X", "Player O");
  });

  it("should initialize scores to zero", () => {
    const scores = GameController.getScores();
    expect(scores.X).toBe(0);
    expect(scores.O).toBe(0);
    expect(scores.tie).toBe(0);
  });

  it("should increment Player X score on win", () => {
    // X wins
    GameController.playRound(0); // X
    GameController.playRound(3); // O
    GameController.playRound(1); // X
    GameController.playRound(4); // O
    GameController.playRound(2); // X wins

    const scores = GameController.getScores();
    expect(scores.X).toBe(1);
    expect(scores.O).toBe(0);
    expect(scores.tie).toBe(0);
  });

  it("should increment Player O score on win", () => {
    GameController.playRound(0); // X
    GameController.playRound(3); // O
    GameController.playRound(1); // X
    GameController.playRound(4); // O
    GameController.playRound(6); // X
    GameController.playRound(5); // O wins

    const scores = GameController.getScores();
    expect(scores.X).toBe(0);
    expect(scores.O).toBe(1);
    expect(scores.tie).toBe(0);
  });

  it("should increment tie score on tie", () => {
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moves.forEach((move) => GameController.playRound(move));

    const scores = GameController.getScores();
    expect(scores.tie).toBe(1);
  });

  it("should persist scores after resetGame (Play Again)", () => {
    // Round 1: X wins
    GameController.playRound(0); // X
    GameController.playRound(3); // O
    GameController.playRound(1); // X
    GameController.playRound(4); // O
    GameController.playRound(2); // X wins

    expect(GameController.getScores().X).toBe(1);

    // Play Again
    GameController.resetGame();

    // Round 2: O wins
    GameController.playRound(0); // X
    GameController.playRound(3); // O
    GameController.playRound(1); // X
    GameController.playRound(4); // O
    GameController.playRound(6); // X
    GameController.playRound(5); // O wins

    const scores = GameController.getScores();
    expect(scores.X).toBe(1);
    expect(scores.O).toBe(1);
  });

  it("should reset scores after setPlayerNames (New Match)", () => {
    // X wins
    GameController.playRound(0);
    GameController.playRound(3);
    GameController.playRound(1);
    GameController.playRound(4);
    GameController.playRound(2);

    expect(GameController.getScores().X).toBe(1);

    GameController.setPlayerNames("Alice", "Bob");

    const scores = GameController.getScores();
    expect(scores.X).toBe(0);
  });
});
