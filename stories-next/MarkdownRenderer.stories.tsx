import { Meta, StoryObj } from "@storybook/react";
import MarkdownRenderer from "@/components/MarkdownRenderer/next/MarkdownRenderer"; // adjust path
import type { MarkdownRendererProps } from "@/components/MarkdownRenderer/MarkdownRenderer.types";

const meta: Meta<MarkdownRendererProps> = {
  title: "Components/MarkdownRenderer",
  component: MarkdownRenderer,
  tags: ["autodocs"],
  args: {
    content: "# Welcome\n\nThis is a simple **markdown** demo.",
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
- [Visit OpenAI](https://openai.com)
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
