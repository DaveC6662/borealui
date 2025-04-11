import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "../components/Toggle Switch/Toggle";

describe("Toggle", () => {
  const setup = (props = {}) => {
    const onChange = jest.fn();
    render(<Toggle checked={false} onChange={onChange} {...props} />);
    return { onChange };
  };

  it("renders with a label", () => {
    setup({ label: "Dark Mode" });
    expect(screen.getByTestId("toggle-label")).toHaveTextContent("Dark Mode");
  });

  it("toggles when clicked", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles when Enter is pressed", () => {
    const { onChange } = setup();
    const toggle = screen.getByRole("switch");
    fireEvent.keyDown(toggle, { key: "Enter", code: "Enter" });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles when Space is pressed", () => {
    const { onChange } = setup();
    const toggle = screen.getByRole("switch");
    fireEvent.keyDown(toggle, { key: " ", code: "Space" });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const { onChange } = setup({ disabled: true });
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    fireEvent.keyDown(toggle, { key: "Enter", code: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("has the correct aria attributes", () => {
    setup({ checked: true, label: "Toggle accessibility" });
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAttribute("aria-labelledby", "toggle-label");
  });
});
