import Gameboard from "./Gameboard.js";
import GameController from "./GameController.js";

/**
 * DisplayController Module
 * Handles DOM manipulation and UI updates.
 */
const DisplayController = (() => {
  /**
   * Updates the scoreboard with the current scores.
   */
  const updateScoreboard = () => {
    const scores = GameController.getScores();
    const scoreX = document.getElementById("score-x");
    const scoreO = document.getElementById("score-o");
    const scoreTie = document.getElementById("score-tie");

    if (scoreX) scoreX.textContent = scores.X;
    if (scoreO) scoreO.textContent = scores.O;
    if (scoreTie) scoreTie.textContent = scores.tie;
  };

  /**
   * Renders the current state of the gameboard to the DOM.
   * Optimizes updates by only modifying changed cells (Dirty Checking).
   */
  const render = () => {
    const boardContainer = document.getElementById("board");
    const board = Gameboard.getBoard();
    if (!boardContainer) return;

    let cells = boardContainer.querySelectorAll(".cell");

    // Initialize grid if empty (first render or reset)
    if (cells.length === 0) {
      boardContainer.innerHTML = "";
      for (let i = 0; i < 9; i += 1) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        boardContainer.appendChild(cell);
      }
      cells = boardContainer.querySelectorAll(".cell");
    }

    board.forEach((marker, index) => {
      const cell = cells[index];
      const currentMarker = cell.dataset.marker || null;

      // Only update if the marker has changed
      if (marker !== currentMarker) {
        cell.innerHTML = ""; // Clear existing content

        if (marker === "X") {
          cell.innerHTML = `
            <svg viewBox="0 0 24 24" class="mark mark-x">
              <path d="M 5,5 L 19,19" />
              <path d="M 19,5 L 5,19" />
            </svg>
          `;
        } else if (marker === "O") {
          cell.innerHTML = `
            <svg viewBox="0 0 24 24" class="mark mark-o">
              <circle cx="12" cy="12" r="8" />
            </svg>
          `;
        }
        cell.dataset.marker = marker || "";
      }
    });

    // Check for Game Over
    if (GameController.isGameOver()) {
      const gameOverDialog = document.getElementById("game-over-dialog");
      const resultText = document.getElementById("result-text");
      const winner = GameController.getWinner();

      if (resultText) {
        resultText.textContent = winner
          ? `${winner.getName()} Wins!`
          : "It's a Tie!";
      }

      if (gameOverDialog && !gameOverDialog.open) {
        gameOverDialog.showModal();
      }

      updateScoreboard();
    }
  };

  /**
   * Updates the turn indicator with the current player's information.
   * @param {Object} player - The active player object.
   */
  const updateTurnInfo = (player) => {
    const turnIndicator = document.getElementById("turn-indicator");
    if (!turnIndicator) return;
    turnIndicator.textContent = `${player.getName()}'s Turn (${player.getSymbol()})`;
  };

  /**
   * Initializes the display controller by attaching event listeners.
   */
  const init = () => {
    const boardContainer = document.getElementById("board");
    const startForm =
      document.getElementById("start-form") ||
      document.querySelector("#start-dialog form");
    const startDialog = document.getElementById("start-dialog");
    const restartBtn = document.getElementById("restart-game-btn");
    const gameOverDialog = document.getElementById("game-over-dialog");
    const themeToggle = document.getElementById("theme-toggle");

    if (boardContainer) {
      boardContainer.addEventListener("click", (e) => {
        const cell = e.target.closest(".cell");
        if (!cell) return;

        const { index } = cell.dataset;
        if (index !== undefined) {
          const success = GameController.playRound(index);
          if (success) {
            render();
            updateTurnInfo(GameController.getActivePlayer());
          }
        }
      });
    }

    if (startForm) {
      startForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const playerXName = document.getElementById("player-x-name").value;
        const playerOName = document.getElementById("player-o-name").value;

        GameController.setPlayerNames(playerXName, playerOName);

        if (startDialog) {
          startDialog.close();
        }

        render();
        updateTurnInfo(GameController.getActivePlayer());
        updateScoreboard();
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        GameController.resetGame();
        if (gameOverDialog) {
          gameOverDialog.close();
        }
        render();
        updateTurnInfo(GameController.getActivePlayer());
      });
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme");
      });
    }
  };

  return {
    init,
    render,
    updateTurnInfo,
    updateScoreboard,
  };
})();

export default DisplayController;
