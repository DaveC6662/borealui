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
      classNames={styles}
    />
  );
};

export default FileUpload;
