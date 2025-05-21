import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "@/index.next";
import type { TagInputProps } from "@/components/TagInput/Taginput.types";

const meta: Meta<TagInputProps> = {
  title: "Components/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Add a tag...",
    theme: "primary",
    size: "medium",
  },
};

export default meta;

type Story = StoryObj<TagInputProps>;

export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = useState(["react", "storybook"]);
    return <TagInput {...args} tags={tags} onChange={setTags} />;
  },
};

export const Empty: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} tags={tags} onChange={setTags} />;
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes: TagInputProps["size"][] = [
      "xs",
      "small",
      "medium",
      "large",
      "xl",
    ];
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {sizes.map((size) => {
          const [tags, setTags] = useState(["react", "nextjs"]);
          return (
            <TagInput
              key={size}
              {...args}
              size={size}
              tags={tags}
              onChange={setTags}
              placeholder={`Add ${size} tag...`}
            />
          );
        })}
      </div>
    );
  },
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
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {themes.map((theme) => {
          const [tags, setTags] = useState(["react", "nextjs"]);

          return (
            <TagInput
              key={theme}
              {...args}
              theme={theme}
              tags={tags}
              onChange={setTags}
              placeholder={`Add ${theme} tag...`}
            />
          );
        })}
      </div>
    );
  },
};

export const WithOnChangeAlert: Story = {
  render: (args) => {
    const [tags, setTags] = useState(["typescript"]);
    return (
      <TagInput
        {...args}
        tags={tags}
        onChange={(updated) => {
          setTags(updated);
          alert("Tags updated: " + updated.join(", "));
        }}
      />
    );
  },
};
