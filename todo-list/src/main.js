import { pubsub } from './core/pubsub.js';
import { appState } from './data/appState.js';
import { storageManager } from './services/localStorage.js';
import { render } from './ui/render.js';
import { initEventHandlers } from './ui/eventHandlers.js';
import templates from './template.html?raw';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // 0. Inject HTML Templates
  const templateContainer = document.createElement('div');
  templateContainer.id = 'template-container';
  templateContainer.style.display = 'none';
  templateContainer.innerHTML = templates;
  document.body.appendChild(templateContainer);

  // 1. Load existing data from localStorage
  const savedData = storageManager.load();

  // 2. Initialize AppState (rehydrates from disk or creates default)
  appState.init(savedData);

  // 3. Start auto-saving on every state change
  storageManager.init();

  // 4. Wire UI to PubSub
  pubsub.on('stateUpdated', (state) => {
    render(state);
  });

  // 5. Initialize Event Handlers (Delegation & Forms)
  initEventHandlers();

  // 6. Perform initial render
  render(appState.getState());

  console.log('Todo App Initialized');
});
