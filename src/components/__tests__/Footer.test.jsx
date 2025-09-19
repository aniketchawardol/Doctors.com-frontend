import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/test-utils.jsx";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("bg-gray-900", "text-gray-300");
  });

  it("displays the current year in copyright", () => {
    renderWithProviders(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`© ${currentYear} Doctors.com. All rights reserved.`)
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("displays the creator credit", () => {
    renderWithProviders(<Footer />);

    const creatorText = screen.getByText(/Made with ❤️ by Aniket/);
    expect(creatorText).toBeInTheDocument();
  });

  it("displays the warning message", () => {
    renderWithProviders(<Footer />);

    const warningText = screen.getByText(/Warning: Do not upload any reports/);
    expect(warningText).toBeInTheDocument();
    expect(warningText).toHaveClass("text-red-500");
  });

  it("renders navigation links", () => {
    renderWithProviders(<Footer />);

    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    const termsLink = screen.getByRole("link", { name: /terms of service/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });

    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy-policy");

    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms-of-service");

    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("renders GitHub link with correct attributes", () => {
    renderWithProviders(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/aniketchawardol"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has proper styling classes", () => {
    renderWithProviders(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "w-full",
      "bg-gray-900",
      "text-gray-300",
      "text-center",
      "py-6",
      "shadow-lg",
      "relative",
      "bottom-0"
    );

    // Check for container div with proper classes
    const container = footer.querySelector(".container");
    expect(container).toHaveClass("mx-auto", "px-4");
  });

  it("renders GitHub SVG icon", () => {
    renderWithProviders(<Footer />);

    const githubSvg = document.querySelector("svg");
    expect(githubSvg).toBeInTheDocument();
    expect(githubSvg).toHaveAttribute("width", "24");
    expect(githubSvg).toHaveAttribute("height", "24");
    expect(githubSvg).toHaveAttribute("viewBox", "0 0 24 24");
  });
});
