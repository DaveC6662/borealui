import { render, screen, fireEvent } from "@testing-library/react";
import { AvatarBase } from "@/components/Avatar/AvatarBase";

const classMap = {
  avatar: "avatar",
  primary: "theme-primary",
  circle: "shape-circle",
  medium: "size-medium",
  outline: "outline",
  image: "image",
  initials: "initials",
  status: "status",
  "status-online": "status-online",
  bottomRight: "bottomRight",
  dot: "dot",
};

describe("AvatarBase (Jest)", () => {
  it("renders initials fallback when image fails", () => {
    render(<AvatarBase name="John Doe" classMap={classMap} />);
    expect(screen.getByRole("img")).toHaveTextContent("JD");
  });

  it("renders avatar with image if src is valid", () => {
    render(
      <AvatarBase src="/avatar.jpg" alt="User avatar" classMap={classMap} />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/avatar.jpg");
  });

  it("renders with status indicator", () => {
    render(<AvatarBase name="Jane" status="online" classMap={classMap} />);
    const status = screen.getByTestId("avatar-status");

    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-hidden", "true");
    expect(status.className).toContain("status-online"); // Optional check for class
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <AvatarBase name="Test" onClick={handleClick} classMap={classMap} />
    );
    fireEvent.click(screen.getByTestId("avatar"));
    expect(handleClick).toHaveBeenCalled();
  });
});
