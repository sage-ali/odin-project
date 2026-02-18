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
    setPlayerNames: vi.fn(),
    isGameOver: vi.fn(() => false),
    getWinner: vi.fn(() => null),
  },
}));

describe("DisplayController", () => {
  beforeEach(() => {
    // Mock dialog methods since JSDOM doesn't support them
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    // Setup initial DOM structure
    document.body.innerHTML = `
      <div id="board" class="board"></div>
      <p id="turn-indicator"></p>
      <dialog id="game-over-dialog">
        <h2 id="result-text"></h2>
        <button id="restart-game-btn"></button>
      </dialog>
      <dialog id="start-dialog">
        <form id="start-form">
          <input id="player-x-name" value="Alice" />
          <input id="player-o-name" value="Bob" />
          <button type="submit" id="start-game-btn"></button>
        </form>
      </dialog>
    `;
    Gameboard.resetBoard();
    vi.clearAllMocks();
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
    expect(cells[0].querySelector("svg")).toBeTruthy();
    expect(cells[0].querySelector(".mark-x")).toBeTruthy();
    expect(cells[4].querySelector(".mark-o")).toBeTruthy();
    expect(cells[1].innerHTML).toBe("");
  });

  it("should update the turn indicator text", () => {
    const mockPlayer = { getName: () => "Alice", getSymbol: () => "X" };
    DisplayController.updateTurnInfo(mockPlayer);

    const indicator = document.getElementById("turn-indicator");
    expect(indicator.textContent).toContain("Alice");
  });

  it("should show game over dialog on win", () => {
    GameController.isGameOver.mockReturnValue(true);
    const mockWinner = { getName: () => "Alice", getSymbol: () => "X" };
    GameController.getWinner.mockReturnValue(mockWinner);

    const gameOverDialog = document.getElementById("game-over-dialog");
    const resultText = document.getElementById("result-text");

    DisplayController.render();

    expect(gameOverDialog.showModal).toHaveBeenCalled();
    expect(resultText.textContent).toContain("Alice Wins!");
  });

  it("should show game over dialog on tie", () => {
    GameController.isGameOver.mockReturnValue(true);
    GameController.getWinner.mockReturnValue(null);

    const gameOverDialog = document.getElementById("game-over-dialog");

    const resultText = document.getElementById("result-text");

    DisplayController.render();

    expect(gameOverDialog.showModal).toHaveBeenCalled();
    expect(resultText.textContent).toContain("Tie");
  });

  describe("Interactions", () => {
    it("should call GameController.playRound when a cell is clicked", () => {
      DisplayController.init();
      DisplayController.render();

      const firstCell = document.querySelector(".cell");
      firstCell.click();

      expect(GameController.playRound).toHaveBeenCalledWith("0");
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

    it("should handle start game dialog submission", () => {
      DisplayController.init();
      const form = document.getElementById("start-form");
      const startDialog = document.getElementById("start-dialog");

      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );

      expect(GameController.setPlayerNames).toHaveBeenCalledWith(
        "Alice",
        "Bob",
      );
      expect(startDialog.close).toHaveBeenCalled();
    });

    it("should handle restart game button click", () => {
      DisplayController.init();
      const restartBtn = document.getElementById("restart-game-btn");
      const gameOverDialog = document.getElementById("game-over-dialog");

      restartBtn.click();

      expect(GameController.resetGame).toHaveBeenCalled();
      expect(gameOverDialog.close).toHaveBeenCalled();
    });
  });
});
