import { render, screen, fireEvent } from "@testing-library/react";
import { TooltipBase } from "@/components/Tooltip/TooltipBase";

const mockStyles = {
  tooltipContainer: "tooltipContainer",
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
};

describe("TooltipBase", () => {
  it("renders the trigger and tooltip content", () => {
    render(
      <TooltipBase content="Tooltip content" styles={mockStyles}>
        <button>Hover me</button>
      </TooltipBase>
    );

    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toHaveAttribute("role", "tooltip");
  });

  it("shows tooltip on hover", () => {
    render(
      <TooltipBase content="Hover tooltip" styles={mockStyles}>
        <button>Hover me</button>
      </TooltipBase>
    );

    const container = screen.getByTestId("tooltip-container");
    const tooltip = screen.getByTestId("tooltip");

    // Initially hidden
    expect(tooltip).toHaveStyle({ visibility: "hidden", opacity: "0" });

    // Hover shows tooltip
    fireEvent.mouseEnter(container);
    expect(tooltip).toHaveStyle({ visibility: "visible", opacity: "1" });

    // Mouse leave hides it again
    fireEvent.mouseLeave(container);
    expect(tooltip).toHaveStyle({ visibility: "hidden", opacity: "0" });
  });

  it("shows tooltip on focus and hides on blur", () => {
    render(
      <TooltipBase content="Focus tooltip" styles={mockStyles}>
        <button>Focus me</button>
      </TooltipBase>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    const tooltip = screen.getByTestId("tooltip");

    expect(tooltip).toHaveStyle({ visibility: "hidden", opacity: "0" });

    fireEvent.focus(trigger);
    expect(tooltip).toHaveStyle({ visibility: "visible", opacity: "1" });

    fireEvent.blur(trigger);
    expect(tooltip).toHaveStyle({ visibility: "hidden", opacity: "0" });
  });

  it("applies position and theme classes", () => {
    render(
      <TooltipBase
        content="Positioned tooltip"
        position="bottom"
        theme="error"
        styles={mockStyles}
      >
        <button>Check styles</button>
      </TooltipBase>
    );

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip.className).toContain("bottom");
    expect(tooltip.className).toContain("error");
  });
});
