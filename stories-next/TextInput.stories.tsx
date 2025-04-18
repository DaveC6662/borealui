import { Meta, StoryObj } from "@storybook/react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import TextInput from "@/components/TextInput/next/TextInput";
import type { TextInputProps } from "@/components/TextInput/TextInput.types";

const meta: Meta<TextInputProps> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text...",
    theme: "primary",
    disabled: false,
    readOnly: false,
    password: false,
    autocomplete: false,
  },
};

export default meta;

type Story = StoryObj<TextInputProps>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FaUser,
    placeholder: "Username",
  },
};

export const EmailExample: Story = {
  args: {
    icon: FaEnvelope,
    placeholder: "Email",
    autocomplete: true,
  },
};

export const PasswordInput: Story = {
  args: {
    placeholder: "Enter password",
    password: true,
  },
};

export const ThemedVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <TextInput {...args} theme="primary" placeholder="Primary" />
      <TextInput {...args} theme="success" placeholder="Success" />
      <TextInput {...args} theme="warning" placeholder="Warning" />
      <TextInput {...args} theme="error" placeholder="Error" />
    </div>
  ),
};

export const WithAriaDescription: Story = {
  args: {
    placeholder: "Type a short bio...",
    ariaDescription:
      "This field is used to describe yourself in 100 characters or less.",
  },
};
