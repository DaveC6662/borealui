import React from "react";
import BaseFileUpload from "../FileUploadBase";
import { FileUploadProps } from "../FileUpload.types";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import ProgressBar from "../../ProgressBar/core/ProgressBar";
import FormGroup from "../../FormGroup/core/FormGroup";
import "./FileUpload.scss";

const FileUpload: React.FC<FileUploadProps> = (props) => {
  return (
    <BaseFileUpload
      {...props}
      FormGroup={FormGroup}
      Button={Button}
      IconButton={IconButton}
      ProgressBar={ProgressBar}
      classNames={{
        wrapper: "fileUploadBox",
        hiddenInput: "hiddenInput",
        uploadActions: "uploadActions",
        fileInput: "fileInput",
        removeButton: "removeButton",
        uploadControls: "uploadControls",
        uploadProgress: "uploadProgress",
        uploadButton: "uploadButton",
      }}
    />
  );
};

export default FileUpload;
