import { Meta, StoryObj } from "@storybook/react";
import { MarkdownRenderer } from "../src/index.next";
import type { MarkdownRendererProps } from "../src/components/MarkdownRenderer/MarkdownRenderer.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import { BaseMarkdownRendererProps } from "../src/components/MarkdownRenderer/MarkdownRendererBase";

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<BaseMarkdownRendererProps> = {
  title: "Components/MarkdownRenderer",
  component: MarkdownRenderer,
  tags: ["autodocs"],
  args: {
    content: "# Welcome\n\nThis is a simple **markdown** demo.",
  },
  argTypes: {
    content: {
      control: "text",
      description:
        "Markdown content to render. Accepts any valid Markdown string.",
      type: { name: "string", required: true },
      table: {
        category: "Content",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class to apply to the renderer container.",
      type: { name: "string" },
      table: {
        category: "Appearance",
        type: { summary: "string" },
      },
    },
    rounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Sets border-radius of the container.",
      type: { name: "string" },
      table: {
        category: "Appearance",
        defaultValue: { summary: "none" },
      },
    },
    shadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Sets shadow of the container.",
      type: { name: "string" },
      table: {
        category: "Appearance",
        defaultValue: { summary: "none" },
      },
    },
    language: {
      control: "text",
      description: "Language attribute for accessibility and i18n.",
      type: { name: "string" },
      table: {
        category: "Accessibility",
        defaultValue: { summary: "en" },
      },
    },
    "data-testid": {
      control: "text",
      description: "Testing identifier for querying in tests.",
      type: { name: "string" },
      table: {
        category: "Testing",
      },
    },
  },
};

export default meta;

type Story = StoryObj<MarkdownRendererProps>;

export const Default: Story = {};

export const WithLinksAndLists: Story = {
  args: {
    content: `
# Markdown Test

- Item 1
- Item 2
- [Visit BorealUI](https://www.borealui.ca)
- \`Inline code\`

> Blockquote
`,
  },
};

export const WithCustomClass: Story = {
  args: {
    content: "## Styled Block\n\nThis uses a custom class.",
    className: "customMarkdownClass",
  },
};

export const EmptyContent: Story = {
  args: {
    content: "",
  },
};

export const SanitizesScript: Story = {
  args: {
    content: `# Dangerous Attempt\n<script>alert("XSS")</script>\nThis should render safely.`,
  },
};

export const RoundingVariants = () =>
  withVariants(
    MarkdownRenderer,
    {
      rounding: "large",
      content: `
# Markdown Test

- Item 1
- Item 2
- [Visit BorealUI](https://www.borealui.ca)
- \`Inline code\`

> Blockquote
`,
    },
    [{ propName: "rounding", values: roundingOptions }]
  );

export const ShadowVariants = () =>
  withVariants(
    MarkdownRenderer,
    {
      shadow: "none",
      content: `
# Markdown Test

- Item 1
- Item 2
- [Visit BorealUI](https://www.borealui.ca)
- \`Inline code\`

> Blockquote
`,
    },
    [{ propName: "shadow", values: shadowOptions }]
  );
