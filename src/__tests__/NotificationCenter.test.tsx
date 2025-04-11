import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import NotificationCenter, { Notification } from "../components/NotificationCenter/NotificationCenter";
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe("NotificationCenter", () => {
  const notifications: Notification[] = [
    {
      id: "1",
      message: "Update successful!",
      type: "success",
      timestamp: new Date("2024-01-01T10:00:00"),
    },
    {
      id: "2",
      message: "Check your connection.",
      type: "warning",
      duration: 3000,
    },
  ];

  const onRemove = jest.fn();
  const onClearAll = jest.fn();

  beforeEach(() => {
    onRemove.mockClear();
    onClearAll.mockClear();
  });

  it("renders notifications with correct content", () => {
    render(
      <NotificationCenter
        notifications={notifications}
        onRemove={onRemove}
        onClearAll={onClearAll}
        data-testid="test-center"
      />
    );

    expect(screen.getByTestId("test-center")).toBeInTheDocument();
    expect(screen.getByTestId("test-center-item-1-message")).toHaveTextContent("Update successful!");
    expect(screen.getByTestId("test-center-item-2-message")).toHaveTextContent("Check your connection.");
  });

  it("calls onClearAll when 'Clear All' button is clicked", () => {
    render(
      <NotificationCenter
        notifications={notifications}
        onRemove={onRemove}
        onClearAll={onClearAll}
        data-testid="test-center"
      />
    );

    const clearBtn = screen.getByTestId("test-center-clear-all");
    fireEvent.click(clearBtn);

    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("calls onRemove when dismiss button is clicked", () => {
    render(
      <NotificationCenter
        notifications={notifications}
        onRemove={onRemove}
        data-testid="test-center"
      />
    );

    const dismissBtn = screen.getByTestId("test-center-item-1-dismiss");
    fireEvent.click(dismissBtn);

    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("auto-dismisses notifications with duration", () => {
    render(
      <NotificationCenter
        notifications={notifications}
        onRemove={onRemove}
        data-testid="test-center"
      />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onRemove).toHaveBeenCalledWith("2");
  });

  it("renders accessibility wrapper with correct attributes", () => {
    render(
      <NotificationCenter
        notifications={notifications}
        onRemove={onRemove}
        data-testid="test-center"
      />
    );
  
    const statusWrapper = screen.getByRole("status");
    expect(statusWrapper).toBeInTheDocument();
    expect(statusWrapper).toHaveAttribute("aria-live", "polite");
  
    const list = screen.getByRole("list");
    expect(statusWrapper).toContainElement(list);
  });
  
});
