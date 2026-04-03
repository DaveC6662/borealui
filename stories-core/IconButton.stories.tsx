import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "../src/index.core";
import { FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "warning", "error"];

const sizeOptions = ["xs", "small", "medium", "large", "xl"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: FaPlus,
    theme: "primary",
    size: "medium",
    rounding: "large",
    "aria-label": "Add",
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const ThemeVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      size: "medium",
      "aria-label": "Theme",
      theme: "primary",
    },
    [{ propName: "theme", values: themeOptions }],
  );

export const StateVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      size: "medium",
      "aria-label": "Theme",
      state: "",
    },
    [{ propName: "state", values: stateOptions }],
  );

export const OutlineAndDisabledVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {themeOptions.map((theme) => (
        <IconButton
          key={theme}
          {...args}
          theme={theme}
          outline
          aria-label={`Theme: ${theme}`}
        />
      ))}
      {stateOptions.map((theme) => (
        <IconButton
          key={theme}
          {...args}
          theme={theme}
          outline
          aria-label={`Theme: ${theme}`}
        />
      ))}
      <IconButton {...args} disabled aria-label="Disabled" />
    </div>
  ),
};

export const SizeVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      "aria-label": "Size",
      size: "medium",
    },
    [{ propName: "size", values: sizeOptions }],
  );

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const LinkVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <IconButton
        {...args}
        href="https://example.com"
        icon={FaExternalLinkAlt}
        isExternal
        aria-label="External Link"
      />
      <IconButton
        {...args}
        href="/internal-route"
        icon={FaPlus}
        aria-label="Internal Link"
      />
    </div>
  ),
};

export const RoundingVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      "aria-label": "Size",
      rounding: "large",
      size: "medium",
    },
    [{ propName: "rounding", values: roundingOptions }],
  );

export const ShadowVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      "aria-label": "Size",
      shadow: "none",
      size: "medium",
    },
    [{ propName: "shadow", values: shadowOptions }],
  );
