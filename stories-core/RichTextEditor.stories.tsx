import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import RichTextEditor from "@/components/RichTextEditor/core/RichTextEditor";
import type { RichTextEditorProps } from "@/components/RichTextEditor/RichTextEditor.types";

const meta: Meta<RichTextEditorProps> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  args: {
    initialContent: "<p>Hello, <strong>world</strong>!</p>",
  },
};

export default meta;

type Story = StoryObj<RichTextEditorProps>;

export const Default: Story = {
  render: (args) => {
    const [html, setHtml] = useState(args.initialContent || "");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <RichTextEditor
          {...args}
          onChange={(sanitizedHTML) => setHtml(sanitizedHTML)}
        />
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <strong>Sanitized HTML Output:</strong>
          <div
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem",
              background: "#fafafa",
              borderRadius: "4px",
            }}
          >
            <code style={{ whiteSpace: "pre-wrap" }}>{html}</code>
          </div>
        </div>
      </div>
    );
  },
};

export const EmptyEditor: Story = {
  args: {
    initialContent: "",
  },
};

export const PreFilled: Story = {
  args: {
    initialContent: "<h2>Preloaded Content</h2><p>This editor is prefilled.</p>",
  },
};
