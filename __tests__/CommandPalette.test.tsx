import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommandPaletteBase from "@/components/CommandPalette/CommandPaletteBase";
import "@testing-library/jest-dom";

const mockCommands = [
  { label: "Open Settings", action: jest.fn() },
  { label: "Search Files", action: jest.fn() },
  { label: "Quit", action: jest.fn() },
];

const DummyInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <input ref={ref} {...props} />
));

const classMap = {
  overlay: "overlay",
  palette: "palette",
  primary: "theme-primary",
  input: "input",
  list: "list",
  item: "item",
  active: "active",
  icon: "icon",
  empty: "empty",
};

describe("CommandPaletteBase", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders input and command options when open", () => {
    render(
      <CommandPaletteBase
        isOpen={true}
        commands={mockCommands}
        onClose={jest.fn()}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(mockCommands.length);
  });

  it("filters commands based on input value", () => {
    render(
      <CommandPaletteBase
        isOpen={true}
        commands={mockCommands}
        onClose={jest.fn()}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Search" } });

    expect(screen.getByText("Search Files")).toBeInTheDocument();
    expect(screen.queryByText("Open Settings")).not.toBeInTheDocument();
  });

  it("calls action and closes on Enter", () => {
    const onClose = jest.fn();
    render(
      <CommandPaletteBase
        isOpen={true}
        commands={mockCommands}
        onClose={onClose}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockCommands[0].action).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
