import { Library } from './script.js';
import { UIController } from './ui-controller.js';

// Initial sample books for testing
const myLibrary = new Library();
myLibrary.addBook('The Hobbit', 'J.R.R. Tolkien', 310, true);
myLibrary.addBook('Project Hail Mary', 'Andy Weir', 476, false);
myLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {

let diag = document.querySelector('dialog');
const ui = new UIController(myLibrary, 'book-grid');

// Initial Render
ui.render();
setTimeout(()=>{
diag.showModal()
}, 5000)
});