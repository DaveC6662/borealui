import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Popover from "../components/PopOver/PopOver";
import "@testing-library/jest-dom";

describe("Popover", () => {
  const setup = (props = {}) => {
    render(
      <Popover
        trigger={<button data-testid="popover-trigger-button">Open</button>}
        content={<div data-testid="popover-content">Popover content</div>}
        data-testid="test-popover"
        {...props}
      />
    );
  };

  it("renders the trigger", () => {
    setup();
    const trigger = screen.getByTestId("test-popover-trigger");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("role", "button");
  });

  it("toggles the popover content on click", () => {
    setup();
    const trigger = screen.getByTestId("test-popover-trigger");
    fireEvent.click(trigger);
    const content = screen.getByTestId("test-popover-content");
    expect(content).toBeVisible();
  });

  it("closes popover when clicking outside", () => {
    setup();
    fireEvent.click(screen.getByTestId("test-popover-trigger"));
    expect(screen.getByTestId("test-popover-content")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId("test-popover-content")).not.toBeInTheDocument();
  });

  it("closes popover with Escape key", () => {
    setup();
    fireEvent.click(screen.getByTestId("test-popover-trigger"));
    expect(screen.getByTestId("test-popover-content")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("test-popover-content")).not.toBeInTheDocument();
  });

  it("applies correct placement class", () => {
    setup({ placement: "top" });
    fireEvent.click(screen.getByTestId("test-popover-trigger"));
    const popoverContent = screen.getByTestId("test-popover-content");
    expect(popoverContent).toHaveClass("top");
  });

  it("applies correct theme class", () => {
    setup({ theme: "success" });
    fireEvent.click(screen.getByTestId("test-popover-trigger"));
    const popoverContent = screen.getByTestId("test-popover-content");
    expect(popoverContent).toHaveClass("success");
  });

  it("can be toggled by Enter key", () => {
    setup();
    const trigger = screen.getByTestId("test-popover-trigger");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByTestId("test-popover-content")).toBeVisible();
  });
});
