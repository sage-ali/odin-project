# Project: Todo List

## [JavaScript Course](<https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript>)

### [Introduction](#introduction)

At this point you’ve already had a fair amount of practice using the various techniques we’ve shown you. But we’ve been throwing a _lot_ of information your way, so before we move on we’re going to take a minute to slow down and work on another great project that ties these techniques together. You should have the chance to show off most (if not all) of your newfound skills!

### [The todo list](#the-todo-list)

Todo lists are a staple in beginning webdev tutorials, the implementation can be basic. There is, however, a lot of room for improvement and many features that can be added.

Before diving into the code, take a minute to think about how you are going to want to organize your project.

### [Assignment](#assignment)

1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.
2. Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a `title`, `description`, `dueDate` and `priority`. You might also want to include `notes` or even a `checklist`.
3. Your todo list should have `projects` or separate lists of `todos`. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
4. You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.
5. The look of the User Interface is up to you, but it should be able to do the following:
    1. View all projects.
    2. View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
    3. Expand a single todo to see/edit its details.
    4. Delete a todo.
6. For inspiration, check out the following great todo apps. (look at screenshots, watch their introduction videos etc.)
    1. [Todoist](https://en.todoist.com/)
    2. [Things](https://culturedcode.com/things/)
    3. [any.do](https://www.any.do/)
7. Since you are probably already using vite, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    1. [date-fns](https://github.com/date-fns/date-fns) gives you a bunch of handy functions for formatting and manipulating dates and times.
8. We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API.

    [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:

    * Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!
    * You can inspect data you saved in localStorage using DevTools! To do this, open the `Application` tab in DevTools and click on the `Local Storage` tab under `Storage`. Every time you add, update and delete data from localStorage in your app, those changes will be reflected in DevTools.
    * localStorage uses [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) to send and store data, and when you retrieve the data, it will also be in JSON format. Keep in mind you _cannot store functions in JSON_, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!

---

### [Visual Design Breakdown (Mobile-First)](#visual-design-breakdown-mobile-first)

#### **1. The Macro Layout (The Single Column)**

* **Concept:** Start with a single, full-width column optimized for thumb-reachability. Desktop layouts will be an _enhancement_ added later via media queries.
* **Mobile Base View:** A fixed top header containing a hamburger menu icon (using the `menu` **Material Icon**) on the left, the current Project Title in the center, and a quick "+ Add" icon (using the `add` **Material Icon**) on the right.
* **The Navigation:** The projects list lives inside an off-canvas drawer. Tapping the hamburger menu slides this drawer in from the left (`transform: translateX()`), covering the screen with a semi-transparent dark backdrop.

* **Desktop Enhancement (`min-width: 768px`):** The hamburger icon disappears. The off-canvas drawer becomes a permanently visible sidebar fixed to the left (approx. 250px wide) with a distinct background color (e.g., `#f9fafb`), while the main task list sits neatly to the right.

#### **2. The Task List (Main View)**

* **Header:** Subtle sub-header showing the current date (formatted nicely using `Intl.DateTimeFormat`).
* **The "Add Task" Inline Input:** A sticky input fixed to the _bottom_ of the screen on mobile (right above the keyboard when active) makes adding tasks extremely ergonomic. Type a title and hit the return key to quickly add. On desktop, this can be moved to the top or bottom of the list.
* **Task Rows (The core component):** Each todo is a horizontal flexbox container.
* **Touch Targets:** **Crucial for mobile:** Ensure the row has enough padding so that tap targets are at least 44x44px to meet WCAG standards.
* **Priority Indicator:** Use a colored left-border on the row (e.g., Red for High, Yellow for Medium).
* **Custom Checkbox:** A large, easy-to-tap circle on the left that fills with a brand color and a `check` **Material Icon** when selected.
* **Task Text & Date:** The title takes up the remaining space, with the due-date pill stacked underneath or aligned to the right if space permits.
* **Action Menu (No Hover!):** Since mobile users cannot hover, do not hide the "Edit/Delete" actions behind a hover state. Instead, use a tappable "kebab menu" (using the `more_vert` **Material Icon**) on the far right that opens a small dropdown or slide-out menu with `edit` and `delete` options.

#### **3. Task Details & Editing (The Bottom Sheet)**

Because a task can have notes, descriptions, and checklists, trying to fit all of that in the main row clutters the mobile screen.

* **Interaction:** Tapping the text of a task row opens the details.
* **UI Pattern (Mobile):** Use the `<dialog>` element styled as a "Bottom Sheet." It slides up from the bottom of the screen (`transform: translateY(0)`), filling about 80% of the viewport, keeping the "Save/Close" buttons easily within thumb reach. A `close` **Material Icon** can be placed in the top right corner.
* **UI Pattern (Desktop):** Via media queries, that same `<dialog>` can transform into a standard centered modal or a right-aligned slide-over panel.
* **Contents:** Large title input, a `textarea` for the description/notes, a native date picker (`<input type="date">`), and a select dropdown for priority.

#### **4. Animations & Micro-interactions**

* **Active States:** Instead of `hover`, rely on `:active` pseudo-classes to provide instant tactile feedback (like a subtle background darkening) the millisecond a user's finger touches a row or button.
* **The "Check-off" Animation:** 1. Fill the custom checkbox and reveal the `check` Material Icon.

1. Add a `text-decoration: line-through` to the title with a CSS transition.
2. Fade the opacity of the entire row to `0.5`.
3. Wait a brief moment (e.g., 500ms using `setTimeout`), then use the **View Transitions API** to animate it disappearing and the surrounding tasks smoothly sliding up to fill the gap.
4. Please let's include a theme switching icon too. Animated with moon and sun icon

#### **5. Accessibility (A11y)**

* **Focus States:** Even though mobile is touch-first, keyboard users and screen readers still navigate mobile webs. Ensure `:focus-visible` states have clear outlines.
* **Aria Labels for Icons:** Since you are using Material Icons for actions (like `delete` or `edit`), the buttons themselves often won't have visible text. You **must** include `aria-label="Delete Task"` on the `<button>` element wrapping the icon so screen readers know what it does.
* **Semantic HTML:** Use `<nav>` for the sidebar, `<main>` for the task area, and `<ul>` / `<li>` for the lists of projects and tasks.

#### **6. Handling LocalStorage (Behind the Scenes)**

* Loading states matter, even on mobile. While parsing `localStorage` is usually instant, consider a brief "skeleton loading" state if your logic gets heavy. Remember that retrieving data from LocalStorage strips away your class methods.

---

### [New Concepts Checklist](#new-concepts-checklist)

Since a Todo list is fundamentally a data-driven application (unlike the mostly visual Tic Tac Toe), the new concepts here lean heavily into application architecture and modern web APIs.

To achieve a professional-grade Todo application, you will need to research and apply these new concepts:

1. **System Preference Media Queries (`prefers-color-scheme`):** How to detect the user's OS-level dark or light mode setting using CSS. You will also learn how to use JavaScript's `window.matchMedia()` to listen for system theme changes in real-time and sync them with your custom CSS variables.
2. **The HTML `<template>` Element:** Building complex DOM elements (like a task row with a checkbox, title, date badge, and delete button) using `document.createElement()` can result in massive, unreadable blocks of JavaScript. Learn how to write your component markup inside a `<template>` tag in your HTML, and simply clone it with JavaScript when you need a new row.
3. **The Pub/Sub (Publish-Subscribe) Pattern:** You know you need to separate your DOM logic from your Data logic. Pub/Sub is the architectural pattern that makes this elegant. Your data module "publishes" a notification when a new task is saved, and your UI module "subscribes" to that notification to update the screen, meaning the two files never directly call each other's functions.
4. **Native Date Formatting (`Intl` API):** While the Odin curriculum suggests `date-fns`, modern browsers now have incredibly powerful built-in date handlers. Look into `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat` to display user-friendly dates like "Tomorrow" or "In 2 days" without installing a single third-party library.
5. **HTML Drag and Drop API:** To truly replicate the feel of premium apps like Todoist or Things, users should be able to reorder their tasks or drag a task from their inbox into a specific project folder. This API allows you to make elements draggable and define "drop zones" in your UI.

---
