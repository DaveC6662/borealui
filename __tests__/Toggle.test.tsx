import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import ToggleBase from "@/components/Toggle/ToggleBase";

const mockStyles = {
  toggleContainer: "toggleContainer",
  toggle: "toggle",
  active: "active",
  slider: "slider",
  label: "label",
  primary: "primary",
  medium: "medium",
  disabled: "disabled",
};

describe("ToggleBase", () => {
  it("is accessible with a label", async () => {
    const { container } = render(
      <ToggleBase
        checked={false}
        onChange={() => {}}
        label="Enable setting"
        styles={mockStyles}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("calls onChange when clicked", () => {
    const onChange = jest.fn();

    render(
      <ToggleBase
        checked={false}
        onChange={onChange}
        label="Click me"
        styles={mockStyles}
      />
    );

    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange when toggled via keyboard", () => {
    const onChange = jest.fn();

    render(
      <ToggleBase
        checked={false}
        onChange={onChange}
        label="Press me"
        styles={mockStyles}
      />
    );

    fireEvent.keyDown(screen.getByRole("switch"), { key: " " });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("is disabled and does not call onChange", () => {
    const onChange = jest.fn();

    render(
      <ToggleBase
        checked={false}
        onChange={onChange}
        label="Disabled"
        disabled
        styles={mockStyles}
      />
    );

    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    fireEvent.keyDown(toggle, { key: " " });
    expect(onChange).not.toHaveBeenCalled();
  });
});
