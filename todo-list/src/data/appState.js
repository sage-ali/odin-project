import { pubsub } from '../core/pubsub.js';
import { projectFactory } from './projectFactory.js';
import { todoFactory } from './todoFactory.js';

let state = {
  projects: [],
  activeProjectId: null,
  sortCriteria: 'default',
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
      state = {
        ...state,
        ...initialData,
      };
    } else {
      const defaultProject = projectFactory('Default');
      state = {
        projects: [defaultProject],
        activeProjectId: defaultProject.id,
        sortCriteria: 'default',
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

  setSortCriteria(criteria) {
    state.sortCriteria = criteria;
    this.notify();
  },

  addProject(title) {
    const newProject = projectFactory(title);
    state.projects.push(newProject);
    this.notify();
  },

  deleteProject(projectId) {
    state.projects = state.projects.filter((p) => p.id !== projectId);
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
      return newItem.id;
    }
    return null;
  },

  deleteItem(itemId) {
    state.projects = state.projects.map((project) => ({
      ...project,
      todos: project.todos.filter((t) => t.id !== itemId),
    }));
    this.notify();
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
      const allChecked = item.checklist.every((i) => i.checked);
      item.completed = allChecked;
      this.notify();
    }
  },

  /**
   * Returns a filtered and sorted list of tasks based on the current view.
   */
  getFilteredTasks(stateParam = state) {
    let tasks = [];
    const activeProject = stateParam.projects.find((p) => p.id === stateParam.activeProjectId);
    tasks = [...(activeProject?.todos || [])];

    return this.applySorting(tasks, stateParam);
  },

  applySorting(tasks, stateParam = state) {
    const sorted = [...tasks];
    if (stateParam.sortCriteria === 'date') {
      sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    } else if (stateParam.sortCriteria === 'priority') {
      const priorityMap = { high: 0, medium: 1, low: 2, none: 3 };
      sorted.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
    }
    return sorted;
  },

  getGroupedTasks(stateParam = state) {
    const tasks = this.getFilteredTasks(stateParam);

    if (stateParam.sortCriteria === 'status') {
      return {
        Todo: tasks.filter((t) => t.status === 'todo'),
        Doing: tasks.filter((t) => t.status === 'doing'),
        Done: tasks.filter((t) => t.status === 'done'),
      };
    }

    if (stateParam.sortCriteria === 'priority') {
      return {
        High: tasks.filter((t) => t.priority === 'high'),
        Medium: tasks.filter((t) => t.priority === 'medium'),
        Low: tasks.filter((t) => t.priority === 'low'),
        None: tasks.filter((t) => t.priority === 'none'),
      };
    }

    if (stateParam.sortCriteria === 'date') {
      const todayStr = new Date().toISOString().split('T')[0];
      const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

      return {
        Today: tasks.filter((t) => t.dueDate === todayStr),
        Tomorrow: tasks.filter((t) => t.dueDate === tomorrowStr),
        Upcoming: tasks.filter((t) => t.dueDate > tomorrowStr),
        'No Date': tasks.filter((t) => !t.dueDate),
      };
    }

    return null;
  },

  findItem(itemId) {
    return state.projects.flatMap((p) => p.todos).find((t) => t.id === itemId);
  },

  notify() {
    pubsub.emit('stateUpdated', state);
  },
};
