import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip } from "@/index";

describe("Tooltip", () => {
  it("renders tooltip content with default position and theme", () => {
    render(
      <Tooltip content="Hello Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Hello Tooltip");
    expect(tooltip.className).toContain("top");
    expect(tooltip.className).toContain("primary");
  });

  it("applies the specified position and theme", () => {
    render(
      <Tooltip content="Custom Tooltip" position="right" theme="success">
        <span>Hover target</span>
      </Tooltip>
    );

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.className).toContain("right");
    expect(tooltip.className).toContain("success");
  });

  it("renders tooltip alongside the child and responds to hover event", () => {
    render(
      <Tooltip content="Hover me!">
        <button data-testid="hover-button">Hover</button>
      </Tooltip>
    );

    const tooltip = screen.getByRole("tooltip");
    const trigger = screen.getByTestId("hover-button");

    expect(tooltip).toBeInTheDocument();
    expect(trigger).toBeInTheDocument();

    fireEvent.mouseOver(trigger);

    expect(screen.getByText("Hover me!")).toBeInTheDocument();
  });
});
