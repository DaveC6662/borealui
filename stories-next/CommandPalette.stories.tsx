import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "@/index.next";
import type { CommandPaletteProps } from "@/components/CommandPalette/CommandPalette.types";
import { FaSearch, FaUser, FaCog } from "react-icons/fa";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

const themeOptions = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "clear",
] as const;

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
