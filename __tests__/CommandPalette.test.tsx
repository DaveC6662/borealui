import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import CommandPaletteBase from "@/components/CommandPalette/CommandPaletteBase";

expect.extend(toHaveNoViolations);

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
  command_palette: "palette",
  primary: "theme-primary",
  input: "input",
  list: "list",
  item: "item",
  active: "active",
  icon: "icon",
  empty: "empty",
  shadowLight: "shadowLight",
  roundMedium: "roundMedium",
};

describe("CommandPaletteBase", () => {
  beforeEach(() => {
    const portal = document.createElement("div");
    portal.id = "widget-portal";
    document.body.appendChild(portal);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
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

  it("navigates with arrow keys", () => {
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
    fireEvent.keyDown(input, { key: "ArrowDown" }); // index 1
    fireEvent.keyDown(input, { key: "ArrowDown" }); // index 2
    fireEvent.keyDown(input, { key: "ArrowUp" }); // index 1

    // The second command should now be active
    const options = screen.getAllByRole("option");
    expect(options[1]).toHaveAttribute("aria-selected", "true");
  });

  it("renders empty message if no matches", () => {
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
    fireEvent.change(input, { target: { value: "Nonexistent" } });

    expect(screen.getByText("No matching results")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CommandPaletteBase
        isOpen={true}
        commands={mockCommands}
        onClose={jest.fn()}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
