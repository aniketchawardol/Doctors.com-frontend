import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fetchUserData from "../fetchUserData";

// Mock the environment variable
vi.mock("import.meta", () => ({
  env: {
    VITE_BACKEND_URL: "http://localhost:8000",
  },
}));

describe("fetchUserData", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch user data successfully on first attempt", async () => {
    const mockUserData = {
      data: {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      },
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    });

    const result = await fetchUserData();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/users/current-user",
      {
        method: "GET",
        credentials: "include",
      }
    );
    expect(result).toEqual(mockUserData.data);
  });

  it("should handle token refresh and retry on initial failure", async () => {
    const mockUserData = {
      data: {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      },
    };

    // First call fails
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
      })
      // Refresh token call succeeds
      .mockResolvedValueOnce({
        ok: true,
      })
      // Retry user data call succeeds
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      });

    const result = await fetchUserData();

    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(result).toEqual(mockUserData.data);
  });

  it("should return null when all attempts fail", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    const result = await fetchUserData();

    expect(result).toBeNull();
  });

  it("should handle network errors", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchUserData();

    expect(result).toBeNull();
  });
});
