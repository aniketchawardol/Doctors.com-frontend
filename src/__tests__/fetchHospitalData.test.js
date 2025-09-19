import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fetchHospitalData from "../fetchHospitalData";

// Mock the environment variable
vi.mock("import.meta", () => ({
  env: {
    VITE_BACKEND_URL: "http://localhost:8000",
  },
}));

describe("fetchHospitalData", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch hospital data successfully on first attempt", async () => {
    const mockHospitalData = {
      data: {
        id: 1,
        name: "Test Hospital",
        email: "hospital@example.com",
        slug: "test-hospital",
      },
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockHospitalData,
    });

    const result = await fetchHospitalData();

    expect(global.fetch).toHaveBeenCalledWith(
      " http://localhost:8000/api/v1/hospitals/current-hospital",
      {
        method: "POST",
        credentials: "include",
      }
    );
    expect(result).toEqual(mockHospitalData.data);
  });

  it("should handle token refresh and retry on initial failure", async () => {
    const mockHospitalData = {
      data: {
        id: 1,
        name: "Test Hospital",
        email: "hospital@example.com",
        slug: "test-hospital",
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
      // Retry hospital data call succeeds
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHospitalData,
      });

    const result = await fetchHospitalData();

    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(result).toEqual(mockHospitalData.data);
  });

  it("should return null when refresh token fails", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    const result = await fetchHospitalData();

    expect(result).toBeNull();
  });

  it("should handle network errors", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchHospitalData();

    expect(result).toBeNull();
  });
});
