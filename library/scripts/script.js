/**
 * Represents a Book in the library.
 */
export class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

/**
 * Manages the collection of books.
 */
export class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    return newBook;
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  getBooks() {
    return this.books;
  }

  toggleBookStatus(id) {
    const book = this.books.find((b) => b.id === id);
    if (book) {
      book.toggleReadStatus();
    }
  }
}

// Initial sample books for testing
const myLibrary = new Library();
myLibrary.addBook('The Hobbit', 'J.R.R. Tolkien', 310, true);
myLibrary.addBook('Project Hail Mary', 'Andy Weir', 476, false);
myLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

console.log(myLibrary)

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {

});
