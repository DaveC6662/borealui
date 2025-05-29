import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCommentDots } from "react-icons/fa";
import { TextArea } from "@/index.core";
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

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        icon={FaCommentDots}
        placeholder="Leave a comment..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const ThemedVariants: Story = {
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
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => {
          const [value, setValue] = useState("");
          return (
            <TextArea
              key={theme}
              {...args}
              theme={theme}
              placeholder={`${theme} theme`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          );
        })}
      </div>
    );
  },
};

export const OutlineVariants: Story = {
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
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => {
          const [value, setValue] = useState("");
          return (
            <TextArea
              key={theme}
              {...args}
              outline
              theme={theme}
              placeholder={`${theme} outline`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          );
        })}
      </div>
    );
  },
};

export const CustomHeight: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        height="150px"
        placeholder="Tall textarea for longer input..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithAriaDescription: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        placeholder="Describe your experience..."
        ariaDescription="Use this field to describe your experience with our product."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <TextArea
      {...args}
      disabled
      value="This field is disabled."
      onChange={() => {}}
    />
  ),
};
