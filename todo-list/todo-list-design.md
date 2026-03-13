# Todo List Design Decisions

This document outlines the technical blueprint and architectural choices for the Todo List project.

---

## 1. High-Level Architectural Pattern

**Pattern:** Modular Monolith (Client-Side)

**Goal:** Skeletal Structure

* **Constraint Check:** Simple business domain? **YES**. Tight budget/time? **YES**. Need independent scaling? **NO**.
* **Decision:** We are using a **Modular Monolith**. Because there is no backend server and all data persists in the user's browser, a microservices architecture is irrelevant.
* **Execution:** The application will be divided into strictly isolated ES Modules (`TaskManager`, `UIManager`, `StorageManager`, `PubSub`). This ensures separation of concerns while keeping the deployment as a single, cohesive bundle via Vite.

---

## 2. Rendering & UI Pattern

**Pattern:** CSR (Client-Side Rendering)

**Goal:** UX and SEO Optimization

* **Constraint Check:** Does the page need to be indexed by Google (SEO)? **NO** (User's private data). Is the content dynamic? **YES** (Tasks are constantly added, edited, and deleted).
* **Decision:** **CSR (Client-Side Rendering)**. The app acts as a standalone utility dashboard. The browser will load a minimal HTML shell, and JavaScript will take over to render the user's specific saved projects and tasks dynamically.
* **Execution:** Initial load fetches data from `localStorage`. The DOM is then painted using cloned HTML `<template>` elements.

---

## 3. UI Architecture

**Pattern:** Event-Driven / Pub-Sub (Publish-Subscribe)

* **Decision:** We will completely decouple the **Data/Logic**, the **DOM Manipulation**, and the **Data Persistence**.
* **Components:**
* `PubSub`: The central event bus (the "radio station").
* `TaskManager`: Manages the arrays of Projects and Todos. It knows nothing about the DOM.
* `UIManager`: Listens to the `PubSub` and updates the screen.
* `StorageManager`: Listens to the `PubSub` and writes to `localStorage`.

* **Reasoning:** Unlike Tic-Tac-Toe where the controller talked directly to the display, the Todo app has multiple side-effects for every action (e.g., adding a task means updating the UI *and* saving to disk). Pub/Sub prevents tangled code by letting the UI and Storage independently react to Data changes.

---

## 4. Local Class & Object Interactions (GoF Logic)

**Goal:** Code-level problem solving.

### A. Creational Pattern

* **Factory Functions (Data-Only Objects):** We will use factories to generate Todo and Project objects, but **without methods attached to them**.
* **Reasoning:** This intentionally avoids the "Rehydration Problem." By treating Todos as plain data (POJOs), `JSON.parse()` returns immediately usable objects without the need to loop through and instantiate new classes after a page refresh.

### B. Structural Pattern

* **Facade Pattern:** Used for the `StorageManager`.
* **Reasoning:** Interacting with `localStorage` requires checking for null values, handling `JSON.stringify`, and catching parsing errors. The Facade pattern hides all this ugly logic behind two simple methods: `StorageManager.save(data)` and `StorageManager.load()`.

### C. Behavioral Pattern

* **Observer Pattern (via PubSub):** As defined in the UI architecture, modules observe state changes rather than calling each other directly.
* **State Pattern:** The application will track the "Current Active Project" state, ensuring the UI only renders tasks associated with the folder the user is currently viewing.

---

## 5. Performance & UX Patterns

**Goal:** Optimize for speed, maintainability, and user experience.

* **HTML `<template>` Cloning:** Instead of writing dozens of lines of `document.createElement()` to build a complex task row (with checkboxes, titles, dates, and delete buttons), we define the structure once in the HTML within a `<template>` tag and clone it natively. This is faster and much easier to read.
* **Event Delegation:** We will attach a single click listener to the main `<ul>` task list container rather than attaching individual listeners to every single delete button and checkbox. We will use `event.target.closest()` to figure out which task was clicked.
* **System Theme Syncing:** CSS Custom Properties (Variables) combined with `@media (prefers-color-scheme: dark)` will automatically adapt the app's color palette to the user's OS settings.

---

## 6. Summary Matrix

| Requirement | Choice |
| --- | --- |
| **Architectural Pattern** | Modular Monolith (Client-Side) |
| **Rendering Pattern** | CSR (Client-Side Rendering) |
| **Communication Strategy** | Pub/Sub (Event-Bus) |
| **Object Creation** | Factory Functions (Plain Data Objects) |
| **Storage Handling** | Facade Pattern |
| **DOM Construction** | HTML `<template>` Elements |
| **Event Handling** | Event Delegation |

---

Would you like to start by sketching out the exact folder and file structure for these ES Modules so you can set up your Webpack environment correctly?
