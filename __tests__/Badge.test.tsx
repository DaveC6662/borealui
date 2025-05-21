import { render, screen } from "@testing-library/react";
import { BadgeBase } from "@/components/Badge/BadgeBase";

const classMap = {
  badge: "badge",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  icon: "icon",
};

const DummyIcon = () => <svg data-testid="icon-svg" />;

describe("BadgeBase", () => {
  it("renders badge with text", () => {
    render(
      <BadgeBase
        text="Active"
        classMap={classMap}
        theme="primary"
        testId="badge"
      />
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Active");
    expect(badge).toHaveAttribute("aria-label", "Active");
    expect(badge).toHaveAttribute("role", "status");
  });

  it("renders badge with children instead of text", () => {
    render(
      <BadgeBase classMap={classMap} testId="badge" text="Custom Badge" />
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("Custom Badge");
  });

  it("renders icon when provided", () => {
    render(
      <BadgeBase
        text="New"
        icon={DummyIcon}
        classMap={classMap}
        testId="badge"
      />
    );
    expect(screen.getByTestId("icon-svg")).toBeInTheDocument();
  });

  it("does not render if no text or children", () => {
    const { container } = render(<BadgeBase classMap={classMap} text="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
