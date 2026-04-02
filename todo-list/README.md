# Todo List Application

A robust, responsive task management application built with Vanilla JavaScript, focusing on clean architecture and modern web standards. This project demonstrates the usage of design patterns to decouple application logic from the DOM and persistence layers.

## 🚀 Key Features

- **Modular Monolith Architecture:** Strictly isolated ES Modules for Data, UI, and Storage.
- **Pub/Sub Pattern:** Cross-module communication via a central event bus to maintain decoupling.
- **Facade Pattern:** Simplified interface for `localStorage` persistence.
- **Template-Based Rendering:** Efficient DOM construction using HTML `<template>` elements and native cloning.
- **View Transitions API:** Smooth, native animations for state changes and list reordering.
- **Theme Syncing:** Automatic adaptation to system Light/Dark mode preferences using `prefers-color-scheme`.
- **Modern CSS Pipeline:** **PostCSS** integration with nesting and autoprefixing via Vite.
- **TDD Workflow:** Core logic validated with a robust Vitest suite.

## 🏗 Architecture & Separation of Concerns

The application is built with a decoupled architecture, ensuring that each module has a single responsibility and communicates through a centralized event system.

### 1. Core (Pub/Sub)
Located in `src/core/pubsub.js`. This is the application's event bus. It allows different parts of the application to communicate without having direct dependencies on each other.

### 2. Data Layer (Business Logic)
Located in `src/data/`.
- **`appState.js`**: Manages the application's state (projects, tasks, selected project). It publishes events when the state changes.
- **Factories (`todoFactory.js`, `projectFactory.js`)**: Pure functions that create task and project objects. These are kept as Plain Old JavaScript Objects (POJOs) for easy serialization.

### 3. UI Layer (DOM & Presentation)
Located in `src/ui/`.
- **`render.js`**: Handles all DOM manipulation. It subscribes to state changes and re-renders the UI using **Event Delegation** for performance.
- **`eventHandlers.js`**: Captures user interactions (clicks, form submissions) and translates them into application events via Pub/Sub.
- **`domElements.js`**: Centralizes DOM queries to keep the code clean and maintainable.

### 4. Services (Persistence)
Located in `src/services/localStorage.js`. It handles saving and loading data from the browser's `localStorage`. It is decoupled from the main logic and only interacts through the Data layer or via events.

## 🎓 Lessons Learned

- **Separation of Concerns:** Deepening understanding of how to separate business logic from the UI using the Observer (Pub/Sub) pattern.
- **PostCSS & Modern CSS:** Leveraging **PostCSS** for nesting, autoprefixing, and maintainable CSS architectures.
- **View Transitions API:** Implementing modern web animations to provide a "native app" feel.
- **Native Web APIs:** Leveraging the `Intl` API for date formatting and `<template>` tags for performance.
- **POJO Factories:** Avoiding complex class methods to ensure data remains easily serializable for `localStorage`.

## 🛠 Development & Workflow

### Prerequisites

- Node.js (v18+)
- pnpm

### Setup

1. Clone the repository.
2. Navigate to the `todo-list` directory.
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Development Server
The application uses **Vite** for an extremely fast development experience with Hot Module Replacement (HMR).
```bash
pnpm dev
```
After running this command, the application will be available at `http://localhost:5173/`.

### Quality Control

- **Linting:** `pnpm lint` (JS) and `pnpm lint:css` (CSS)
- **Formatting:** `pnpm format`
- **Testing:** `pnpm test` (Powered by Vitest)
- **Git Hooks:** Husky validates every commit message and ensures code quality before pushing.

### Building for Production
To generate a production-ready build in the `dist/` folder:
```bash
pnpm build
```

---

Created by [sage-ali](https://github.com/sage-ali)
