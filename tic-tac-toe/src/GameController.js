import Gameboard from "./Gameboard.js";

/**
 * GameController Module
 * Manages the game flow, turns, and win detection.
 */
const GameController = (() => {
  const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  /**
   * Checks if there is a winner on the current board.
   * @returns {boolean} True if a win condition is met, false otherwise.
   */
  const checkWin = () => {
    const board = Gameboard.getBoard();

    return winConditions.some((condition) => {
      const [a, b, c] = condition;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  /**
   * Resets the game state.
   */
  const resetGame = () => {
    // Current placeholder for resetting game state
  };

  return {
    checkWin,
    resetGame,
  };
})();

export default GameController;
