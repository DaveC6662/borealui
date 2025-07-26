import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { BadgeBase } from "@/components/Badge/BadgeBase";

expect.extend(toHaveNoViolations);

const classMap = {
  badge: "badge",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  disabled: "disabled",
  clickable: "clickable",
  badge_icon: "badge_icon",
  shadowLight: "shadowLight",
  roundSmall: "roundSmall",
};

const DummyIcon = ({ className = "", ...props }: any) => (
  <svg data-testid="badge-icon" className={className} {...props} />
);

describe("BadgeBase", () => {
  it("renders badge with text", () => {
    render(
      <BadgeBase
        text="Active"
        classMap={classMap}
        theme="primary"
        data-testid="badge"
      />
    );

    const badge = screen.getByTestId("badge-main");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Active");
    expect(badge).toHaveAttribute("aria-label", "Active");
    expect(badge).toHaveAttribute("role", "status");
    expect(badge).toHaveAttribute("title", "Active");
  });

  it("renders children over text when both are provided", () => {
    render(
      <BadgeBase text="Ignored" data-testid="badge" classMap={classMap}>
        <span data-testid="badge-child">Custom</span>
      </BadgeBase>
    );
    const badge = screen.getByTestId("badge-main");
    expect(badge).toHaveTextContent("Custom");
    expect(screen.getByTestId("badge-child")).toBeInTheDocument();
  });

  it("renders icon when passed", () => {
    render(
      <BadgeBase
        text="New"
        icon={DummyIcon}
        classMap={classMap}
        data-testid="badge"
      />
    );

    const icon = screen.getByTestId("badge-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("focusable", "false");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BadgeBase
        text="Accessible Badge"
        classMap={classMap}
        data-testid="badge"
        icon={DummyIcon}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
