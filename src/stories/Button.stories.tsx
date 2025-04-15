import { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/Buttons/Button/core/Button";
import { FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import type { ButtonProps } from "@/components/Buttons/Button/Button.types";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click Me",
    theme: "primary",
    size: "medium",
  },
  argTypes: {
    icon: {
      control: false,
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FaCheck,
    children: "Submit",
  },
};

export const Outline: Story = {
  args: {
    outline: true,
    children: "Outlined",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    isExternal: true,
    icon: FaExternalLinkAlt,
    children: "Visit Site",
  },
};

export const InternalLink: Story = {
  args: {
    href: "/internal-page",
    children: "Go to Page",
  },
};
