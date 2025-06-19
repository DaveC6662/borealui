import { Meta, StoryObj } from "@storybook/react";
import { MarkdownRenderer } from "../src/index.core";
import type { MarkdownRendererProps } from "../src/components/MarkdownRenderer/MarkdownRenderer.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
- [Visit BorealUI](https://boreal.ui)
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
- [Visit BorealUI](https://boreal.ui)
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
- [Visit BorealUI](https://boreal.ui)
- \`Inline code\`

> Blockquote
`,
    },
    [{ propName: "shadow", values: shadowOptions }]
  );
