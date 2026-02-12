import { computePosition, flip, shift, offset, arrow } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.4/+esm';

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

/**
 * TooltipManager handles showing tooltips using Floating UI.
 * Optimized for icon-only sidebars.
 */
class TooltipManager {
  /**
   * @param {string} targetSelector - Selector for elements that should show tooltips.
   */
  constructor(targetSelector) {
    this.targets = document.querySelectorAll(targetSelector);
    this.tooltipEl = this.createTooltipElement();
    this.arrowEl = this.tooltipEl.querySelector('.tooltip__arrow');
    this.init();
  }

  createTooltipElement() {
    const el = document.createElement('div');
    el.id = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
    el.className = 'tooltip';
    el.role = 'tooltip';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<span></span><div class="tooltip__arrow"></div>';
    document.body.appendChild(el);
    return el;
  }

  init() {
    this.targets.forEach((target) => {
      target.addEventListener('mouseenter', () => this.show(target));
      target.addEventListener('focus', () => this.show(target));
      target.addEventListener('mouseleave', () => this.hide(target));
      target.addEventListener('blur', () => this.hide(target));
    });
  }

  async show(target) {
    // Check if the link text is hidden (medium screen mode)
    const textEl = target.querySelector('.sidebar__link-text');
    if (textEl && window.getComputedStyle(textEl).display !== 'none') {
      return; // Don't show tooltip if text is already visible
    }

    const content = target.getAttribute('data-tooltip');
    if (!content) return;

    this.tooltipEl.querySelector('span').textContent = content;
    target.setAttribute('aria-describedby', this.tooltipEl.id);
    this.tooltipEl.setAttribute('aria-hidden', 'false');

    // Handle tooltip positioning
    const { x, y, placement, middlewareData } = await computePosition(target, this.tooltipEl, {
      placement: 'right',
      middleware: [
        offset(15), // Gap between icon and tooltip
        flip(),
        shift({ padding: 5 }),
        arrow({ element: this.arrowEl })
      ]
    });

    Object.assign(this.tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`
    });

    // Handle arrow positioning
    const { x: arrowX, y: arrowY } = middlewareData.arrow;
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[placement.split('-')[0]];

    Object.assign(this.arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px' // Half of arrow size (8px)
    });

    this.tooltipEl.classList.add('tooltip--visible');
  }

  hide(target) {
    this.tooltipEl.classList.remove('tooltip--visible');
    this.tooltipEl.setAttribute('aria-hidden', 'true');
    if (target) {
      target.removeAttribute('aria-describedby');
    }
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SidebarManager('.sidebar', '#menu-toggle');
  new TooltipManager('.sidebar__link');
});
