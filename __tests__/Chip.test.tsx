import { render, fireEvent, screen, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Chip } from "@/index.next";
import { FaInfoCircle } from "react-icons/fa";

function setupPortal() {
  const portal = document.createElement("div");
  portal.setAttribute("id", "widget-portal");
  document.body.appendChild(portal);
}

describe("Chip Component", () => {
  const message = "Test Chip Message";

  beforeEach(() => {
    setupPortal();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
    const portal = document.getElementById("widget-portal");
    if (portal) portal.remove();
  });

  it("renders the chip when visible is true", () => {
    render(<Chip message={message} visible={true} data-testid="chip" />);
    expect(screen.getByTestId("chip")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("does not render when visible is false", () => {
    render(<Chip message={message} visible={false} data-testid="chip" />);
    expect(screen.queryByTestId("chip")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Chip message={message} visible={true} onClose={onClose} data-testid="chip" />);
    fireEvent.click(screen.getByTestId("chip-close"));
    act(() => jest.advanceTimersByTime(300));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("auto closes after duration", () => {
    const onClose = jest.fn();
    render(<Chip message={message} visible={true} onClose={onClose} duration={3000} data-testid="chip" />);
    act(() => jest.advanceTimersByTime(3300));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not auto close if autoClose is false", () => {
    const onClose = jest.fn();
    render(
      <Chip
        message={message}
        visible={true}
        onClose={onClose}
        autoClose={false}
        duration={3000}
        data-testid="chip"
      />
    );
    act(() => jest.advanceTimersByTime(4000));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies the correct theme class", () => {
    render(<Chip message={message} visible={true} theme="success" data-testid="chip" />);
    expect(screen.getByTestId("chip")).toHaveClass("success");
  });

  it("applies the correct size class", () => {
    render(<Chip message={message} visible={true} size="large" data-testid="chip" />);
    expect(screen.getByTestId("chip")).toHaveClass("large");
  });

  it("renders icon if provided", () => {
    render(<Chip message={message} visible={true} icon={FaInfoCircle} data-testid="chip" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(<Chip message={message} visible={true} className="custom-class" data-testid="chip" />);
    expect(screen.getByTestId("chip")).toHaveClass("custom-class");
  });

  it("is rendered inside the widget portal", () => {
    render(<Chip message={message} visible={true} data-testid="chip" />);
    const portal = document.getElementById("widget-portal");
    expect(portal?.querySelector('[data-testid="chip"]')).toBeInTheDocument();
  });
});
