import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { CommandPalette } from "../src/index.next";
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
    isOpen: {
      description: "Controls whether the command palette is open.",
      control: "boolean",
      table: { category: "State" },
    },
    onClose: {
      description:
        "Callback fired when the palette closes (e.g., Escape or click outside).",
      action: "closed",
      table: { category: "Events" },
    },
    commands: {
      description: "Array of available commands to show in the palette.",
      control: false,
      table: { category: "Main" },
    },
    placeholder: {
      description: "Placeholder text for the search input.",
      control: "text",
      table: { category: "Content" },
    },
    theme: {
      description: "Theme variant for the command palette.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "Visual state variant (success, warning, error, etc.).",
      control: { type: "select" },
      options: ["", ...stateOptions],
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Corner rounding of the palette dialog.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Box shadow style for the palette dialog.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    asyncSearch: {
      description: "Optional async search function for dynamic filtering.",
      control: false,
      table: { category: "Advanced" },
    },
    debounceMs: {
      description: "Debounce time (ms) for the search input.",
      control: "number",
      table: { category: "Performance" },
    },
    className: {
      description: "Additional CSS class for the palette container.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test id for the palette container.",
      control: "text",
      table: { category: "Testing" },
    },
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
