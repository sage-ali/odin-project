# Weather Application

## 🚀 Key Features

- **

## 🏗 Architecture

## 🎓 Lessons Learned

## 🛠 Development & Workflow

### Prerequisites

- Node.js (v18+)
- pnpm

### Setup

1. Clone the repository.
2. Navigate to the `` directory.
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
