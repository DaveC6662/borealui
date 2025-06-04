import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton } from "../src/index.core";
import type { IconButtonProps } from "../src/components/IconButton/IconButton.types";
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

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: FaPlus,
    theme: "primary",
    size: "medium",
    ariaLabel: "Add",
  },
  argTypes: {
    icon: { control: false },
    onClick: { action: "clicked" },
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
      ariaLabel: "Theme",
      theme: "primary",
    },
    [{ propName: "theme", values: themeOptions }]
  );

export const StateVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      size: "medium",
      ariaLabel: "Theme",
      state: "",
    },
    [{ propName: "state", values: stateOptions }]
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
          ariaLabel={`Theme: ${theme}`}
        />
      ))}
      {stateOptions.map((theme) => (
        <IconButton
          key={theme}
          {...args}
          theme={theme}
          outline
          ariaLabel={`Theme: ${theme}`}
        />
      ))}
      <IconButton {...args} disabled ariaLabel="Disabled" />
    </div>
  ),
};

export const SizeVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      ariaLabel: "Size",
      size: "medium",
    },
    [{ propName: "size", values: sizeOptions }]
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
        ariaLabel="External Link"
      />
      <IconButton
        {...args}
        href="/internal-route"
        icon={FaPlus}
        ariaLabel="Internal Link"
      />
    </div>
  ),
};
