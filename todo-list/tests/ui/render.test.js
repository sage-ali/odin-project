import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '../../src/ui/render.js';

describe('UI Renderer', () => {
  beforeEach(() => {
    // Set up our document body with templates and containers
    document.body.innerHTML = `
      <ul id="project-list"></ul>
      <ul id="task-list"></ul>
      <h2 id="active-project-title"></h2>

      <template id="project-item-template">
        <li class="sidebar-item">
          <button class="project-btn">
            <span class="project-title-text"></span>
          </button>
        </li>
      </template>

      <template id="task-item-template">
        <li class="task-row">
          <span class="task-title"></span>
        </li>
      </template>
    `;
  });

  it('should render the list of projects', () => {
    const state = {
      projects: [
        { id: '1', title: 'Default', todos: [] },
        { id: '2', title: 'Work', todos: [] },
      ],
      activeProjectId: '1',
    };

    render(state);

    const projectList = document.getElementById('project-list');
    expect(projectList.children.length).toBe(2);
    expect(projectList.textContent).toContain('Default');
    expect(projectList.textContent).toContain('Work');
  });

  it('should render tasks for the active project', () => {
    const state = {
      projects: [
        {
          id: '1',
          title: 'Default',
          todos: [
            { id: 't1', title: 'Task 1', completed: false },
            { id: 't2', title: 'Task 2', completed: true },
          ],
        },
      ],
      activeProjectId: '1',
    };

    render(state);

    const taskList = document.getElementById('task-list');
    const activeTitle = document.getElementById('active-project-title');

    expect(activeTitle.textContent).toBe('Default');
    expect(taskList.children.length).toBe(2);
    expect(taskList.textContent).toContain('Task 1');
    expect(taskList.textContent).toContain('Task 2');
  });

  it('should clear containers before rendering', () => {
    const state = {
      projects: [{ id: '1', title: 'New', todos: [] }],
      activeProjectId: '1',
    };

    // Pre-populate
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '<li>Old Project</li>';

    render(state);

    expect(projectList.children.length).toBe(1);
    expect(projectList.textContent).not.toContain('Old Project');
  });
});
