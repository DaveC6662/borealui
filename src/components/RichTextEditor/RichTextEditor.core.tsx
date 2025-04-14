import React, { JSX, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import styles from "./RichTextEditor.module.scss";
import { Button, Select } from "@/index"; // Adjust this import path if needed
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

/**
 * RichTextEditor is a fully customizable rich text editor built using TipTap.
 * It initializes with optional content and updates a parent component
 * with sanitized HTML output as the user makes edits.
 *
 * The editor includes a customizable toolbar offering commands for:
 * - Bold, Italic, Strikethrough styling.
 * - Code block toggling.
 * - Bullet and ordered lists.
 * - Clearing formatting or all content.
 * - Undo and redo functionality.
 *
 * A select dropdown allows the user to choose a heading level or paragraph style.
 *
 * @param {RichTextEditorProps} props - Props to configure the editor.
 * @returns {JSX.Element|null} The rendered rich text editor component.
 */
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = "",
  onChange,
  "data-testid": testId = "rich-text-editor",
}: RichTextEditorProps): JSX.Element | null => {
  const initialContentMemo = useMemo(() => initialContent, [initialContent]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
      }),
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
    } else {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
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
    <div className={styles.editorContainer} data-testid={testId}>
      <div className={styles.toolbar}>
        <Select
          ariaLabel="Text style"
          options={headingOptions}
          value={currentHeading}
          className={styles.headingSelect}
          onChange={handleHeadingChange}
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
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
};

export default RichTextEditor;
