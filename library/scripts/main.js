import { Library } from './script.js';
import { UIController } from './ui-controller.js';
import { ModalController } from './modal-controller.js';

// Initial sample books for testing
const myLibrary = new Library();
myLibrary.addBook('The Hobbit', 'J.R.R. Tolkien', 310, true);
myLibrary.addBook('Project Hail Mary', 'Andy Weir', 476, false);
myLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {

const ui = new UIController(myLibrary, 'book-grid');
const modal = new ModalController('book-dialog', 'add-book-btn', 'cancel-btn');

// Initial Render
ui.render();

// Form Submission
  const bookForm = document.getElementById('book-form');
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read') === 'on';

    modal.close();
    ui.addBookToUI(myLibrary.addBook(title, author, pages, read));
  });
});