import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { AvatarBase } from "@/components/Avatar/AvatarBase";

expect.extend(toHaveNoViolations);

const classMap = {
  avatar: "avatar",
  image: "avatar_img",
  initials: "avatar_initials",
  fallback_icon: "avatar_icon_fallback",
  status: "avatar_status",
  dot: "avatar_status_dot",
  online: "avatar_status_online",
  bottomRight: "avatar_status_bottomRight",
  clickable: "avatar_clickable",
  circle: "avatar_circle",
  medium: "avatar_md",
  shadowLight: "avatar_shadow_light",
  outline: "avatar_outline",
  disabled: "avatar_disabled",
  primary: "avatar_theme_primary",
};

describe("AvatarBase (Jest)", () => {
  it("renders initials fallback when image fails", () => {
    render(
      <AvatarBase name="John Doe" classMap={classMap} data-testid="avatar" />
    );
    const initials = screen.getByTestId("avatar-initials");
    expect(initials).toHaveTextContent("JD");
    expect(initials).toHaveAttribute("aria-label", "John Doe");
  });

  it("renders avatar with image if src is valid", () => {
    render(
      <AvatarBase
        src="/avatar.jpg"
        alt="User avatar"
        classMap={classMap}
        data-testid="avatar"
      />
    );
    const image = screen.getByTestId("avatar-image");
    expect(image).toHaveAttribute("src", "/avatar.jpg");
    expect(image).toHaveAttribute("alt", "User avatar");
  });

  it("renders with status indicator", () => {
    render(
      <AvatarBase
        name="Jane"
        status="online"
        classMap={classMap}
        data-testid="avatar"
      />
    );
    const status = screen.getByTestId("avatar-status");

    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-hidden", "true");
    expect(status.className).toContain("avatar_status_online");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <AvatarBase
        name="Test"
        onClick={handleClick}
        classMap={classMap}
        data-testid="avatar"
      />
    );
    fireEvent.click(screen.getByTestId("avatar-main"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AvatarBase
        name="Accessible User"
        classMap={classMap}
        data-testid="avatar"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
