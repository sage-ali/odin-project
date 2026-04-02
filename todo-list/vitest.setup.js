import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

// Polyfill window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function localStorageMockFunction() {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    length: 0,
    key: vi.fn((i) => Object.keys(store)[i] || null),
  };
}

// Simple localStorage polyfill for tests
const localStorageMock = localStorageMockFunction();

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

afterEach(() => {
  document.body.innerHTML = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
});
