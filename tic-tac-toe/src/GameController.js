import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

/**
 * GameController Module
 * Manages the game flow, turns, and win detection.
 */
const GameController = (() => {
  let players = [Player("Player X", "X"), Player("Player O", "O")];

  let activePlayer = players[0];
  let isGameOverState = false;
  let winner = null;
  const scores = { X: 0, O: 0, tie: 0 };

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
   * Switches the active player.
   */
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  /**
   * Returns the current active player.
   * @returns {Object} The active player object.
   */
  const getActivePlayer = () => activePlayer;

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
   * Plays a round at the specified index.
   * @param {number} index - The board index to place the marker.
   * @returns {boolean} True if the move was valid, false otherwise.
   */
  const playRound = (index) => {
    if (isGameOverState) return false;

    const success = Gameboard.placeMarker(index, activePlayer.getSymbol());

    if (!success) return false;

    if (checkWin()) {
      isGameOverState = true;
      winner = activePlayer;
      scores[activePlayer.getSymbol()] += 1;
      switchPlayerTurn(); // Final switch so UI knows who ended it
    } else if (Gameboard.getBoard().every((cell) => cell !== null)) {
      isGameOverState = true;
      winner = null; // Tie
      scores.tie += 1;
    } else {
      switchPlayerTurn();
    }

    return true;
  };

  /**
   * Returns whether the game is over.
   * @returns {boolean}
   */
  const isGameOver = () => isGameOverState;

  /**
   * Returns the winner of the game (null if tie or game in progress).
   * @returns {Object|null}
   */
  const getWinner = () => winner;

  /**
   * Returns the current scores.
   * @returns {Object} The scores object.
   */
  const getScores = () => ({ ...scores });

  /**
   * Resets all scores.
   */
  const resetScores = () => {
    scores.X = 0;
    scores.O = 0;
    scores.tie = 0;
  };

  /**
   * Updates the names of the players and resets scores.
   * @param {string} name1 - Name for Player X.
   * @param {string} name2 - Name for Player O.
   */
  const setPlayerNames = (name1, name2) => {
    players = [Player(name1, "X"), Player(name2, "O")];
    [activePlayer] = players;
    resetScores();
  };

  /**
   * Resets the game state (keeps scores).
   */
  const resetGame = () => {
    [activePlayer] = players;
    isGameOverState = false;
    winner = null;
    Gameboard.resetBoard();
  };

  return {
    setPlayerNames,
    playRound,
    getActivePlayer,
    checkWin,
    isGameOver,
    getWinner,
    getScores,
    resetScores,
    resetGame,
  };
})();

export default GameController;
