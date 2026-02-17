/**
 * Gameboard Module
 * Encapsulates the state and logic of the tic-tac-toe board.
 */
const Gameboard = (() => {
  const board = Array(9).fill(null);

  /**
   * Returns a copy of the current board state.
   * @returns {Array} A shallow copy of the board array.
   */
  const getBoard = () => [...board];

  /**
   * Places a marker on the board if the index is valid and empty.
   * @param {number} index - The board index (0-8).
   * @param {string} marker - The player's marker (X or O).
   * @returns {boolean} True if the marker was placed, false otherwise.
   */
  const placeMarker = (index, marker) => {
    if (index < 0 || index >= board.length || board[index] !== null) {
      return false;
    }

    board[index] = marker;
    return true;
  };

  /**
   * Resets the board to an empty state.
   */
  const resetBoard = () => {
    board.fill(null);
  };

  return {
    getBoard,
    placeMarker,
    resetBoard,
  };
})();

export default Gameboard;
