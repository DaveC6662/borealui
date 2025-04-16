import { Meta, StoryObj } from "@storybook/react";
import { FaCommentDots } from "react-icons/fa";
import TextArea from "@/components/TextArea/core/TextArea";
import type { TextAreaProps } from "@/components/TextArea/TextArea.types";

const meta: Meta<TextAreaProps> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter your message...",
    theme: "primary",
    disabled: false,
    readOnly: false,
    autoComplete: "off",
  },
};

export default meta;

type Story = StoryObj<TextAreaProps>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FaCommentDots,
    placeholder: "Leave a comment...",
  },
};

export const ThemedVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <TextArea {...args} theme="primary" placeholder="Primary theme" />
      <TextArea {...args} theme="success" placeholder="Success theme" />
      <TextArea {...args} theme="warning" placeholder="Warning theme" />
      <TextArea {...args} theme="error" placeholder="Error theme" />
    </div>
  ),
};

export const CustomHeight: Story = {
  args: {
    height: "150px",
    placeholder: "Tall textarea for longer input...",
  },
};

export const WithAriaDescription: Story = {
  args: {
    ariaDescription: "Use this field to describe your experience with our product.",
    placeholder: "Describe your experience...",
  },
};
