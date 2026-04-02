import { appState } from '../data/appState.js';

/**
 * UI Rendering module.
 * Responsible for updating the DOM based on the application state.
 */

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

function formatDueDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(dateStr);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';

  return dateFormatter.format(targetDate);
}

function renderProjects(projects, activeProjectId) {
  const projectList = document.getElementById('project-list');
  if (!projectList) return;

  projectList.innerHTML = '';
  const template = document.getElementById('project-item-template');

  projects.forEach((project) => {
    const clone = template.content.cloneNode(true);
    const item = clone.querySelector('.sidebar-item');
    const titleText = clone.querySelector('.project-title-text');

    titleText.textContent = project.title;

    if (project.id === activeProjectId) {
      item.classList.add('active');
    }

    item.setAttribute('data-project-id', project.id);
    // Assign unique name for View Transitions
    item.style.viewTransitionName = `project-${project.id}`;
    projectList.appendChild(clone);
  });
}

function renderTaskList(tasks, container) {
  const template = document.getElementById('task-item-template');

  tasks.forEach((todo) => {
    const clone = template.content.cloneNode(true);
    const row = clone.querySelector('.task-row');
    const title = clone.querySelector('.task-title');
    const dateLabel = clone.querySelector('.task-due-date');
    const indicator = clone.querySelector('.priority-indicator');

    title.textContent = todo.title;

    // Formatting Date
    if (todo.dueDate) {
      dateLabel.textContent = formatDueDate(todo.dueDate);
    }

    // Priority Styling
    if (todo.priority !== 'none') {
      indicator.style.backgroundColor = `var(--priority-${todo.priority})`;
    }

    if (todo.completed) {
      row.classList.add('completed');
    }

    row.setAttribute('data-task-id', todo.id);
    // Assign unique name for View Transitions
    row.style.viewTransitionName = `task-${todo.id}`;
    container.appendChild(clone);
  });
}

function renderListView(tasks, state) {
  const taskList = document.getElementById('task-list');
  const activeTitle = document.getElementById('active-project-title');
  if (!taskList || !activeTitle) return;

  const activeProject = state.projects.find((p) => p.id === state.activeProjectId);
  activeTitle.textContent = activeProject ? activeProject.title : 'Inbox';
  // Animate the title too
  activeTitle.style.viewTransitionName = 'project-title';

  taskList.className = 'task-list';
  taskList.style.viewTransitionName = 'task-list';
  taskList.innerHTML = '';
  renderTaskList(tasks, taskList);
}

function renderGroupedView(groups) {
  const taskList = document.getElementById('task-list');
  if (!taskList) return;

  taskList.className = 'task-list grouped-view';
  taskList.style.viewTransitionName = 'task-list';
  taskList.innerHTML = '';

  Object.entries(groups).forEach(([groupName, tasks]) => {
    const section = document.createElement('div');
    section.className = 'task-group-section';

    const header = document.createElement('h3');
    header.className = 'group-header';
    header.textContent = groupName;
    section.appendChild(header);

    const list = document.createElement('ul');
    list.className = 'group-task-list';
    renderTaskList(tasks, list);
    section.appendChild(list);

    taskList.appendChild(section);
  });
}

/**
 * Main render function.
 * @param {Object} state - The current application state.
 */
export function render(state) {
  renderProjects(state.projects, state.activeProjectId);

  const groupedTasks = appState.getGroupedTasks(state);
  if (groupedTasks) {
    renderGroupedView(groupedTasks);
  } else {
    renderListView(appState.getFilteredTasks(state), state);
  }
}
