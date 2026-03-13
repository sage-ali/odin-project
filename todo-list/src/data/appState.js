import { pubsub } from '../core/pubsub.js';
import { projectFactory } from './projectFactory.js';
import { todoFactory } from './todoFactory.js';

let state = {
  projects: [],
  activeProjectId: null,
};

/**
 * Single source of truth for the application data.
 * Manages projects and todos and broadcasts changes via PubSub.
 */
export const appState = {
  /**
   * Initializes or resets the application state.
   * Ensures at least one 'Default' project exists.
   */
  init(initialData = null) {
    if (initialData) {
      state = initialData;
    } else {
      const defaultProject = projectFactory('Default');
      state = {
        projects: [defaultProject],
        activeProjectId: defaultProject.id,
      };
    }
    this.notify();
  },

  getState() {
    return state;
  },

  getProjects() {
    return state.projects;
  },

  getActiveProject() {
    return state.projects.find((p) => p.id === state.activeProjectId);
  },

  setActiveProject(projectId) {
    state.activeProjectId = projectId;
    this.notify();
  },

  addProject(title) {
    const newProject = projectFactory(title);
    state.projects.push(newProject);
    this.notify();
  },

  deleteProject(projectId) {
    state.projects = state.projects.filter((p) => p.id !== projectId);
    // If we deleted the active project, switch to another one
    if (state.activeProjectId === projectId) {
      state.activeProjectId = state.projects[0]?.id || null;
    }
    this.notify();
  },

  addItem(itemData) {
    const activeProject = this.getActiveProject();
    if (activeProject) {
      const newItem = todoFactory(itemData);
      activeProject.todos.push(newItem);
      this.notify();
    }
  },

  deleteItem(itemId) {
    const activeProject = this.getActiveProject();
    if (activeProject) {
      activeProject.todos = activeProject.todos.filter((t) => t.id !== itemId);
      this.notify();
    }
  },

  toggleItem(itemId) {
    const item = this.findItem(itemId);
    if (item) {
      item.completed = !item.completed;
      this.notify();
    }
  },

  toggleChecklistItem(itemId, index) {
    const item = this.findItem(itemId);
    if (item && item.checklist[index]) {
      item.checklist[index].checked = !item.checklist[index].checked;

      // Business Logic: If all items are checked, mark parent as completed
      const allChecked = item.checklist.every((i) => i.checked);
      item.completed = allChecked;

      this.notify();
    }
  },

  /**
   * Internal helper to find a task item across all projects or active project.
   * For now, searching active project is sufficient for current UI requirements.
   */
  findItem(itemId) {
    const activeProject = this.getActiveProject();
    return activeProject?.todos.find((t) => t.id === itemId);
  },

  /**
   * Broadcasts the current state to all subscribers.
   */
  notify() {
    pubsub.emit('stateUpdated', state);
  },
};
