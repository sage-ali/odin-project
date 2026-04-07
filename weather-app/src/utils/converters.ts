/**
 * Converts a temperature from one unit to another.
 * @param {Object} options - Object containing temperature and unit.
 * @param {number} options.temp - Temperature to convert.
 * @param {'C'|'F'} options.unit - Unit of temperature (Celsius or Fahrenheit).
 * @returns {Object} - Object containing converted temperature and unit.
 */
export const convertTemp = ({ temp, unit }: { temp: number; unit: 'C' | 'F' }): { temp: number; unit: 'C' | 'F' } => {
  if (unit === 'C') {
    return { temp: (temp * 9) / 5 + 32, unit: 'F' };
  }
  return { temp: ((temp - 32) * 5) / 9, unit: 'C' };
};
