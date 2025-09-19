import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/test-utils";
import Home from "../Home";

// Mock the data fetching functions
vi.mock("../../fetchUserData.js", () => ({
  default: vi.fn(),
}));

vi.mock("../../fetchHospitalData.js", () => ({
  default: vi.fn(),
}));

// Mock the PosterPage component
vi.mock("../PosterPage.jsx", () => ({
  default: () => <div data-testid="poster-page">Poster Page</div>,
}));

import fetchUserData from "../../fetchUserData.js";
import fetchHospitalData from "../../fetchHospitalData.js";

describe("Home Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    global.fetch = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    fetchUserData.mockResolvedValue(null);
    fetchHospitalData.mockResolvedValue(null);

    renderWithProviders(<Home />);

    // Check for loading spinner
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("renders the main navbar after loading for non-authenticated users", async () => {
    fetchUserData.mockResolvedValue(null);
    fetchHospitalData.mockResolvedValue(null);

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Doctors\.com/)).toBeInTheDocument();
    });

    // Check for login and signup buttons
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /signup/i })).toBeInTheDocument();
  });

  it("shows dashboard and logout buttons for authenticated users", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    fetchUserData.mockResolvedValue(mockUser);
    fetchHospitalData.mockResolvedValue(null);

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /dashboard/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /login/i })
    ).not.toBeInTheDocument();
  });

  it("shows hospital dashboard for authenticated hospitals", async () => {
    const mockHospital = {
      id: 1,
      name: "Test Hospital",
      email: "hospital@example.com",
    };

    fetchUserData.mockResolvedValue(null);
    fetchHospitalData.mockResolvedValue(mockHospital);

    renderWithProviders(<Home />);

    await waitFor(() => {
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      expect(dashboardLink).toBeInTheDocument();
      expect(dashboardLink.getAttribute("href")).toBe("/hospitalpage");
    });
  });

  it("handles search input correctly", async () => {
    fetchUserData.mockResolvedValue(null);
    fetchHospitalData.mockResolvedValue(null);

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Doctors\.com/)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search hospitals/i);
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, "test hospital");
    expect(searchInput.value).toBe("test hospital");
  });

  it("toggles mobile menu correctly", async () => {
    fetchUserData.mockResolvedValue(null);
    fetchHospitalData.mockResolvedValue(null);

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Doctors\.com/)).toBeInTheDocument();
    });

    // Find mobile menu button (should be hidden on desktop but present in DOM)
    const mobileMenuButton = document.querySelector(".md\\:hidden button");
    expect(mobileMenuButton).toBeInTheDocument();

    // Click to open mobile menu
    fireEvent.click(mobileMenuButton);

    // The SVG path should change when menu is open
    const closePath = document.querySelector('path[d="M6 18L18 6M6 6l12 12"]');
    expect(closePath).toBeInTheDocument();
  });

  it("handles logout functionality", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    fetchUserData.mockResolvedValue(mockUser);
    fetchHospitalData.mockResolvedValue(null);

    // Mock successful logout
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Mock window.location.reload
    const mockReload = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: mockReload },
      writable: true,
    });

    renderWithProviders(<Home />);

    await waitFor(() => {
      const logoutButton = screen.getByRole("button", { name: /logout/i });
      expect(logoutButton).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    });
  });

  it("renders correct meta tags and title", async () => {
    fetchUserData.mockResolvedValue(null);
    fetchHospitalData.mockResolvedValue(null);

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(document.title).toBe("Doctors.com");
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toContain(
      "Doctors.com simplifies patient report management"
    );
  });
});
