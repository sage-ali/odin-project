// scripts/tests/library.test.js
import { Book, Library } from '../script.js';
import { describe, it, expect } from './test-framework.js';

console.clear();
console.log('%c🧪 Running Test Suite...', 'font-weight: bold; font-size: 16px;');

describe('Class: Book', () => {
  it('should construct a book with correct properties', () => {
    const book = new Book('1984', 'Orwell', 328, false);
    expect(book.title).toBe('1984');
    expect(book.read).toBe(false);
  });

  it('should toggle read status', () => {
    const book = new Book('Test', 'Author', 100, false);
    book.toggleReadStatus();
    expect(book.read).toBe(true);
  });
});

describe('Class: Library', () => {
  it('should add a book to the collection', () => {
    const lib = new Library();
    const newBook = lib.addBook('Dune', 'Herbert', 500, false);
    expect(lib.getBooks().length).toBe(1);
    expect(newBook).toBeInstanceOf(Book);
  });

  it('should remove a book by ID', () => {
    const lib = new Library();
    const book = lib.addBook('Test', 'Me', 100, true);
    lib.removeBook(book.id);
    expect(lib.getBooks().length).toBe(0);
  });
});