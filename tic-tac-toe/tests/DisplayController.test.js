import { describe, it, expect, beforeEach, vi } from "vitest";
import DisplayController from "../src/DisplayController.js";
import Gameboard from "../src/Gameboard.js";
import GameController from "../src/GameController.js";

vi.mock("../src/GameController.js", () => ({
  default: {
    playRound: vi.fn(),
    getActivePlayer: vi.fn(() => ({
      getName: () => "Alice",
      getSymbol: () => "X",
    })),
    resetGame: vi.fn(),
  },
}));

describe("DisplayController", () => {
  beforeEach(() => {
    // Setup initial DOM structure
    document.body.innerHTML = `
      <div id="board" class="board"></div>
      <p id="turn-indicator"></p>
    `;
    Gameboard.resetBoard();
  });

  it("should be defined", () => {
    expect(DisplayController).toBeDefined();
  });

  it("should render 9 cells initially", () => {
    DisplayController.render();
    const cells = document.querySelectorAll(".cell");
    expect(cells).toHaveLength(9);
  });

  it("should reflect the Gameboard state in the DOM", () => {
    Gameboard.placeMarker(0, "X");
    Gameboard.placeMarker(4, "O");

    DisplayController.render();

    const cells = document.querySelectorAll(".cell");
    expect(cells[0].textContent).toBe("X");
    expect(cells[4].textContent).toBe("O");
    expect(cells[1].textContent).toBe("");
  });

  it("should update the turn indicator text", () => {
    // Mocking a turn change (logic is in GameController, but Display handles visuals)
    const mockPlayer = { getName: () => "Alice", getSymbol: () => "X" };
    DisplayController.updateTurnInfo(mockPlayer);

    const indicator = document.getElementById("turn-indicator");
    expect(indicator.textContent).toContain("Alice");
  });

  describe("Interactions", () => {
    it("should call GameController.playRound when a cell is clicked", () => {
      DisplayController.init();
      DisplayController.render();

      const firstCell = document.querySelector(".cell");
      firstCell.click();

      expect(GameController.playRound).toHaveBeenCalledWith("0"); // dataset index is string
    });

    it("should use event delegation on the board container", () => {
      const board = document.getElementById("board");
      const addEventListenerSpy = vi.spyOn(board, "addEventListener");

      DisplayController.init();

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
      );
    });
  });
});
