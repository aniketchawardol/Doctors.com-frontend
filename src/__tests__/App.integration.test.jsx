import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Loginpage from "../components/loginpage";
import Signup from "../components/Signup";

// Mock the data fetching functions
vi.mock("../fetchUserData.js", () => ({
  default: vi.fn(() => Promise.resolve(null)),
}));

vi.mock("../fetchHospitalData.js", () => ({
  default: vi.fn(() => Promise.resolve(null)),
}));

// Mock PosterPage component
vi.mock("../components/PosterPage.jsx", () => ({
  default: () => <div data-testid="poster-page">Poster Page</div>,
}));

// Mock other complex components that might have dependencies
vi.mock("../components/PatientSignup", () => ({
  default: () => <div data-testid="patient-signup">Patient Signup Page</div>,
}));
vi.mock("../components/HospitalSignup", () => ({
  default: () => <div data-testid="hospital-signup">Hospital Signup Page</div>,
}));

describe("App Integration Tests", () => {
  const createTestRouter = (initialEntries = ["/"]) => {
    return createMemoryRouter(
      [
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Loginpage /> },
            { path: "signup", element: <Signup /> },
            {
              path: "*",
              element: <div data-testid="not-found">Page Not Found</div>,
            }, // Catch-all route
          ],
        },
      ],
      {
        initialEntries,
      }
    );
  };

  const renderWithRouter = (router) => {
    return {
      user: userEvent.setup(),
      ...render(
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      ),
    };
  };

  it("renders home page by default", async () => {
    const router = createTestRouter();
    renderWithRouter(router);

    await waitFor(() => {
      expect(screen.getByText(/Doctors\.com/)).toBeInTheDocument();
    });
  });

  it("navigates to login page when login link is clicked", async () => {
    const router = createTestRouter();
    const { user } = renderWithRouter(router);

    await waitFor(() => {
      const loginLinks = screen.getAllByRole("link", { name: /login/i });
      expect(loginLinks.length).toBeGreaterThan(0);
    });

    // Get the first login link (desktop version - visible by default)
    const loginLinks = screen.getAllByRole("link", { name: /login/i });
    const loginLink = loginLinks.find(
      (link) => !link.classList.contains("block")
    );

    await user.click(loginLink);

    // After navigation, we should see login page content
    // Since we're mocking Loginpage, we'll check for router state instead
    expect(router.state.location.pathname).toBe("/login");
  });

  it("navigates to signup page when signup link is clicked", async () => {
    const router = createTestRouter();
    const { user } = renderWithRouter(router);

    await waitFor(() => {
      const signupLinks = screen.getAllByRole("link", { name: /signup/i });
      expect(signupLinks.length).toBeGreaterThan(0);
    });

    // Get the first signup link (desktop version - visible by default)
    const signupLinks = screen.getAllByRole("link", { name: /signup/i });
    const signupLink = signupLinks.find(
      (link) => !link.classList.contains("block")
    );

    await user.click(signupLink);

    expect(router.state.location.pathname).toBe("/signup");
  });

  it("maintains layout across all pages", async () => {
    const router = createTestRouter(["/login"]);
    renderWithRouter(router);

    // Layout should always be present - check for gradient background
    const layoutContainer = document.querySelector(
      ".min-h-screen.bg-gradient-to-tr"
    );
    expect(layoutContainer).toBeInTheDocument();

    // Footer should be present
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("handles unknown routes gracefully", async () => {
    const router = createTestRouter(["/unknown-route"]);
    renderWithRouter(router);

    // Should still render the layout
    const layoutContainer = document.querySelector(
      ".min-h-screen.bg-gradient-to-tr"
    );
    expect(layoutContainer).toBeInTheDocument();
  });
});
