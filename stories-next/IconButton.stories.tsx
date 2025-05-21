import { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@/index.next";
import type { IconButtonProps } from "@/components/Buttons/IconButton/IconButton.types";
import { FaPlus, FaExternalLinkAlt } from "react-icons/fa";

const meta: Meta<IconButtonProps> = {
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

type Story = StoryObj<IconButtonProps>;

export const Default: Story = {};

export const OutlineAndDisabledVariants: Story = {
  render: (args) => {
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        {themes.map((theme) => (
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
    );
  },
};

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

export const ThemeVariants: Story = {
  render: (args) => {
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
          <IconButton
            key={theme}
            {...args}
            theme={theme}
            ariaLabel={`Theme: ${theme}`}
          />
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;

    return (
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {sizes.map((size) => (
          <IconButton
            key={size}
            {...args}
            size={size}
            ariaLabel={`Size: ${size}`}
          />
        ))}
      </div>
    );
  },
};
