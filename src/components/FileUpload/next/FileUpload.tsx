"use client";

import React from "react";
import BaseFileUpload from "../FileUploadBase";
import { FileUploadProps } from "../FileUpload.types";
import { Button, IconButton, Progressbar, FormGroup } from "@/index.next";
import styles from "./FileUpload.module.scss";

const FileUpload: React.FC<FileUploadProps> = (props) => {
  return (
    <BaseFileUpload
      {...props}
      FormGroup={FormGroup}
      Button={Button}
      IconButton={IconButton}
      ProgressBar={Progressbar}
      classNames={{
        wrapper: styles.fileUploadBox,
        hiddenInput: styles.hiddenInput,
        uploadActions: styles.uploadActions,
        fileInput: styles.fileInput,
        removeButton: styles.removeButton,
        uploadControls: styles.uploadControls,
        uploadProgress: styles.uploadProgress,
        uploadButton: styles.uploadButton,
      }}
    />
  );
};

export default FileUpload;
