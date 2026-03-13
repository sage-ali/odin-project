# Todo List Application

A robust, responsive task management application built with Vanilla JavaScript, focusing on clean architecture and modern web standards. This project demonstrates the usage of design patterns to decouple application logic from the DOM and persistence layers.

## 🚀 Key Features

- **Modular Architecture:** Strictly isolated ES Modules for Data, UI, and Storage.
- **Pub/Sub Pattern:** Cross-module communication via a central event bus to maintain decoupling.
- **Facade Pattern:** Simplified interface for `localStorage` persistence.
- **Template-Based Rendering:** Efficient DOM construction using HTML `<template>` elements and native cloning.
- **Theme Syncing:** Automatic adaptation to system Light/Dark mode preferences.
- **Modern CSS Pipeline:** PostCSS integration with nesting and autoprefixing via Vite.
- **TDD Workflow:** Core logic validated with a robust Vitest suite.

## 🏗 Architecture

The application is structured as a **Modular Monolith**:

1. **Core (`pubsub.js`):** The central nervous system for event handling.
2. **Data (`TaskManager`, `appState`):** Manages projects and tasks using factory functions (POJOs) to avoid rehydration issues.
3. **UI (`UIManager`):** Handles rendering and event delegation.
4. **Storage (`StorageManager`):** Manages persistent data using the Web Storage API.

## 🎓 Lessons Learned

- **Separation of Concerns:** Deepening understanding of how to separate business logic from the UI using the Observer (Pub/Sub) pattern.
- **Native Web APIs:** Leveraging the `Intl` API for date formatting and `<template>` tags for performance.
- **POJO Factories:** Avoiding complex class methods to ensure data remains easily serializable for `localStorage`.
- **CSS Architecture:** Implementing BEM-like structures and custom properties for theme management.

## 🛠 Development & Workflow

### Prerequisites

- Node.js & pnpm

### Setup

```bash
cd todo-list
pnpm install
pnpm dev
```

### Quality Control

- **Linting:** `pnpm lint` (JS) and `pnpm lint:css` (CSS)
- **Testing:** `pnpm test`
- **Git Hooks:** Husky validates every commit message and ensures code quality before pushing.

---

Created by [sage-ali](https://github.com/sage-ali)
