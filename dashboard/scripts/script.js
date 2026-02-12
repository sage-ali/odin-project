/**
 * SidebarManager handles the mobile menu toggle logic.
 * Designed to be modular and reusable.
 */
class SidebarManager {
  /**
   * @param {string} sidebarSelector - CSS selector for the sidebar element.
   * @param {string} toggleSelector - CSS selector for the toggle button.
   * @param {string} activeClass - Class to toggle on the sidebar.
   */
  constructor(sidebarSelector, toggleSelector, activeClass = 'sidebar--active') {
    this.sidebar = document.querySelector(sidebarSelector);
    this.toggleBtn = document.querySelector(toggleSelector);
    this.activeClass = activeClass;

    if (this.sidebar && this.toggleBtn) {
      this.init();
    }
  }

  init() {
    this.toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (this.sidebar.classList.contains(this.activeClass) && !this.sidebar.contains(e.target) && e.target !== this.toggleBtn) {
        this.close();
      }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  toggle() {
    this.sidebar.classList.toggle(this.activeClass);
    const isExpanded = this.sidebar.classList.contains(this.activeClass);
    this.toggleBtn.setAttribute('aria-expanded', isExpanded);
    this.toggleBtn.querySelector('.mdi-menu').classList.toggle('menu-toggle__icon--off');
    this.toggleBtn.querySelector('.mdi-close').classList.toggle('menu-toggle__icon--off');
  }

  close() {
    this.sidebar.classList.remove(this.activeClass);
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.toggleBtn.querySelector('.mdi-menu').classList.toggle('menu-toggle__icon--off');
    this.toggleBtn.querySelector('.mdi-close').classList.toggle('menu-toggle__icon--off');
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SidebarManager('.sidebar', '#menu-toggle');
});
