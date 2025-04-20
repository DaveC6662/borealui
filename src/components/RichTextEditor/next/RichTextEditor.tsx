"use client";

import React from "react";
import BaseRichTextEditor from "../RichTextEditorBase";
import styles from "./RichTextEditor.module.scss";
import { RichTextEditorProps } from "../RichTextEditor.types";
import { Button, Select } from "@/index.next";

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  return (
    <BaseRichTextEditor
      {...props}
      Button={Button}
      Select={Select}
      classNames={{
        container: styles.editorContainer,
        toolbar: styles.toolbar,
        select: styles.headingSelect,
        editor: styles.editor,
      }}
    />
  );
};

export default RichTextEditor;
