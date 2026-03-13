import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appState } from '../../src/data/appState.js';
import { pubsub } from '../../src/core/pubsub.js';

describe('AppState Manager', () => {
  beforeEach(() => {
    // Reset state before each test
    appState.init();
    vi.clearAllMocks();
  });

  it('should initialize with a Default project', () => {
    const projects = appState.getProjects();
    expect(projects.length).toBe(1);
    expect(projects[0].title).toBe('Default');
  });

  it('should allow adding a new project', () => {
    appState.addProject('Work');
    const projects = appState.getProjects();
    expect(projects.find((p) => p.title === 'Work')).toBeDefined();
  });

  it('should allow setting the active project', () => {
    appState.addProject('Work');
    const workProject = appState.getProjects().find((p) => p.title === 'Work');
    appState.setActiveProject(workProject.id);
    expect(appState.getActiveProject().id).toBe(workProject.id);
  });

  it('should allow adding a task item to the active project', () => {
    appState.addItem({ title: 'Finish TDD' });
    const activeProject = appState.getActiveProject();
    expect(activeProject.todos.length).toBe(1);
    expect(activeProject.todos[0].title).toBe('Finish TDD');
  });

  it('should toggle task item completion status', () => {
    appState.addItem({ title: 'Task' });
    const itemId = appState.getActiveProject().todos[0].id;
    appState.toggleItem(itemId);
    expect(appState.getActiveProject().todos[0].completed).toBe(true);
    appState.toggleItem(itemId);
    expect(appState.getActiveProject().todos[0].completed).toBe(false);
  });

  it('should delete a project', () => {
    appState.addProject('To Delete');
    const projectId = appState.getProjects().find((p) => p.title === 'To Delete').id;
    appState.deleteProject(projectId);
    expect(appState.getProjects().find((p) => p.id === projectId)).toBeUndefined();
  });

  it('should delete a task item from the active project', () => {
    appState.addItem({ title: 'Delete me' });
    const itemId = appState.getActiveProject().todos[0].id;
    appState.deleteItem(itemId);
    expect(appState.getActiveProject().todos.length).toBe(0);
  });

  it('should toggle a checklist item and auto-complete task if all checked', () => {
    appState.addItem({
      title: 'Checklist Task',
      checklist: [
        { text: 'Sub 1', checked: false },
        { text: 'Sub 2', checked: false },
      ],
    });
    const itemId = appState.getActiveProject().todos[0].id;

    // Toggle first item
    appState.toggleChecklistItem(itemId, 0);
    expect(appState.getActiveProject().todos[0].checklist[0].checked).toBe(true);
    expect(appState.getActiveProject().todos[0].completed).toBe(false);

    // Toggle second item (all now checked)
    appState.toggleChecklistItem(itemId, 1);
    expect(appState.getActiveProject().todos[0].checklist[1].checked).toBe(true);
    expect(appState.getActiveProject().todos[0].completed).toBe(true);

    // Toggle an item off (should un-complete task)
    appState.toggleChecklistItem(itemId, 0);
    expect(appState.getActiveProject().todos[0].checklist[0].checked).toBe(false);
    expect(appState.getActiveProject().todos[0].completed).toBe(false);
  });

  it('should emit stateUpdated event on any change', () => {
    const spy = vi.spyOn(pubsub, 'emit');
    appState.addProject('Event Test');
    expect(spy).toHaveBeenCalledWith('stateUpdated', expect.any(Object));
  });
});
