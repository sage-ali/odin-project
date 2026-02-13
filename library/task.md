# Library Project

## [Introduction](#introduction)

Let's extend the 'Book' example from the previous lesson and turn it into a small Library app.

## [Assignment](#assignment)

1. If you haven't already, set up a Git repository for your project with skeleton HTML/CSS and JS files. From here on out, we'll assume that you have already done this.
2. All of your book objects are going to be stored in an array, so you'll need a constructor for books. Then, add a separate function to the script (not inside the constructor) that can take some arguments, create a book from those arguments, and store the new book object into an array. Also, all of your book objects should have a unique `id`, which can be generated using `crypto.randomUUID()`. This ensures each book has a unique and stable identifier, preventing issues when books are removed or rearranged. Your code should look something like this (we're showing only a basic skeleton without function parameters):

    ```javascript
    const myLibrary = [];

    function Book() {
      // the constructor...
    }

    function addBookToLibrary() {
      // take params, create a book then store it in the array
    }
    ```

3. Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own "card". It might help for now to manually add a few books to your array so you can see the display.
    * While it might look easier to manipulate the display of the books directly rather than store their data in an array first, from here forward, you should think of these responsibilities separately. We'll delve deeper into this concept later, but when developing applications, we want the flexibility to recreate elements (like our library and its books) in various ways using the same underlying data. Therefore, consider the logic for displaying books to the user and the book structures that hold all information as distinct entities. This separation will enhance the maintainability and scalability of your code.
4. Add a "New Book" button that brings up a form allowing users to input the details for the new book and add it to the library: author, title, number of pages, whether it's been read and anything else you might want. How you decide to display this form is up to you. For example, you may wish to have a form show in a sidebar or you may wish to explore [dialogs and modals](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) using the `<dialog>` tag. However you do this, you will most likely encounter an issue where submitting your form will not do what you expect it to do. That's because the `submit` input tries to send the data to a server by default. This is where `event.preventDefault();` will come in handy. Check out the [documentation for event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) and see how you can solve this issue!
5. Add a button on each book's display to remove the book from the library.
    * You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a [data-attribute](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Solve_HTML_problems/Use_data_attributes) that corresponds to the unique `id` of the respective book object.
6. Add a button on each book's display to change its `read` status.
    * To facilitate this you will want to create `Book` prototype function that toggles a book instance's `read` status.

### [No need for persistent storage](#no-need-for-persistent-storage)

You're not required to add any type of storage to save the information between page reloads.

This "Visual Design Breakdown" is designed to guide students toward a modern, accessible, and responsive card-based interface. It incorporates the specific requirements (like the `<dialog>` element) while pushing for higher-quality UI practices like animations and accessibility.

Here is the text block you can copy and paste into your assignment:

---

### [Visual Design Breakdown](#visual-design-breakdown)

To help you move from logic to a polished user interface, here is a detailed breakdown of the visual, interactive, and accessible design goals for your Library.

#### **1. The Macro Layout**

* **The Container:** A central column layout with a max-width to keep content readable on large screens.
* **The Header:** A clean, sticky top bar containing:
* **Logo/Title:** (e.g., "MyLibrary") on the left.
* **Primary Action:** A prominent "+ Add Book" button on the right.

* **The Book Grid:** A responsive grid container (using CSS Grid `repeat(auto-fill, minmax(...))`) to hold the book cards. This ensures cards automatically flow to the next line based on screen width.

#### **2. The Book Card (Component)**

Each book object should be rendered as a distinct "Card" element (e.g., an `<article>` tag).

* **Visual Hierarchy:**
* **Title:** Large, bold font at the top.
* **Author:** Slightly smaller, lighter color (gray) text below the title.
* **Pages:** Small text or an icon indicating length.

* **Status Indicator:** A visual cue indicating if the book is "Read" or "Not Read." This could be a colored left-border strip (Green for read, Red/Gray for not read) or a pill-shaped badge in the corner.
* **Action Area:** A footer within the card containing:
* **Read Toggle:** A button that changes appearance based on state (e.g., "Mark as Read" vs "Read").
* **Remove:** A button (perhaps a trash icon) styled destructively (red/warning color) or subtly until hovered.

#### **3. The "New Book" Form (Modal)**

Utilize the `<dialog>` element to create a modal overlay.

* **Backdrop:** A semi-transparent dark background (`::backdrop`) to focus attention on the form.
* **Form Layout:** A clean vertical stack of labeled inputs.
* **Validation:** Visual cues (red borders) if a user tries to submit without a title or author.
* **Actions:** A "Cancel" button (secondary style) and an "Add Book" button (primary style).

#### **4. Animations & Transitions**

Add polish to your interactions to make the app feel "alive."

* **Hover Effects:** When hovering over a book card, apply a subtle `transform: translateY(-5px)` and increase the `box-shadow` to make it feel like it's lifting off the page.
* **Status Change:** When toggling the "Read" status, transition the background color of the button or badge smoothly (`transition: background-color 0.3s ease`).
* **Entry Animation:** When a new book is added, have it fade in and scale up slightly so the user notices the new item.
* **Exit Animation:** When deleting a book, transition its opacity to 0 before removing it from the DOM.

#### **5. Responsiveness**

* **Desktop:** Display 3 to 4 cards per row.
* **Tablet:** Display 2 cards per row.
* **Mobile:**
* Display 1 card per row (taking up full width).
* The "Add Book" button stays accessible, perhaps fixing itself to the bottom right of the screen as a "Floating Action Button" (FAB) if space is tight.

#### **6. Accessibility (A11y)**

* **Semantic HTML:** Use `<article>` for book cards and `<h1>`, `<h2>` for headings.
* **Contrast:** Ensure text colors (especially on buttons) meet WCAG AA contrast standards against their backgrounds.
* **Keyboard Navigation:** Ensure you can Tab to the "Add Book" button, inside the form, and to the "Delete" buttons on every card.
* **Aria Labels:** If you use icons for buttons (like a trash can for delete), you **must** include an `aria-label="Delete book"` attribute so screen readers know what the button does.
* **Reduced Motion:** Wrap your animations in a `@media (prefers-reduced-motion: reduce)` query to disable movements for users who are sensitive to motion.
