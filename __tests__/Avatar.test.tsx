import { render, screen, fireEvent } from "@testing-library/react";
import { AvatarBase } from "@/components/Avatar/AvatarBase";

const classMap = {
  avatar: "avatar",
  "avatar--primary": "avatar--primary",
  "avatar--secondary": "avatar--secondary",
  "avatar--success": "avatar--success",
  "avatar--warning": "avatar--warning",
  "avatar--error": "avatar--error",
  "avatar--clear": "avatar--clear",

  "avatar--circle": "avatar--circle",
  "avatar--square": "avatar--square",
  "avatar--rounded": "avatar--rounded",

  "avatar--xs": "avatar--xs",
  "avatar--small": "avatar--small",
  "avatar--medium": "avatar--medium",
  "avatar--large": "avatar--large",
  "avatar--xl": "avatar--xl",

  "avatar--outline": "avatar--outline",

  avatar__image: "avatar__image",
  avatar__initials: "avatar__initials",
  avatar__status: "avatar__status",
  "avatar__status--online": "avatar__status--online",
  "avatar__status--offline": "avatar__status--offline",
  "avatar__status--away": "avatar__status--away",
  "avatar__status--busy": "avatar__status--busy",
  "avatar__status--topRight": "avatar__status--topRight",
  "avatar__status--bottomRight": "avatar__status--bottomRight",
  "avatar__status--bottomLeft": "avatar__status--bottomLeft",
  "avatar__status--topLeft": "avatar__status--topLeft",

  avatar__dot: "avatar__dot",
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
    expect(status.className).toContain("avatar_status_online");
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
