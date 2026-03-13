import { describe, it, expect } from 'vitest';
import { todoFactory } from '../../src/data/todoFactory.js';
import { projectFactory } from '../../src/data/projectFactory.js';

describe('Data Factories', () => {
  describe('todoFactory', () => {
    it('should create a todo object with required properties', () => {
      const todo = todoFactory({
        title: 'Test Todo',
        description: 'Testing description',
        dueDate: '2026-03-12',
        priority: 'high',
        notes: 'Test notes',
        checklist: [{ text: 'Step 1', checked: false }],
      });

      expect(todo).toMatchObject({
        title: 'Test Todo',
        description: 'Testing description',
        dueDate: '2026-03-12',
        priority: 'high',
        notes: 'Test notes',
        checklist: [{ text: 'Step 1', checked: false }],
        completed: false,
        status: 'todo',
      });
    });

    it('should assign a unique UUID to each todo', () => {
      const todo1 = todoFactory({ title: 'Todo 1' });
      const todo2 = todoFactory({ title: 'Todo 2' });

      expect(todo1.id).toBeDefined();
      expect(typeof todo1.id).toBe('string');
      expect(todo1.id).not.toBe(todo2.id);
    });

    it('should return a POJO with no methods', () => {
      const todo = todoFactory({ title: 'Todo' });
      const methods = Object.values(todo).filter((val) => typeof val === 'function');
      expect(methods.length).toBe(0);
    });

    it('should initialize with default values if optional fields are missing', () => {
      const todo = todoFactory({ title: 'Minimal Todo' });
      expect(todo.notes).toBe('');
      expect(todo.checklist).toEqual([]);
      expect(todo.priority).toBe('none');
    });
  });

  describe('projectFactory', () => {
    it('should create a project object with a title and empty tasks array', () => {
      const project = projectFactory('Work');
      expect(project.title).toBe('Work');
      expect(Array.isArray(project.todos)).toBe(true);
      expect(project.todos.length).toBe(0);
    });

    it('should assign a unique UUID to each project', () => {
      const project1 = projectFactory('Project 1');
      const project2 = projectFactory('Project 2');
      expect(project1.id).toBeDefined();
      expect(project1.id).not.toBe(project2.id);
    });

    it('should return a POJO with no methods', () => {
      const project = projectFactory('Project');
      const methods = Object.values(project).filter((val) => typeof val === 'function');
      expect(methods.length).toBe(0);
    });
  });
});
