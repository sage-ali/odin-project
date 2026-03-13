import { describe, it, expect, vi, beforeEach } from 'vitest';
import { storageManager } from '../../src/services/localStorage.js';
import { pubsub } from '../../src/core/pubsub.js';

describe('Storage Manager (Facade)', () => {
  const STORAGE_KEY = 'todo_app_state';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should save data to localStorage', () => {
    const testState = { projects: [], activeProjectId: '123' };
    storageManager.save(testState);

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(saved).toEqual(testState);
  });

  it('should load data from localStorage', () => {
    const testState = { projects: ['test'], activeProjectId: '123' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testState));

    const loaded = storageManager.load();
    expect(loaded).toEqual(testState);
  });

  it('should return null and handle errors gracefully if localStorage is empty or corrupt', () => {
    expect(storageManager.load()).toBeNull();

    localStorage.setItem(STORAGE_KEY, 'invalid json');
    expect(storageManager.load()).toBeNull();
  });

  it('should auto-save when stateUpdated event is emitted', () => {
    const saveSpy = vi.spyOn(storageManager, 'save');
    storageManager.init(); // Wire up listeners

    const testState = { update: true };
    pubsub.emit('stateUpdated', testState);

    expect(saveSpy).toHaveBeenCalledWith(testState);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual(testState);
  });
});
