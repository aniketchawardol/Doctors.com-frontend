import "@testing-library/jest-dom";

// Global test setup configuration
import { vi } from "vitest";

// Mock environment variables
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_BACKEND_URL: "http://localhost:8000",
  },
});

// Mock fetch globally for API calls
global.fetch = vi.fn();

// Setup for cleaning up after each test
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
