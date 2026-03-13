import { pubsub } from '../core/pubsub.js';

const STORAGE_KEY = 'todo_app_state';

/**
 * Facade for localStorage interactions.
 * Provides safe methods for saving and loading the application state.
 */
export const storageManager = {
  /**
   * Initializes the storage manager by subscribing to state updates.
   */
  init() {
    pubsub.on('stateUpdated', (state) => {
      this.save(state);
    });
  },

  /**
   * Serializes and saves data to localStorage.
   * @param {Object} state - The application state to persist.
   */
  save(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  },

  /**
   * Safely loads and parses data from localStorage.
   * @returns {Object|null} The parsed state object, or null if missing/corrupt.
   */
  load() {
    try {
      const serializedState = localStorage.getItem(STORAGE_KEY);
      if (serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return null;
    }
  },
};
