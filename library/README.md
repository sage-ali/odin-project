# MyLibrary

A modern, responsive, and accessible personal book library application. Manage your collection with ease using an intuitive interface designed with high-quality animations and professional software engineering principles.

## 🚀 Key Features

- **Dynamic Collection Management**: Add new books via a modal form, toggle reading status, and remove entries seamlessly.
- **Object-Oriented Architecture**: Built with a clean, modular class-based structure (`Book`, `Library`, `UIController`, `ModalController`).
- **High-Performance Animations**: Powered by the **View Transitions API** for smooth layout shifts and element removals.
- **Full Accessibility (a11y)**: Semantic HTML5, correct heading hierarchy, descriptive ARIA labels, and focus management using the native `<dialog>` element.
- **Responsive Design**: A flexible CSS Grid layout that adapts perfectly from mobile devices to large desktops.
- **Optimized Performance**: Minified assets, preloaded critical styles, and `will-change` hints for 60fps animations.

## 🎓 Lessons Learned

This project served as a deep dive into modern web APIs and performance optimization techniques:

- **View Transitions API**: Mastered the use of `document.startViewTransition` to animate complex DOM changes. I learned how to use a "Single Active Name" strategy (assigning `view-transition-name` dynamically) to isolate animations to specific elements.
- **CSS Performance**: Discovered the `will-change` property, learning how to hint to the browser's rendering engine about upcoming animations to ensure smooth, stutter-free transitions.
- **Native Components**: Explored the `<dialog>` element for building modals that handle focus trapping and keyboard navigation natively, reducing the need for heavy external libraries.
- **Accessibility Hierarchy**: Reinforced the importance of sequentially-descending heading levels and context-rich ARIA labels for users of assistive technologies.
- **Lightweight Development**: Learned how to manage a modern modular ES JS environment without the overhead of a local `package.json` by utilizing global CLI tools.

## 🛠 Development & Workflow

This project follows a "No-Build-Tool" architecture, leveraging globally installed CLI utilities to maintain a lightweight project directory while still benefiting from bundling and minification.

### Prerequisites

The following tools are required for development:

- [esbuild](https://esbuild.github.io/) (Global CLI)
- [clean-css-cli](https://github.com/jakubpawlowicz/clean-css-cli) (Global CLI)

### Manual Build Commands

To bundle and minify the JavaScript:

```bash
esbuild scripts/main.js --bundle --minify --sourcemap --outfile=scripts/bundle.js --target=es2015
```

To minify the CSS:

```bash
cleancss -o ./styles/style.min.css ./styles/style.css
```

## 🏗 Development Journey

1. **Core Logic**: Established the data model using `Book` and `Library` classes.
2. **Modular UI**: Separated concerns by creating a `UIController` for DOM rendering and a `ModalController` for dialog interactions.
3. **Enhancement**: Integrated the View Transitions API to transform basic deletions into smooth, app-like experiences.
4. **Audit & Polish**: Performed detailed accessibility and performance audits to ensure the final product meets professional standards.

---
Created by [sage-ali](https://github.com/sage-ali)
