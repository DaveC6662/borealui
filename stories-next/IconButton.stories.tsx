import { Meta, StoryObj } from "@storybook/react";
import IconButton from "@/components/Buttons/IconButton/next/IconButton";
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

export const Outline: Story = {
  args: {
    outline: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    isExternal: true,
    icon: FaExternalLinkAlt,
    ariaLabel: "External link",
  },
};

export const InternalLink: Story = {
  args: {
    href: "/internal-route",
    icon: FaPlus,
    ariaLabel: "Internal link",
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
  },
};
