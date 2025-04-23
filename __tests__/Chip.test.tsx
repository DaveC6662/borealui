import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ChipBase from "@/components/Chip/ChipBase";

const DummyIcon = () => <svg data-testid="dummy-icon" aria-hidden="true" />;

const DummyIconButton = ({ onClick, "data-testid": testId }: any) => (
  <button
    aria-label="Close notification"
    onClick={onClick}
    data-testid={testId}
  >
    ×
  </button>
);

const classMap = {
  chip: "chip",
  primary: "primary",
  medium: "medium",
  topCenter: "topCenter",
  fadeOut: "fadeOut",
  chipIcon: "chipIcon",
  chipMessage: "chipMessage",
  chipClose: "chipClose",
  icon: "icon",
};

beforeEach(() => {
  const portal = document.createElement("div");
  portal.setAttribute("id", "widget-portal");
  document.body.appendChild(portal);
});

afterEach(() => {
  const portal = document.getElementById("widget-portal");
  if (portal) portal.remove();
  jest.useRealTimers();
});

describe("ChipBase", () => {
  it("renders with message and icon", () => {
    render(
      <ChipBase
        id="test-chip"
        message="Test message"
        visible
        icon={DummyIcon}
        IconButtonComponent={DummyIconButton}
        classMap={classMap}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Test message");
    expect(screen.getByTestId("dummy-icon")).toBeInTheDocument();
    expect(screen.getByTestId("chip-close")).toHaveAttribute(
      "aria-label",
      "Close notification"
    );
  });

  it("calls onClose when close button is clicked", () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();

    render(
      <ChipBase
        id="click-chip"
        message="Click me"
        visible
        onClose={handleClose}
        IconButtonComponent={DummyIconButton}
        classMap={classMap}
      />
    );

    fireEvent.click(screen.getByTestId("chip-close"));

    act(() => {
      jest.advanceTimersByTime(300); // Simulate fade out
    });

    expect(handleClose).toHaveBeenCalled();
  });

  it("autocloses after timeout", () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();

    render(
      <ChipBase
        id="auto"
        message="Auto"
        visible
        autoClose
        duration={1000}
        onClose={handleClose}
        IconButtonComponent={DummyIconButton}
        classMap={classMap}
      />
    );

    act(() => {
      jest.advanceTimersByTime(1000); // Trigger auto-close
      jest.advanceTimersByTime(300); // Wait for fade-out delay
    });

    expect(handleClose).toHaveBeenCalled();
  });
});
