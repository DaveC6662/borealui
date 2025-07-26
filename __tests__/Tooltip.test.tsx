import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { TooltipBase } from "@/components/Tooltip/TooltipBase";

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
};

describe("TooltipBase", () => {
  it("renders the trigger and tooltip content", () => {
    render(
      <TooltipBase content="Tooltip content" classMap={mockStyles}>
        <button>Hover me</button>
      </TooltipBase>
    );

    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toHaveAttribute("role", "tooltip");
  });

  it("shows tooltip on hover", () => {
    render(
      <TooltipBase content="Hover tooltip" classMap={mockStyles}>
        <button>Hover me</button>
      </TooltipBase>
    );

    const container = screen.getByTestId("tooltip-container");
    const tooltip = screen.getByTestId("tooltip");

    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");

    fireEvent.mouseEnter(container);
    expect(tooltip).toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");

    fireEvent.mouseLeave(container);
    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");
  });

  it("shows tooltip on focus and hides on blur", () => {
    render(
      <TooltipBase content="Focus tooltip" classMap={mockStyles}>
        <button>Focus me</button>
      </TooltipBase>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    const tooltip = screen.getByTestId("tooltip");

    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");

    fireEvent.focus(trigger);
    expect(tooltip).toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");

    fireEvent.blur(trigger);
    expect(tooltip).not.toHaveClass("visible");
    expect(tooltip).toHaveAttribute("aria-hidden", "true");
  });

  it("applies position and theme classes", () => {
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
  });

  describe("TooltipBase accessibility", () => {
    it("has no accessibility violations when rendered", async () => {
      const { container } = render(
        <TooltipBase content="Accessible tooltip" classMap={mockStyles}>
          <button>Hover me</button>
        </TooltipBase>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
