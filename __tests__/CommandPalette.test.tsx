import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommandPalette } from "@/index";
import { CommandItem } from "@/components/CommandPalette/CommandPalette";

function setupPortal() {
  const portal = document.createElement("div");
  portal.setAttribute("id", "widget-portal");
  document.body.appendChild(portal);
}

describe("CommandPalette", () => {
  const commands: CommandItem[] = [
    { label: "Action One", action: jest.fn() },
    { label: "Action Two", action: jest.fn() },
    { label: "Run", action: jest.fn() },
  ];

  beforeEach(() => {
    setupPortal();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    const portal = document.getElementById("widget-portal");
    if (portal) portal.remove();
  });

  it("renders when open", () => {
    render(
      <CommandPalette
        isOpen={true}
        onClose={jest.fn()}
        commands={commands}
      />
    );
    expect(screen.getByTestId("command-palette")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <CommandPalette
        isOpen={false}
        onClose={jest.fn()}
        commands={commands}
      />
    );
    expect(screen.queryByTestId("command-palette")).not.toBeInTheDocument();
  });

  test("filters commands by input", async () => {
    const commands: CommandItem[] = [
      { label: "Action One", action: jest.fn() },
      { label: "Action Two", action: jest.fn() },
      { label: "Run", action: jest.fn() },
    ];

    render(
      <CommandPalette isOpen onClose={jest.fn()} data-testid="command-palette" commands={commands} />
    );

    const input = screen.getByTestId("command-palette-input");

    fireEvent.change(input, { target: { value: "Two" } });

    await waitFor(() => {
      expect(screen.queryByText("Action One")).not.toBeInTheDocument();
      expect(screen.queryByText("Run")).not.toBeInTheDocument();
      expect(screen.getByText("Action Two")).toBeInTheDocument();
    });
  });

  test("selects command with enter", async () => {
    const mockAction = jest.fn();
    const mockClose = jest.fn();

    const commands: CommandItem[] = [
      { label: "Action One", action: mockAction },
      { label: "Other", action: jest.fn() },
    ];

    render(
      <CommandPalette isOpen onClose={mockClose} commands={commands} />
    );

    const input = screen.getByTestId("command-palette-input");

    fireEvent.change(input, { target: { value: "Action" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  test("closes on Escape", async () => {
    const mockClose = jest.fn();

    render(
      <CommandPalette
        isOpen
        onClose={mockClose}
        commands={[
          { label: "Action One", action: jest.fn() },
          { label: "Action Two", action: jest.fn() },
        ]}
      />
    );

    const input = screen.getByTestId("command-palette-input");

    fireEvent.keyDown(input, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

});
