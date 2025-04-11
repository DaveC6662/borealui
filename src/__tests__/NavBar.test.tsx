import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar/NavBar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("NavBar", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders all navigation items", () => {
    render(<NavBar />);

    const labels = ["home", "music", "images", "code", "blog", "design"];

    labels.forEach((label) => {
      const navItem = screen.getByTestId(`nav-item-${label}`);
      expect(navItem).toBeInTheDocument();
      expect(navItem).toHaveTextContent(new RegExp(label, "i"));
    });
  });

  it("sets aria-current to page for the active link", () => {
    (usePathname as jest.Mock).mockReturnValue("/Code");

    render(<NavBar />);
    const activeLink = screen.getByTestId("nav-item-code");
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current on inactive links", () => {
    (usePathname as jest.Mock).mockReturnValue("/Music");

    render(<NavBar />);
    const inactiveLink = screen.getByTestId("nav-item-code");
    expect(inactiveLink).not.toHaveAttribute("aria-current");
  });

  it("renders nav container with correct test ID", () => {
    render(<NavBar />);
    expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
  });
});
