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

  addBookToUI(book) {
    const card = this.createBookCard(book);

    // Add entry class and append
    card.classList.add('book-card--adding');
    this.grid.appendChild(card);

    // Trigger entry animation by removing the class in the next frame
    // Double requestAnimationFrame ensures the browser has rendered the initial state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.remove('book-card--adding');
      });
    });
  }

  createBookCard(book) {
    const article = document.createElement('article');
    article.classList.add('book-card');
    article.dataset.id = book.id;

    // Visual Hierarchy
    article.innerHTML = `
      <div class="book-card__content">
        <h2 class="book-card__title">${book.title}</h2>
        <p class="book-card__author">by ${book.author}</p>
        <p class="book-card__pages">${book.pages} pages</p>
        <div class="book-card__status ${book.read ? 'book-card__status--read' : ''}">
          ${book.read ? 'Read' : 'Not Read'}
        </div>
      </div>
      <div class="book-card__actions">
        <button class="btn btn--toggle" aria-label="Toggle read status for ${book.title}">
          ${book.read ? 'Mark Unread' : 'Mark Read'}
        </button>
        <button class="btn btn--danger" aria-label="Remove ${book.title} from library">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    `;

    // Add event listeners to card buttons
    const toggleBtn = article.querySelector('.btn--toggle');
    const removeBtn = article.querySelector('.btn--danger');

    toggleBtn.addEventListener('click', () => {
      const updatedBook = this.library.toggleBookStatus(book.id);
      const statusTag = article.querySelector('.book-card__status');

      statusTag.classList.toggle('book-card__status--read', updatedBook.read);

      statusTag.textContent = updatedBook.read ? 'Read' : 'Not Read';
      toggleBtn.textContent = updatedBook.read ? 'Mark Unread' : 'Mark Read';
    });

    removeBtn.addEventListener('click', () => {
      if (document.startViewTransition) {
        // Assign a temporary name for the transition
        article.style.viewTransitionName = 'removing-card';

        document.startViewTransition(() => {
          this.library.removeBook(book.id);
          article.remove();
        });
      } else {
        // Fallback for browsers without View Transitions
        const cleanup = () => {
          this.library.removeBook(book.id);
          article.remove();
        };

        article.classList.add('book-card--removing');
        article.replaceChildren();

        // Use transitionend with a timeout safety to ensure cleanup runs
        let cleaned = false;
        const handleCleanup = () => {
          if (cleaned) return;
          cleaned = true;
          cleanup();
        };

        article.addEventListener('transitionend', handleCleanup, { once: true });
        // Safety timeout slightly longer than the transition (0.5s)
        setTimeout(handleCleanup, 600);
      }
    });

    return article;
  }
}
