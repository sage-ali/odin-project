// scripts/tests/test-framework.js

/**
 * Logs a group header with the given description and runs the given function.
 * The group header is logged with a blue color, bold font, and a size of 14px.
 * @param {string} desc - The description to be logged.
 * @param {function} fn - The function to be run.
 */
export const describe = (desc, fn) => {
  console.group(`%c${desc}`, 'color: #1992d4; font-weight: bold; font-size: 14px;');
  fn();
  console.groupEnd();
};

/**
 * Runs the given function and logs a success or failure message.
 * If the function runs without throwing an error, a success message is logged with a green color.
 * If the function throws an error, an error message is logged with a red color, followed by the error itself.
 * @param {string} desc - A description of the test that is being run.
 * @param {function} fn - The function to be run.
 */
export const it = (desc, fn) => {
  try {
    fn();
    console.log(`%c✅ ${desc}`, 'color: green;');
  } catch (error) {
    console.error(`%c❌ ${desc}`, 'color: red;');
    console.error(error);
  }
};

/**
 * Creates an expectation object that can be used to assert the value of the given actual value.
 * @param {*} actual - The actual value to be asserted.
 * @returns {object} An object with methods toBe, toBeInstanceOf, and toBeDefined.
 * @example
 * expect(someValue).toBe(5);
 * expect(someValue).toBeInstanceOf(Number);
 * expect(someValue).toBeDefined();
 */
export const expect = (actual) => ({
  /**
   * Asserts that the given actual value is equal to the given expected value.
   * If the values are not equal, an error is thrown.
   * @param {*} expected - The expected value.
   * @throws {Error} If the actual value does not equal the expected value.
   */
  toBe: (expected) => {
    if (actual !== expected) {
      throw new Error(`Expected ${expected} but got ${actual}`);
    }
  },
  /**
   * Asserts that the given actual value is an instance of the given class.
   * If the actual value is not an instance of the given class, an error is thrown.
   * @param {function} cls - The class to check against.
   * @throws {Error} If the actual value is not an instance of the given class.
   */
  toBeInstanceOf: (cls) => {
    if (!(actual instanceof cls)) {
      throw new Error(`Expected instance of ${cls.name}`);
    }
  },

  /**
   * Asserts that the given actual value is defined (i.e., not null or undefined).
   * If the actual value is undefined, an error is thrown.
   * @throws {Error} If the actual value is undefined.
   */
  toBeDefined: () => {
    if (typeof actual === 'undefined') {
      throw new Error('Expected value to be defined');
    }
  }
});