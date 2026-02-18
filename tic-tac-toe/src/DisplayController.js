import Gameboard from "./Gameboard.js";
import GameController from "./GameController.js";

/**
 * DisplayController Module
 * Handles DOM manipulation and UI updates.
 */
const DisplayController = (() => {
  /**
   * Initializes the display controller by attaching event listeners.
   */
  /**
   * Renders the current state of the gameboard to the DOM.
   */
  const render = () => {
    const boardContainer = document.getElementById("board");
    const board = Gameboard.getBoard();
    if (!boardContainer) return;

    boardContainer.innerHTML = "";

    board.forEach((marker, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.textContent = marker || "";
      boardContainer.appendChild(cell);
    });
  };

  /**
   * Initializes the display controller by attaching event listeners.
   */
  const init = () => {
    const boardContainer = document.getElementById("board");
    if (!boardContainer) return;

    boardContainer.addEventListener("click", (e) => {
      const { index } = e.target.dataset;
      if (index !== undefined) {
        GameController.playRound(index);
        render();
      }
    });
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

  return {
    init,
    render,
    updateTurnInfo,
  };
})();

export default DisplayController;
