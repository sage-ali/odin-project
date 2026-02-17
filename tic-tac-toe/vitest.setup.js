import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  document.body.innerHTML = "";
});
