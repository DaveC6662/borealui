import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import TagInput from "@/components/TagInput/core/Taginput";
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
    const [tags, setTags] = useState(["responsive"]);
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <TagInput {...args} tags={tags} size="small" onChange={setTags} />
        <TagInput {...args} tags={tags} size="medium" onChange={setTags} />
        <TagInput {...args} tags={tags} size="large" onChange={setTags} />
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    const [tags, setTags] = useState(["custom"]);
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <TagInput {...args} tags={tags} theme="primary" onChange={setTags} />
        <TagInput {...args} tags={tags} theme="success" onChange={setTags} />
        <TagInput {...args} tags={tags} theme="warning" onChange={setTags} />
        <TagInput {...args} tags={tags} theme="error" onChange={setTags} />
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
