import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "@/index";
import { FaCrown } from "react-icons/fa";

describe("Avatar Component", () => {
  it("renders initials when no image is provided", () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="John" />);
    expect(screen.getByAltText("John")).toBeInTheDocument();
  });

  it("falls back to initials on image error", () => {
    render(<Avatar name="Error Test" src="/invalid.jpg" />);
    const image = screen.getByRole("img");
    fireEvent.error(image);
    expect(screen.getByText("ET")).toBeInTheDocument();
  });

  it("renders status dot when status is provided", () => {
    render(<Avatar name="Liam" status="online" />);
    const status = screen.getByTestId("avatar-status");
    expect(status).toHaveClass("status-online");
  });

  it("renders custom status icon", () => {
    render(<Avatar name="Admin" statusIcon={<FaCrown data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("applies status position classes", () => {
    render(<Avatar name="User" status="idle" statusPosition="topLeft" />);
    const status = screen.getByTestId("avatar-status");
    expect(status).toHaveClass("top-left");
  });

  it("renders all size variants", () => {
    const sizes = ["xs", "small", "medium", "large", "xl"];
    sizes.forEach(size => {
      const { unmount } = render(<Avatar name="Sized" size={size} />);
      expect(screen.getByTestId("avatar")).toHaveClass(size);
      unmount();
    });
  });

  it("renders all shape variants", () => {
    const shapes = ["circle", "rounded", "square"];
    shapes.forEach(shape => {
      const { unmount } = render(<Avatar name="ShapeTest" shape={shape} />);
      expect(screen.getByTestId("avatar")).toHaveClass(shape);
      unmount();
    });
  });

  it("renders all theme variants", () => {
    const themes = ["primary", "secondary", "success", "error", "warning", "clear"];
    themes.forEach(theme => {
      const { unmount } = render(<Avatar name="Theme" theme={theme} />);
      expect(screen.getByTestId("avatar")).toHaveClass(theme);
      unmount();
    });
  });

  it("applies outline class", () => {
    render(<Avatar name="Outlined" outline />);
    expect(screen.getByTestId("avatar")).toHaveClass("outline");
  });

  it("renders as anchor link when href is external", () => {
    render(<Avatar name="LinkOut" href="https://example.com" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
  });

  it("renders as internal link when href starts with '/'", () => {
    render(<Avatar name="Internal" href="/dashboard" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/dashboard");
  });

  it("renders as button and handles click", () => {
    const handleClick = jest.fn();
    render(<Avatar name="Clicker" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
