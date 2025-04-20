import React from "react";
import BaseRichTextEditor from "../RichTextEditorBase";
import "./RichTextEditor.scss";
import { RichTextEditorProps } from "../RichTextEditor.types";
import Button from "../../Buttons/Button/core/Button";
import Select from "../../Select/core/Select";

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  return (
    <BaseRichTextEditor
      {...props}
      Button={Button}
      Select={Select}
      classNames={{
        container: "editorContainer",
        toolbar: "toolbar",
        select: "headingSelect",
        editor: "editor",
      }}
    />
  );
};

export default RichTextEditor;
