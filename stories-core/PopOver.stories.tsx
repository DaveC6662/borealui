import { Meta, StoryObj } from "@storybook/react";
import { PopOver, Button } from "@/index.core";
import type { PopoverProps } from "@/components/PopOver/PopOver.types";

const meta: Meta<PopoverProps> = {
  title: "Components/Popover",
  component: PopOver,
  tags: ["autodocs"],
  args: {
    placement: "bottom",
    theme: "primary",
  },
};

export default meta;

type Story = StoryObj<PopoverProps>;

export const Default: Story = {
  args: {
    trigger: <Button size="small">Toggle Popover</Button>,
    content: (
      <div style={{ padding: "1rem", maxWidth: "200px" }}>
        This is some helpful info shown in a popover.
      </div>
    ),
  },
};

export const ThemedVariants: Story = {
  render: () => {
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {themes.map((theme) => (
          <PopOver
            key={theme}
            theme={theme}
            trigger={<Button theme={theme}>{theme}</Button>}
            content={
              <div style={{ padding: "0.5rem" }}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)} theme
              </div>
            }
          />
        ))}
      </div>
    );
  },
};

export const PlacementVariants: Story = {
  render: () => {
    const placements = ["top", "right", "bottom", "left"] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateAreas: `
            ".   top    ."
            "left center right"
            ".  bottom  ."
          `,
          gridTemplateColumns: "1fr auto 1fr",
          gridTemplateRows: "auto auto auto",
          gap: "2rem",
          alignItems: "center",
          justifyItems: "center",
          minHeight: "300px",
          marginTop: "5rem",
        }}
      >
        <div style={{ gridArea: "top" }}>
          <PopOver
            placement="top"
            trigger={<Button>Top</Button>}
            content={<div style={{ padding: "0.5rem" }}>Top popover</div>}
          />
        </div>
        <div style={{ gridArea: "right" }}>
          <PopOver
            placement="right"
            trigger={<Button>Right</Button>}
            content={<div style={{ padding: "0.5rem" }}>Right popover</div>}
          />
        </div>
        <div style={{ gridArea: "bottom" }}>
          <PopOver
            placement="bottom"
            trigger={<Button>Bottom</Button>}
            content={<div style={{ padding: "0.5rem" }}>Bottom popover</div>}
          />
        </div>
        <div style={{ gridArea: "left" }}>
          <PopOver
            placement="left"
            trigger={<Button>Left</Button>}
            content={<div style={{ padding: "0.5rem" }}>Left popover</div>}
          />
        </div>
        <div style={{ gridArea: "center" }}>
          <span style={{ opacity: 0.5 }}>Pop over uses dynamic placements</span>
          <br />
          <span style={{ opacity: 0.5 }}>
            and will readjust to avoid overflow
          </span>
        </div>
      </div>
    );
  },
};

export const KeyboardAccessible: Story = {
  args: {
    trigger: (
      <div
        tabIndex={0}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid gray",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Press Enter to toggle
      </div>
    ),
    content: (
      <div style={{ padding: "0.5rem" }}>
        This opens on Enter and closes on Escape.
      </div>
    ),
  },
};
