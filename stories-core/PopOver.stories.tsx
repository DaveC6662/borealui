import { Meta, StoryObj } from "@storybook/nextjs";
import { PopOver, Button } from "../src/index.core";
import type { PopoverProps } from "../src/components/PopOver/PopOver.types";

const meta: Meta<PopoverProps> = {
  title: "Components/Popover",
  component: PopOver,
  tags: ["autodocs"],
  args: {
    placement: "bottom",
    theme: "primary",
  },
  argTypes: {
    trigger: {
      control: false,
      description: "Element that triggers the popover when clicked/focused.",
      table: { category: "Content", type: { summary: "ReactNode" } },
      type: { name: "string", required: true },
    },
    content: {
      control: false,
      description: "Content shown inside the popover.",
      table: { category: "Content", type: { summary: "ReactNode" } },
      type: { name: "string", required: true },
    },
    placement: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "Position of the popover relative to the trigger.",
      table: { category: "Position", defaultValue: { summary: "bottom" } },
      type: { name: "string" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
      type: { name: "string" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Optional state variant for emphasis.",
      table: { category: "Appearance" },
      type: { name: "string" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the popover container.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
      type: { name: "string" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box-shadow for the popover container.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
      type: { name: "string" },
    },
    className: {
      control: "text",
      description: "Custom class name for the popover container.",
      table: { category: "Advanced" },
      type: { name: "string" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
  },
};

export default meta;

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
      "tertiary",
      "quaternary",
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

export const StateVariants: Story = {
  render: () => {
    const stateOptions = ["success", "error", "warning"];

    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {stateOptions.map((state) => (
          <PopOver
            key={state}
            state={state}
            trigger={<Button state={state}>{state}</Button>}
            content={
              <div style={{ padding: "0.5rem" }}>
                {state.charAt(0).toUpperCase() + state.slice(1)} state
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

export const RoundingVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {roundingOptions.map((state) => (
          <PopOver
            key={state}
            rounding={state}
            trigger={<Button>{state}</Button>}
            content={
              <div style={{ padding: "0.5rem" }}>
                {state.charAt(0).toUpperCase() + state.slice(1)} state
              </div>
            }
          />
        ))}
      </div>
    );
  },
};

export const ShadowVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {shadowOptions.map((state) => (
          <PopOver
            key={state}
            shadow={state}
            trigger={<Button>{state}</Button>}
            content={
              <div style={{ padding: "0.5rem" }}>
                {state.charAt(0).toUpperCase() + state.slice(1)} state
              </div>
            }
          />
        ))}
      </div>
    );
  },
};
