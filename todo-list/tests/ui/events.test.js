import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initEventHandlers } from '../../src/ui/eventHandlers.js';
import { appState } from '../../src/data/appState.js';

describe('Event Handlers (Delegation)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="project-list">
        <li class="sidebar-item" data-project-id="p1">
          <button class="project-btn">Project 1</button>
          <button class="delete-project-btn">Delete</button>
        </li>
      </ul>
      <ul id="task-list">
        <li class="task-row" data-task-id="t1">
          <button class="task-checkbox-btn">Check</button>
          <button class="delete-task-btn">Delete</button>
        </li>
      </ul>
    `;
    vi.clearAllMocks();
  });

  it('should call appState.setActiveProject when a project is clicked', () => {
    const spy = vi.spyOn(appState, 'setActiveProject');
    initEventHandlers();

    const projectBtn = document.querySelector('.project-btn');
    projectBtn.click();

    expect(spy).toHaveBeenCalledWith('p1');
  });

  it('should call appState.deleteProject when delete project is clicked', () => {
    const spy = vi.spyOn(appState, 'deleteProject');
    initEventHandlers();

    const deleteBtn = document.querySelector('.delete-project-btn');
    deleteBtn.click();

    expect(spy).toHaveBeenCalledWith('p1');
  });

  it('should call appState.toggleItem when task checkbox is clicked', () => {
    const spy = vi.spyOn(appState, 'toggleItem');
    initEventHandlers();

    const checkboxBtn = document.querySelector('.task-checkbox-btn');
    checkboxBtn.click();

    expect(spy).toHaveBeenCalledWith('t1');
  });

  it('should call appState.deleteItem when delete task is clicked', () => {
    const spy = vi.spyOn(appState, 'deleteItem');
    initEventHandlers();

    const deleteBtn = document.querySelector('.delete-task-btn');
    deleteBtn.click();

    expect(spy).toHaveBeenCalledWith('t1');
  });
});
