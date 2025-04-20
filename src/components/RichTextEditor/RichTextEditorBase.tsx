import React, { JSX, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import DOMPurify from "dompurify";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
  FaEraser,
  FaTrash,
} from "react-icons/fa";
import { RichTextEditorProps } from "./RichTextEditor.types";

interface BaseRichTextEditorProps extends RichTextEditorProps {
  Button: React.ComponentType<any>;
  Select: React.ComponentType<any>;
  classNames: {
    container: string;
    toolbar: string;
    select: string;
    editor: string;
  };
}

const BaseRichTextEditor: React.FC<BaseRichTextEditorProps> = ({
  initialContent = "",
  onChange,
  Button,
  Select,
  classNames,
  "data-testid": testId = "rich-text-editor",
}: BaseRichTextEditorProps): JSX.Element | null => {
  const initialContentMemo = useMemo(() => initialContent, [initialContent]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: false }),
      Paragraph,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: initialContentMemo,
    onUpdate({ editor }) {
      const unsafeHTML = editor.getHTML();
      const safeHTML = DOMPurify.sanitize(unsafeHTML);
      onChange?.(safeHTML);
    },
  });

  if (!editor) return null;

  const currentHeading = editor.isActive("heading", { level: 1 })
    ? "h1"
    : editor.isActive("heading", { level: 2 })
      ? "h2"
      : editor.isActive("heading", { level: 3 })
        ? "h3"
        : "paragraph";

  const headingOptions = [
    { label: "Paragraph", value: "paragraph" },
    { label: "Heading 1", value: "h1" },
    { label: "Heading 2", value: "h2" },
    { label: "Heading 3", value: "h3" },
  ];

  const handleHeadingChange = (value: string | number) => {
    editor.chain().focus();
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "h1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else if (value === "h2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (value === "h3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    }
  };

  const buttons = [
    {
      icon: <FaBold size={14} />,
      label: "Bold",
      cmd: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <FaItalic size={14} />,
      label: "Italic",
      cmd: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <FaStrikethrough size={14} />,
      label: "Strikethrough",
      cmd: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: <FaCode size={14} />,
      label: "Code Block",
      cmd: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
    },
    {
      icon: <FaListUl size={14} />,
      label: "Bullet List",
      cmd: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <FaListOl size={14} />,
      label: "Numbered List",
      cmd: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <FaEraser size={14} />,
      label: "Clear Formatting",
      cmd: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
    },
    {
      icon: <FaTrash size={14} />,
      label: "Clear Content",
      cmd: () => editor.commands.setContent(""),
    },
    {
      icon: <FaUndo size={14} />,
      label: "Undo",
      cmd: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <FaRedo size={14} />,
      label: "Redo",
      cmd: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className={classNames.container} data-testid={testId}>
      <div className={classNames.toolbar}>
        <Select
          ariaLabel="Text style"
          options={headingOptions}
          value={currentHeading}
          onChange={handleHeadingChange}
          className={classNames.select}
          theme="clear"
        />
        {buttons.map((btn, index) => (
          <Button
            key={index}
            onClick={btn.cmd}
            className={btn.isActive ? "disabled" : ""}
            type="button"
            theme="clear"
            aria-label={btn.label}
          >
            {btn.icon}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} className={classNames.editor} />
    </div>
  );
};

export default BaseRichTextEditor;
