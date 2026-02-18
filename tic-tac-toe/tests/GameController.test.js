import { describe, it, expect, beforeEach } from "vitest";
import GameController from "../src/GameController.js";
import Gameboard from "../src/Gameboard.js";

describe("GameController Win Logic", () => {
  beforeEach(() => {
    Gameboard.resetBoard();
    GameController.resetGame();
  });

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
