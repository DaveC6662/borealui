import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { CommandPalette } from "../src/index.core";
import type { CommandPaletteProps } from "../src/components/CommandPalette/CommandPalette.types";
import { FaSearch, FaUser, FaCog } from "react-icons/fa";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<CommandPaletteProps> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <div id="widget-portal" />
        <Story />
      </>
    ),
  ],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
    commands: { control: false },
    placeholder: { control: "text" },
    theme: { control: "select", options: themeOptions },
    state: { control: "select", options: ["", ...stateOptions] },
    rounding: { control: "select", options: roundingOptions },
    shadow: { control: "select", options: shadowOptions },
    asyncSearch: { control: false },
    debounceMs: { control: "number" },
    className: { control: "text" },
    "data-testid": { control: "text" },
  },
};

export default meta;
type Story = StoryObj<CommandPaletteProps>;

const sampleCommands = [
  {
    label: "Search",
    icon: <FaSearch />,
    action: () => alert("Search triggered"),
  },
  {
    label: "Profile",
    icon: <FaUser />,
    action: () => alert("Go to Profile"),
  },
  {
    label: "Settings",
    icon: <FaCog />,
    action: () => alert("Open Settings"),
  },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: "2rem" }}>
        <button onClick={() => setOpen(true)}>Open Command Palette</button>
        <CommandPalette
          isOpen={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          placeholder="Type a command..."
          theme="primary"
        />
      </div>
    );
  },
};

export const ThemeVariants = {
  render: () => {
    const [openPalette, setOpenPalette] = useState<string | null>(null);

    return (
      <StoryGrid title="Theme Variants">
        {themeOptions.map((theme) => (
          <div key={theme} style={{ paddingBottom: "1rem" }}>
            <button onClick={() => setOpenPalette(theme)}>
              Open {theme} Palette
            </button>
            <CommandPalette
              isOpen={openPalette === theme}
              onClose={() => setOpenPalette(null)}
              commands={sampleCommands}
              placeholder={`Theme: ${theme}`}
              theme={theme}
            />
          </div>
        ))}
      </StoryGrid>
    );
  },
};

export const StateVariants = {
  render: () => {
    const [openPalette, setOpenPalette] = useState<string | null>(null);

    return (
      <StoryGrid title="Theme Variants">
        {stateOptions.map((state) => (
          <div key={state} style={{ paddingBottom: "1rem" }}>
            <button onClick={() => setOpenPalette(state)}>
              Open {state} Palette
            </button>
            <CommandPalette
              isOpen={openPalette === state}
              onClose={() => setOpenPalette(null)}
              commands={sampleCommands}
              placeholder={`state: ${state}`}
              state={state}
            />
          </div>
        ))}
      </StoryGrid>
    );
  },
};

export const RoundingVariants = {
  render: () => {
    const [openPalette, setOpenPalette] = useState<string | null>(null);

    return (
      <StoryGrid title="Rounding Variants">
        {roundingOptions.map((rounding) => (
          <div key={rounding} style={{ paddingBottom: "1rem" }}>
            <button onClick={() => setOpenPalette(rounding)}>
              Rounding {rounding}
            </button>
            <CommandPalette
              isOpen={openPalette === rounding}
              onClose={() => setOpenPalette(null)}
              commands={sampleCommands}
              placeholder={`Rounding: ${rounding}`}
              rounding={rounding}
            />
          </div>
        ))}
      </StoryGrid>
    );
  },
};

export const ShadowVariants = {
  render: () => {
    const [openPalette, setOpenPalette] = useState<string | null>(null);

    return (
      <StoryGrid title="Shadow Variants">
        {shadowOptions.map((shadow) => (
          <div key={shadow} style={{ paddingBottom: "1rem" }}>
            <button onClick={() => setOpenPalette(shadow)}>
              Shadow {shadow} Palette
            </button>
            <CommandPalette
              isOpen={openPalette === shadow}
              onClose={() => setOpenPalette(null)}
              commands={sampleCommands}
              placeholder={`Shadow: ${shadow}`}
              shadow={shadow}
            />
          </div>
        ))}
      </StoryGrid>
    );
  },
};

export const AsyncSearch: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const asyncSearch = async (query: string) => {
      return new Promise<typeof sampleCommands>((resolve) => {
        setTimeout(() => {
          const filtered = sampleCommands.filter((cmd) =>
            cmd.label.toLowerCase().includes(query.toLowerCase())
          );
          resolve(filtered);
        }, 500);
      });
    };

    return (
      <div style={{ padding: "2rem" }}>
        <button onClick={() => setOpen(true)}>
          Open Async Command Palette
        </button>
        <CommandPalette
          isOpen={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          asyncSearch={asyncSearch}
          debounceMs={300}
          placeholder="Search async commands..."
          theme="primary"
        />
      </div>
    );
  },
};

export const WithClassName: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: "2rem" }}>
        <button onClick={() => setOpen(true)}>Open Custom Class Palette</button>
        <CommandPalette
          isOpen={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          placeholder="Palette with custom className"
          theme="primary"
          className="storybook-commandpalette-custom"
        />
      </div>
    );
  },
};

export const WithDataTestid: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: "2rem" }}>
        <button onClick={() => setOpen(true)}>Open DataTestid Palette</button>
        <CommandPalette
          isOpen={open}
          onClose={() => setOpen(false)}
          commands={sampleCommands}
          placeholder="Palette with data-testid"
          theme="primary"
          data-testid="commandpalette-storybook"
        />
      </div>
    );
  },
};
