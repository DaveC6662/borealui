import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import TooltipBase from "@/components/Tooltip/TooltipBase";

expect.extend(toHaveNoViolations);

const mockStyles = {
  container: "tooltipContainer",
  triggerWrapper: "triggerWrapper",
  tooltip: "tooltip",

  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",

  primary: "primary",
  secondary: "secondary",
  success: "success",
  error: "error",
  warning: "warning",
  clear: "clear",

  visible: "visible",

  roundMedium: "roundMedium",
  shadowLight: "shadowLight",
};

describe("TooltipBase", () => {
  it("renders trigger and tooltip with correct roles", () => {
    render(
      <TooltipBase content="Tooltip content" classMap={mockStyles}>
        <button>Hover me</button>
      </TooltipBase>
    );

    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute("role", "tooltip");
  });

  it("shows and hides on hover over the trigger", () => {
    render(
      <TooltipBase content="Hover tooltip" classMap={mockStyles}>
        <button>Hover me</button>
      </TooltipBase>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    const tooltip = screen.getByTestId("tooltip");

    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");

    fireEvent.mouseEnter(trigger);
    expect(tooltip).toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");

    fireEvent.mouseLeave(trigger);
    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");
  });

  it("shows on focus and hides on blur; adds aria-describedby while visible", () => {
    render(
      <TooltipBase content="Focus tooltip" classMap={mockStyles}>
        <button>Focus me</button>
      </TooltipBase>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    const tooltip = screen.getByTestId("tooltip");

    expect(trigger).not.toHaveAttribute("aria-describedby");

    fireEvent.focus(trigger);
    expect(tooltip).toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");
    expect(trigger).toHaveAttribute(
      "aria-describedby",
      tooltip.getAttribute("id")
    );

    fireEvent.blur(trigger);
    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("hides when Escape is pressed while visible", () => {
    render(
      <TooltipBase content="Esc tooltip" classMap={mockStyles}>
        <button>Press Esc</button>
      </TooltipBase>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    const tooltip = screen.getByTestId("tooltip");

    fireEvent.mouseEnter(trigger);
    expect(tooltip).toHaveClass("visible");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");
  });

  it("applies position, state, and default round/shadow classes", () => {
    render(
      <TooltipBase
        content="Positioned tooltip"
        position="bottom"
        state="error"
        classMap={mockStyles}
      >
        <button>Check styles</button>
      </TooltipBase>
    );

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip.className).toContain("bottom");
    expect(tooltip.className).toContain("error");
    expect(tooltip.className).toContain("roundMedium");
    expect(tooltip.className).toContain("shadowLight");
  });

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <TooltipBase content="Accessible tooltip" classMap={mockStyles}>
          <button>Hover me</button>
        </TooltipBase>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it("works with non-focusable children by wrapping in a focusable span", () => {
    render(
      <TooltipBase content="Wrapped tooltip" classMap={mockStyles}>
        Text child
      </TooltipBase>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    expect(trigger.tagName.toLowerCase()).toBe("span");
    expect(trigger).toHaveAttribute("tabindex", "0");
  });

  it("exposes container test id", () => {
    render(
      <TooltipBase content="Container check" classMap={mockStyles}>
        <button>Child</button>
      </TooltipBase>
    );
    expect(screen.getByTestId("tooltip-container")).toBeInTheDocument();
  });
});
