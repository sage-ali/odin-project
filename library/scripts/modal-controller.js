/**
 * Handles modal dialog interactions.
 */
export class ModalController {
  constructor(dialogId, openBtnId, cancelBtnId) {
    this.dialog = document.getElementById(dialogId);
    this.openBtn = document.getElementById(openBtnId);
    this.cancelBtn = document.getElementById(cancelBtnId);

    this.init();
  }

  init() {
    this.openBtn.addEventListener('click', () => this.open());
    this.cancelBtn.addEventListener('click', () => this.close());

    // Close on outside click (backdrop)
    this.dialog.addEventListener('click', (e) => {
      const dialogDimensions = this.dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this.close();
      }
    });
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    const form = this.dialog.querySelector('form');
    if (form) form.reset();
    this.dialog.close();
  }
}