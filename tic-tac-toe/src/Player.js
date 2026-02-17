/**
 * Player Factory
 * Creates a player object with a name and a marker symbol.
 * @param {string} name - The player's name.
 * @param {string} symbol - The marker (X or O).
 * @returns {Object} The player object.
 */
const Player = (name, symbol) => {
  if (!name || name.trim() === "") {
    throw new Error("Name cannot be empty");
  }

  const validSymbols = ["X", "O"];
  if (!validSymbols.includes(symbol)) {
    throw new Error("Invalid symbol");
  }

  const getName = () => name;
  const getSymbol = () => symbol;

  return {
    getName,
    getSymbol,
  };
};

export default Player;
