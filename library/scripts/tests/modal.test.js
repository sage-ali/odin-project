import { ModalController } from '../modal-controller.js';
import { describe, it, expect } from './test-framework.js';

describe('Class: ModalController', () => {
  // Store the original HTML
  const originalHTML = document.body.innerHTML;

  // Run this after every single test (it)
  const tearDown = () => {
    document.body.innerHTML = originalHTML; // Restore the real HTML
  };

  // 1. SETUP: Helper to create a clean environment for each test
  const setupTestEnv = () => {
    // Create a fake grid container in the DOM (in memory)
    document.body.innerHTML = `
    <header class="header">
      <div class="header__container">
        <h1 class="header__title">MyLibrary</h1>
        <button id="add-book-btn" class="btn btn--primary" aria-label="Add new book">
          + Add Book
        </button>
      </div>
    </header>
    <dialog id="book-dialog" class="dialog">
    <form id="book-form" method="dialog" class="form">
      <h2 class="form__title">Add New Book</h2>

      <div class="form__actions">
        <button type="button" id="cancel-btn" class="btn btn--secondary">Cancel</button>
        <button type="submit" class="btn btn--primary">Add Book</button>
      </div>
    </form>
  </dialog>
  `;

    const modal = new ModalController('book-dialog', 'add-book-btn', 'cancel-btn');

    return { modal };
  };

  it('modal Class should contain the right elements', () => {
    const { modal } = setupTestEnv();

    expect(modal.dialog.id).toBe('book-dialog');
    expect(modal.openBtn.id).toBe('add-book-btn');
    expect(modal.cancelBtn.id).toBe('cancel-btn');

    tearDown();
  });

  it('should open dialog on open button click', () => {
    const { modal } = setupTestEnv();

    // Mock showModal
    let showModalCalled = false;
    modal.dialog.showModal = () => {
      showModalCalled = true;
    };

    // Action
    modal.openBtn.click();

    // Assertion
    expect(showModalCalled).toBe(true);

    tearDown();
  });

  it('should close dialog on close button click', () => {
    const { modal } = setupTestEnv();

    // Mock close
    let closeCalled = false;
    modal.dialog.close = () => {
      closeCalled = true;
    };

    // Action
    modal.cancelBtn.click();

    // Assertion
    expect(closeCalled).toBe(true);

    tearDown();
  });

  it('should close dialog on anywhere else click not inside the dialog', () => {
    const { modal } = setupTestEnv();

    // Mock close
    let closeCalled = false;
    modal.dialog.close = () => {
      closeCalled = true;
    };

    // Mock getBoundingClientRect for dialog
    modal.dialog.getBoundingClientRect = () => ({
      top: 100,
      left: 100,
      right: 300,
      bottom: 300
    });

    // Action: Click outside (0,0)
    const clickEvent = new MouseEvent('click', {
      clientX: 0,
      clientY: 0,
      bubbles: true
    });
    modal.dialog.dispatchEvent(clickEvent);

    // Assertion
    expect(closeCalled).toBe(true);

    tearDown();
  });

  it('should not close dialog on click inside the dialog', () => {
    const { modal } = setupTestEnv();

    // Mock close
    let closeCalled = false;
    modal.dialog.close = () => {
      closeCalled = true;
    };

    // Mock getBoundingClientRect for dialog
    modal.dialog.getBoundingClientRect = () => ({
      top: 100,
      left: 100,
      right: 300,
      bottom: 300
    });

    // Action: Click inside (200,200)
    const clickEvent = new MouseEvent('click', {
      clientX: 200,
      clientY: 200,
      bubbles: true
    });
    modal.dialog.dispatchEvent(clickEvent);

    // Assertion
    expect(closeCalled).toBe(false);

    tearDown();
  });
});
