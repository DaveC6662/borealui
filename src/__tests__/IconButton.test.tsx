import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "../components/Buttons/IconButton/IconButton";
import { FaCheck} from "react-icons/fa";

describe("IconButton Component", () => {
  const icon = FaCheck;

  it("renders the icon", () => {
    render(<IconButton icon={icon} title="Check" />);
    expect(screen.getByTitle("Check")).toBeInTheDocument();
  });

  it("calls onClick handler", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={icon} onClick={handleClick} title="Click Me" />);
    fireEvent.click(screen.getByTitle("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={icon} onClick={handleClick} disabled title="Disabled" />);
    fireEvent.click(screen.getByTitle("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders external link correctly", () => {
    render(
      <IconButton
        icon={FaCheck}
        href="https://example.com"
        isExternal
        title="External"
      />
    );
    const link = screen.getByRole("button", { name: "External" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies theme and size classes", () => {
    const { container } = render(<IconButton icon={icon} theme="error" size="large" title="Themed" />);
    const button = container.querySelector("button");
    expect(button?.className).toMatch(/error/);
    expect(button?.className).toMatch(/large/);
  });

  it("shows loader when loading is true", () => {
    const { container } = render(<IconButton icon={icon} loading title="Loading" />);
    const loader = container.querySelector(".loader");
    expect(loader).toBeInTheDocument();
  });

  it("sets aria-label and title for accessibility", () => {
    render(<IconButton icon={icon} ariaLabel="Labelled Icon" title="Tooltip" />);
    const btn = screen.getByLabelText("Labelled Icon");
    expect(btn).toHaveAttribute("title", "Tooltip");
  });

  it("does not trigger click when disabled", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={icon} onClick={handleClick} disabled title="Disabled Button" />);
    const button = screen.getByTitle("Disabled Button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("can be activated with keyboard (Enter)", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={icon} onClick={handleClick} title="Keyboard Click" />);
    const button = screen.getByTitle("Keyboard Click");
    button.focus();
    fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
    expect(handleClick).toHaveBeenCalled();
  });

  it("can be activated with keyboard (Space)", () => {
    const handleClick = jest.fn();
    render(<IconButton icon={icon} onClick={handleClick} title="Space Click" />);
    const button = screen.getByTitle("Space Click");
    fireEvent.keyDown(button, { key: " ", code: "Space" });
    expect(handleClick).toHaveBeenCalled();
  });
});
