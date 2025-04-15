
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from "@/index.next";
import { FaBook} from "react-icons/fa";
import { ThemeType } from "@/types/types";

describe("Card Component", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    cardIcon: FaBook,
    actionButtons: [
      {
        label: "Click Me",
        onClick: jest.fn(),
        theme: "primary" as ThemeType,
      },
    ],
  };

  it("renders with title and description", () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders the card icon if provided", () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it("calls action button onClick handler", () => {
    render(<Card {...defaultProps} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(defaultProps.actionButtons[0].onClick).toHaveBeenCalled();
  });

  it("renders children when passed", () => {
    render(
      <Card {...defaultProps}>
        <p>Child content</p>
      </Card>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders custom header, content, and footer", () => {
    render(
      <Card
        {...defaultProps}
        renderHeader={() => <div>Custom Header</div>}
        renderContent={() => <div>Custom Content</div>}
        renderFooter={() => <div>Custom Footer</div>}
      />
    );
    expect(screen.getByText("Custom Header")).toBeInTheDocument();
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
    expect(screen.getByText("Custom Footer")).toBeInTheDocument();
  });

  it("displays loading skeleton when loading=true", () => {
    render(<Card {...defaultProps} loading />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });
});
