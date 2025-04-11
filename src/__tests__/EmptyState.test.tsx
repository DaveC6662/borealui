import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyState from "../components/EmptyState/EmptyState";
import { FaBoxOpen } from "react-icons/fa";

describe("EmptyState Component", () => {
  it("renders with default props", () => {
    render(<EmptyState data-testid="empty" />);
    expect(screen.getByTestId("empty")).toBeInTheDocument();
    expect(screen.getByTestId("empty-title")).toHaveTextContent("Nothing Here Yet");
    expect(screen.getByTestId("empty-message")).toHaveTextContent("There’s no content to display.");
  });

  it("renders custom title and message", () => {
    render(
      <EmptyState
        title="Custom Title"
        message="Custom message content."
        data-testid="empty"
      />
    );
    expect(screen.getByTestId("empty-title")).toHaveTextContent("Custom Title");
    expect(screen.getByTestId("empty-message")).toHaveTextContent("Custom message content.");
  });

  it("renders icon if provided", () => {
    render(
      <EmptyState
        icon={FaBoxOpen}
        data-testid="empty"
      />
    );
    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("renders action button and handles click", () => {
    const mockAction = jest.fn();
    render(
      <EmptyState
        actionLabel="Click Me"
        onActionClick={mockAction}
        data-testid="empty"
      />
    );

    const actionButton = screen.getByTestId("empty-action");
    expect(actionButton).toBeInTheDocument();
    fireEvent.click(actionButton);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it("respects theme and size classes", () => {
    const { container } = render(
      <EmptyState
        theme="error"
        size="xl"
        data-testid="empty"
      />
    );
    const wrapper = screen.getByTestId("empty");
    expect(wrapper.className).toContain("error");
    expect(wrapper.className).toContain("xl");
    expect(container).toMatchSnapshot();
  });
});
