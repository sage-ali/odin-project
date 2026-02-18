import Gameboard from "./Gameboard.js";

/**
 * DisplayController Module
 * Handles DOM manipulation and UI updates.
 */
const DisplayController = (() => {
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
   * Updates the turn indicator with the current player's information.
   * @param {Object} player - The active player object.
   */
  const updateTurnInfo = (player) => {
    const turnIndicator = document.getElementById("turn-indicator");
    if (!turnIndicator) return;
    turnIndicator.textContent = `${player.getName()}'s Turn (${player.getSymbol()})`;
  };

  return {
    render,
    updateTurnInfo,
  };
})();

export default DisplayController;
