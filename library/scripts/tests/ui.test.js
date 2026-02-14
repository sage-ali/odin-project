import { Library } from '../script.js';
// Assuming UIController is exported from its file
import { UIController } from '../ui-controller.js';
import { describe, it, expect } from './test-framework.js';

describe('Class: UIController', () => {
  // Store the original HTML
  const originalHTML = document.body.innerHTML;

  // Run this after every single test (it)
  const tearDown = () => {
    document.body.innerHTML = originalHTML; // Restore the real HTML
  };

  // 1. SETUP: Helper to create a clean environment for each test
  const setupTestEnv = () => {
    // Create a fake grid container in the DOM (in memory)
    document.body.innerHTML = '<div id="test-grid"></div>';

    // Create a fresh library and add one book
    const lib = new Library();
    const book = lib.addBook('Test Title', 'Test Author', 123, false);

    // Initialize UI
    const ui = new UIController(lib, 'test-grid');

    return { lib, ui, book };
  };

  it('should render a card for each book in the library with all details', () => {
    const { ui } = setupTestEnv();

    // Action
    ui.render();

    // Assertion: Check the DOM
    const grid = document.getElementById('test-grid');
    const cards = grid.querySelectorAll('.book-card');

    expect(cards.length).toBe(1);
    expect(cards[0].querySelector('.book-card__title').textContent).toBe('Test Title');
    expect(cards[0].querySelector('.book-card__author').textContent).toBe('by Test Author');
    expect(cards[0].querySelector('.book-card__pages').textContent).toBe('123 pages');
    expect(cards[0].querySelector('.book-card__status').textContent.trim()).toBe('Not Read');

    tearDown();
  });

  it('should update the visual status and button text when toggle button is clicked', () => {
    const { ui, lib } = setupTestEnv();
    ui.render();

    const grid = document.getElementById('test-grid');
    const toggleBtn = grid.querySelector('.btn--toggle');
    const statusText = grid.querySelector('.book-card__status');

    // Pre-check
    expect(statusText.textContent.trim()).toBe('Not Read');
    expect(toggleBtn.textContent.trim()).toBe('Mark Read');

    // Action: Simulate a Click
    toggleBtn.click();

    // Assertion:
    // 1. Check if Library logic ran
    expect(lib.getBooks()[0].read).toBe(true);

    // 2. Check if UI re-rendered correctly
    const updatedGrid = document.getElementById('test-grid');
    const newStatusText = updatedGrid.querySelector('.book-card__status');
    const newToggleBtn = updatedGrid.querySelector('.btn--toggle');

    expect(newStatusText.textContent.trim()).toBe('Read');
    expect(newStatusText.classList.contains('book-card__status--read')).toBe(true);
    expect(newToggleBtn.textContent.trim()).toBe('Mark Unread');

    tearDown();
  });

  it('should remove the book from library and DOM when remove button is clicked', () => {
    const { ui, lib } = setupTestEnv();
    ui.render();

    const grid = document.getElementById('test-grid');
    const removeBtn = grid.querySelector('.btn--danger');
    const card = grid.querySelector('.book-card');

    // Action: Simulate a Click
    removeBtn.click();

    // Assertion Part 1: Check for transition class
    expect(card.classList.contains('book-card--removing')).toBe(true);

    // Action Part 2: Manually trigger the transitionend event (simulating the browser finishing the animation)
    const transitionEvent = new Event('transitionend');
    card.dispatchEvent(transitionEvent);

    // Assertion Part 3: Verify book is gone
    expect(lib.getBooks().length).toBe(0);
    const updatedGrid = document.getElementById('test-grid');
    expect(updatedGrid.querySelectorAll('.book-card').length).toBe(0);

    tearDown();
  });

  it('should render an empty grid if the library is empty', () => {
    // Setup empty env
    document.body.innerHTML = '<div id="test-grid"></div>';
    const lib = new Library();
    const ui = new UIController(lib, 'test-grid');

    // Action
    ui.render();

    // Assertion
    const grid = document.getElementById('test-grid');
    expect(grid.innerHTML).toBe('');

    tearDown();
  });
});
