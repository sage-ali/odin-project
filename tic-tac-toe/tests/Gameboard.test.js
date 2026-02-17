import { describe, it, expect } from "vitest";
import Gameboard from "../src/Gameboard.js";

describe("Gameboard", () => {
  it("should be defined", () => {
    expect(Gameboard).toBeDefined();
  });

  it("should initialize with an empty board", () => {
    const board = Gameboard.getBoard();
    expect(board).toHaveLength(9);
    expect(board.every((cell) => cell === null)).toBe(true);
  });

  it("should return a copy of the board, not the reference", () => {
    const board1 = Gameboard.getBoard();
    board1[0] = "X";
    const board2 = Gameboard.getBoard();
    expect(board2[0]).toBe(null);
  });

  it("should place a marker at a valid index", () => {
    const success = Gameboard.placeMarker(0, "X");
    expect(success).toBe(true);
    expect(Gameboard.getBoard()[0]).toBe("X");
  });

  it("should not place a marker at an occupied index", () => {
    Gameboard.placeMarker(4, "X");
    const success = Gameboard.placeMarker(4, "O");
    expect(success).toBe(false);
    expect(Gameboard.getBoard()[4]).toBe("X");
  });

  it("should reset the board", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.resetBoard();
    expect(Gameboard.getBoard().every((cell) => cell === null)).toBe(true);
  });

  it("performance: placeMarker should be fast", () => {
    performance.mark("placeMarker-start");
    Gameboard.placeMarker(1, "O");
    performance.mark("placeMarker-end");
    const measure = performance.measure(
      "placeMarker",
      "placeMarker-start",
      "placeMarker-end",
    );
    expect(measure.duration).toBeLessThan(1);
  });
});
