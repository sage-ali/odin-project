import { appState } from './data/appState.js';
import { storageManager } from './services/localStorage.js';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load existing data from localStorage
  const savedData = storageManager.load();

  // 2. Initialize AppState (rehydrates from disk or creates default)
  appState.init(savedData);

  // 3. Start auto-saving on every state change
  storageManager.init();

  console.log('Todo App Initialized');
});
