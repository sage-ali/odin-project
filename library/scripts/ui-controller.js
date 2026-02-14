/**
 * Handles DOM rendering and UI updates.
 */
export class UIController {
  constructor(library, gridId) {
    this.library = library;
    this.grid = document.getElementById(gridId);
  }

  render() {
    this.grid.innerHTML = '';
    const books = this.library.getBooks();

    books.forEach((book) => {
      const card = this.createBookCard(book);
      this.grid.appendChild(card);
    });
  }

  createBookCard(book) {
    const article = document.createElement('article');
    article.classList.add('book-card');
    article.dataset.id = book.id;

    // Visual Hierarchy
    article.innerHTML = `
      <div class="book-card__content">
        <h3 class="book-card__title">${book.title}</h3>
        <p class="book-card__author">by ${book.author}</p>
        <p class="book-card__pages">${book.pages} pages</p>
        <div class="book-card__status ${book.read ? 'book-card__status--read' : ''}">
          ${book.read ? 'Read' : 'Not Read'}
        </div>
      </div>
      <div class="book-card__actions">
        <button class="btn btn--toggle" aria-label="Toggle read status">
          ${book.read ? 'Mark Unread' : 'Mark Read'}
        </button>
        <button class="btn btn--danger" aria-label="Remove book">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    `;

    // Add event listeners to card buttons
    const toggleBtn = article.querySelector('.btn--toggle');
    const removeBtn = article.querySelector('.btn--danger');

    toggleBtn.addEventListener('click', () => {
      this.library.toggleBookStatus(book.id);
      this.render();
    });

    removeBtn.addEventListener('click', () => {
      article.classList.add('book-card--removing');
      article.addEventListener('transitionend', () => {
        this.library.removeBook(book.id);
        this.render();
      }, { once: true });
    });

    return article;
  }
}