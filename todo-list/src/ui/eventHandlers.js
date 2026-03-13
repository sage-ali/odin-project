import { appState } from '../data/appState.js';

let activeTaskDraft = null;

/**
 * Initializes all UI event listeners.
 */
export function initEventHandlers() {
  const projectList = document.getElementById('project-list');
  const taskList = document.getElementById('task-list');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const themeToggle = document.getElementById('theme-toggle');
  const addProjectBtn = document.getElementById('add-project-btn');
  const addTaskForm = document.getElementById('add-task-form');
  const dialog = document.getElementById('details-dialog');

  // Sidebar Toggle (Mobile)
  menuToggle?.addEventListener('click', () => {
    sidebar?.classList.add('open');
    overlay?.classList.add('active');
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
  });

  // Project Management
  projectList?.addEventListener('click', (e) => {
    const item = e.target.closest('.sidebar-item');
    if (!item) return;

    const { projectId } = item.dataset;

    if (e.target.closest('.delete-project-btn')) {
      appState.deleteProject(projectId);
    } else {
      appState.setActiveProject(projectId);
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
    }
  });

  /**
   * Project Modal Logic
   */
  function openProjectModal() {
    const template = document.getElementById('project-form-template');

    dialog.innerHTML = '';
    dialog.appendChild(template.content.cloneNode(true));

    const form = dialog.querySelector('#project-modal-form');
    const cancelBtn = dialog.querySelector('.cancel-btn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = new FormData(form).get('title');
      appState.addProject(title);
      dialog.close();
    });

    cancelBtn.addEventListener('click', () => dialog.close());
    dialog.showModal();
  }

  addProjectBtn?.addEventListener('click', () => {
    openProjectModal();
  });

  // Task Management

  function renderChecklistDraft() {
    const container = document.getElementById('modal-checklist-container');
    const template = document.getElementById('checklist-item-template');
    container.innerHTML = '';

    activeTaskDraft.checklist.forEach((item) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('.subtask-text').textContent = item.text;
      clone.querySelector('.subtask-checkbox').checked = item.checked;
      container.appendChild(clone);
    });
  }

  /**
   * Task Modal Logic (Complex Form)
   */
  function openTaskModal(taskId = null) {
    const template = document.getElementById('task-form-template');

    const task = taskId ? appState.findItem(taskId) : null;
    activeTaskDraft = task
      ? JSON.parse(JSON.stringify(task))
      : {
          title: '',
          description: '',
          dueDate: '',
          priority: 'none',
          notes: '',
          checklist: [],
        };

    dialog.innerHTML = '';
    dialog.appendChild(template.content.cloneNode(true));

    const form = dialog.querySelector('#task-modal-form');

    // Populate Form
    form.title.value = activeTaskDraft.title;
    form.description.value = activeTaskDraft.description;
    form.dueDate.value = activeTaskDraft.dueDate;
    form.priority.value = activeTaskDraft.priority;
    form.notes.value = activeTaskDraft.notes;

    renderChecklistDraft();

    // Subtask logic
    const addSubtaskBtn = dialog.querySelector('#add-subtask-btn');
    const subtaskInput = dialog.querySelector('#new-checklist-item');

    const addSubtask = () => {
      const text = subtaskInput.value.trim();
      if (text) {
        activeTaskDraft.checklist.push({ text, checked: false });
        subtaskInput.value = '';
        renderChecklistDraft();
      }
    };

    addSubtaskBtn.addEventListener('click', addSubtask);
    subtaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addSubtask();
      }
    });

    // Checklist interactions (Delegation inside modal)
    const checklistContainer = dialog.querySelector('#modal-checklist-container');
    checklistContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.checklist-item');
      if (!item) return;
      const index = Array.from(checklistContainer.children).indexOf(item);

      if (e.target.classList.contains('delete-subtask-btn') || e.target.closest('.delete-subtask-btn')) {
        activeTaskDraft.checklist.splice(index, 1);
        renderChecklistDraft();
      } else if (e.target.classList.contains('subtask-checkbox')) {
        activeTaskDraft.checklist[index].checked = e.target.checked;
      }
    });

    // Save Logic
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const updatedData = {
        ...activeTaskDraft,
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        priority: formData.get('priority'),
        notes: formData.get('notes'),
      };

      if (taskId) {
        // Update existing
        Object.assign(task, updatedData);
        // Logic: Auto-complete check
        task.completed = task.checklist.length > 0 && task.checklist.every((i) => i.checked);
        appState.notify();
      } else {
        appState.addItem(updatedData);
      }
      dialog.close();
    });

    dialog.querySelector('.cancel-btn').addEventListener('click', () => dialog.close());
    dialog.showModal();
  }

  taskList?.addEventListener('click', (e) => {
    const row = e.target.closest('.task-row');
    if (!row) return;

    const { taskId } = row.dataset;

    if (e.target.closest('.delete-task-btn')) {
      appState.deleteItem(taskId);
    } else if (e.target.closest('.task-checkbox-btn')) {
      appState.toggleItem(taskId);
    } else {
      openTaskModal(taskId);
    }
  });

  // Inline Quick Add
  addTaskForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-task-title');
    const title = input.value.trim();
    if (title) {
      const newId = appState.addItem({ title });
      input.value = '';
      if (newId) openTaskModal(newId);
    }
  });

  // Theme Switching
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.querySelector('.mdi').className =
      `mdi ${newTheme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'}`;
  });

  // Global Dialog Close
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}
