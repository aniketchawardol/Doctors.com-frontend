import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/test-utils.jsx";
import Layout from "../Layout";

describe("Layout Component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Layout />);

    // Check if the main container with the gradient background is present
    const mainContainer = document.querySelector(".min-h-screen");
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass(
      "bg-gradient-to-tr",
      "from-white",
      "from-40%",
      "via-amber-100",
      "to-teal-100"
    );
  });

  it("has the correct structure", () => {
    renderWithProviders(<Layout />);

    // Check for the main wrapper div
    const wrapper = document.querySelector(".min-h-screen.animate-appear");
    expect(wrapper).toBeInTheDocument();
  });
});
