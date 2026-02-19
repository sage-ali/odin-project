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
    getScores: vi.fn(() => ({ X: 0, O: 0, tie: 0 })),
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
      <div class="scoreboard">
        <span id="score-x">0</span>
        <span id="score-tie">0</span>
        <span id="score-o">0</span>
      </div>
      <button id="theme-toggle"></button>
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

  it("should update the scoreboard", () => {
    GameController.getScores.mockReturnValue({ X: 2, O: 1, tie: 3 });

    DisplayController.updateScoreboard();

    expect(document.getElementById("score-x").textContent).toBe("2");
    expect(document.getElementById("score-o").textContent).toBe("1");
    expect(document.getElementById("score-tie").textContent).toBe("3");
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

    it("should toggle the theme when theme-toggle button is clicked", () => {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");

      DisplayController.init();
      const themeToggle = document.getElementById("theme-toggle");

      themeToggle.click();
      expect(document.body.classList.contains("dark-theme")).toBe(true);
      expect(document.body.classList.contains("light-theme")).toBe(false);

      themeToggle.click();
      expect(document.body.classList.contains("light-theme")).toBe(true);
      expect(document.body.classList.contains("dark-theme")).toBe(false);
    });
  });

  describe("Optimization & Performance", () => {
    it("should only update changed cells (Dirty Checking)", () => {
      DisplayController.render();
      const initialCells = Array.from(document.querySelectorAll(".cell"));

      // Place a marker
      Gameboard.placeMarker(0, "X");
      DisplayController.render();

      const newCells = Array.from(document.querySelectorAll(".cell"));

      // Verify that the DOM elements themselves are reused (object identity)
      initialCells.forEach((cell, index) => {
        expect(cell).toBe(newCells[index]);
      });

      expect(newCells[0].querySelector("svg")).toBeTruthy();
    });

    it("performance: render should be extremely fast with optimization", () => {
      DisplayController.render(); // Initial render to build the grid

      performance.mark("render-start");
      // Simulate multiple moves/renders
      for (let i = 0; i < 9; i += 1) {
        Gameboard.placeMarker(i, i % 2 === 0 ? "X" : "O");
        DisplayController.render();
      }
      performance.mark("render-end");

      const measure = performance.measure(
        "render-optimization",
        "render-start",
        "render-end",
      );

      // eslint-disable-next-line no-console
      console.log(`Render optimization duration: ${measure.duration}ms`);

      // Optimized render of a single cell change should be near instantaneous in JSDOM
      expect(measure.duration).toBeLessThan(10);
    });
  });
});
