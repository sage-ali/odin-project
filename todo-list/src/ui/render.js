/**
 * UI Rendering module.
 * Responsible for updating the DOM based on the application state.
 */

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

    // Set data attribute for event delegation
    item.setAttribute('data-project-id', project.id);

    projectList.appendChild(clone);
  });
}

function renderTasks(state) {
  const taskList = document.getElementById('task-list');
  const activeTitle = document.getElementById('active-project-title');
  if (!taskList || !activeTitle) return;

  const activeProject = state.projects.find((p) => p.id === state.activeProjectId);
  if (!activeProject) return;

  activeTitle.textContent = activeProject.title;
  taskList.innerHTML = '';

  const template = document.getElementById('task-item-template');

  activeProject.todos.forEach((todo) => {
    const clone = template.content.cloneNode(true);
    const row = clone.querySelector('.task-row');
    const title = clone.querySelector('.task-title');

    title.textContent = todo.title;

    if (todo.completed) {
      row.classList.add('completed');
    }

    // Set data attribute for event delegation
    row.setAttribute('data-task-id', todo.id);

    taskList.appendChild(clone);
  });
}

/**
 * Main render function.
 * @param {Object} state - The current application state.
 */
export function render(state) {
  renderProjects(state.projects, state.activeProjectId);
  renderTasks(state);
}
