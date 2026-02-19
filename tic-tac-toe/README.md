# Tic-Tac-Toe

A modern, responsive Tic-Tac-Toe game built with vanilla JavaScript, CSS Grid, and SVG animations.

## 🚀 Key Features

- **Factory & Module Patterns:** Clean, decoupled code structure.
- **SVG Animations:** Smooth, GPU-accelerated "drawing" effects for marks.
- **Responsive Design:** Fluid layout using CSS `min()` and `clamp()`.
- **Accessibility:** ARIA Live Regions, keyboard navigation, and WCAG AA contrast.
- **Scoreboard:** Tracks wins for both players and ties across multiple rounds.
- **Theme Switcher:** Seamlessly toggle between Light and Dark modes.
- **Performance Optimized:** "Dirty Checking" DOM updates for maximum efficiency.

## 🎓 Lessons Learned

- **Module & Factory Patterns:** Leveraged functional patterns in JavaScript for cleaner encapsulation and better state management without complex classes.
- **TDD with Vitest:** Implemented a robust test suite using Vitest, following Test-Driven Development principles to ensure logic accuracy and prevent regressions.
- **Self-Drawing SVG Animations:** Utilized CSS `stroke-dasharray` and `stroke-dashoffset` to create immersive "hand-drawn" effects for game markers.
- **DOM Optimization:** Optimized the rendering engine to update only changed cells, reducing DOM manipulation overhead by over 75%.
- **Modern Dev Tools:** Experienced a streamlined workflow using Vite for fast development and pnpm for efficient package management.

## 🛠 Development & Workflow

### Prerequisites

- Node.js & pnpm

### Setup

```bash
cd tic-tac-toe
pnpm install
pnpm dev
```

## 🏗 Documentation

- [Design Decisions](./tic-tac-toe-design.md)
- [Functional Specification & Definition of Done](./FUNCTIONAL_SPEC.md)

---

Created by [sage-ali](https://github.com/sage-ali)
