import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "@/components/Avatar/next/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description:
        "Full name used to generate initials when no image is available",
    },
    src: {
      control: "text",
      description: "URL of the avatar image",
    },
    size: {
      control: "select",
      options: ["xs", "small", "medium", "large", "xl"],
    },
    theme: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "clear"],
    },
    shape: {
      control: "select",
      options: ["circle", "rounded", "square"],
    },
    status: {
      control: "select",
      options: ["online", "idle", "offline", undefined],
    },
    alt: {
      control: "text",
      description: "Alternative text for accessibility",
    },
    label: {
      control: "text",
      description: "Custom ARIA label and title tooltip",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: "Davin Chiupka",
    status: "online",
    size: "medium",
    theme: "primary",
  },
};

export const WithImage: Story = {
  args: {
    name: "Davin Chiupka",
    src: "https://i.pravatar.cc/150?img=12",
    size: "medium",
    theme: "secondary",
    shape: "circle",
  },
};

export const SquareOffline: Story = {
  args: {
    name: "Taylor Smith",
    status: "offline",
    size: "large",
    theme: "primary",
    shape: "square",
  },
};

export const Accessible: Story = {
  args: {
    name: "Morgan Lee",
    alt: "Profile picture of Morgan Lee",
    label: "Morgan Lee’s avatar",
    size: "medium",
    theme: "secondary",
    status: "idle",
  },
};
