import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { TagInput } from "../src/index.next";
import type { TagInputProps } from "../src/components/TagInput/Taginput.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<TagInputProps> = {
  title: "Components/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Add a tag...",
    theme: "primary",
    size: "medium",
    tags: ["react", "nextjs"],
  },
  argTypes: {
    tags: {
      control: false,
      description: "Array of strings representing the current tags.",
      table: { category: "Data", type: { summary: "string[]" } },
    },
    onChange: {
      action: "changed",
      description:
        "Callback fired when tags are added or removed. Receives the updated tag array.",
      table: { category: "Events" },
    },
    fetchSuggestions: {
      control: false,
      description:
        "Async function for fetching tag suggestions based on the input. Receives input string and returns Promise<string[]>.",
      table: {
        category: "Advanced",
        type: { summary: "(input: string) => Promise<string[]>" },
      },
    },
    debounceMs: {
      control: { type: "number", min: 0, step: 50 },
      description:
        "Debounce time in milliseconds before triggering fetchSuggestions.",
      table: {
        category: "Behavior",
        type: { summary: "number" },
        defaultValue: { summary: "300" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown in the tag input field.",
      table: { category: "Appearance", type: { summary: "string" } },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant for the tag input.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "State color for validation or status feedback.",
      table: { category: "Appearance" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the tag input and tags.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for tags and the input.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the container.",
      table: { category: "Appearance" },
    },
    ariaDescription: {
      control: "text",
      description: "ARIA description for assistive technologies.",
      table: { category: "Accessibility" },
    },
    "data-testid": {
      control: "text",
      description: "Test ID for the root element (for testing utilities).",
      table: { category: "Testing" },
    },
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
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {themeOptions.map((theme) => {
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

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {stateOptions.map((state) => {
          const [tags, setTags] = useState(["react", "nextjs"]);

          return (
            <TagInput
              key={state}
              {...args}
              state={state}
              tags={tags}
              onChange={setTags}
              placeholder={`Add ${state} tag...`}
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

export const RoundingVariants = (args) =>
  withVariants(TagInput, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(TagInput, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);

export const WithSuggestions: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);

    const allSuggestions = [
      "react",
      "nextjs",
      "typescript",
      "storybook",
      "vite",
      "tailwind",
      "graphql",
      "eslint",
      "prettier",
    ];

    const fetchSuggestions = async (query: string): Promise<string[]> => {
      if (!query.trim()) return [];
      await new Promise((res) => setTimeout(res, 200));
      return allSuggestions.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
    };

    return (
      <TagInput
        {...args}
        tags={tags}
        onChange={setTags}
        fetchSuggestions={fetchSuggestions}
        debounceMs={400}
        placeholder="Type to get tag suggestions..."
        ariaDescription="Try typing 'r', 't', or 'g' to see suggestions."
      />
    );
  },
};
