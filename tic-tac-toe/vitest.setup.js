import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/dom";
import { afterEach } from "vitest";

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
