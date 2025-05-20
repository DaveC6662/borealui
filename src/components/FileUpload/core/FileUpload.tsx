import React from "react";
import BaseFileUpload from "../FileUploadBase";
import { FileUploadProps } from "../FileUpload.types";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import ProgressBar from "../../ProgressBar/core/ProgressBar";
import FormGroup from "../../FormGroup/core/FormGroup";
import "./FileUpload.scss";

const classes = {
  fileUpload: "file_upload",
  hiddenInput: "file_upload_hidden_input",
  uploadActions: "file_upload_upload_actions",
  fileInput: "file_upload_file_input",
  removeButton: "file_upload_remove_button",
  uploadControls: "file_upload_upload_controls",
  uploadProgress: "file_upload_upload_progress",
  uploadButton: "file_upload_upload_button",
  fileList: "file_upload_file_list",
  fileListItem: "file_upload_file_list_item",
  fileListFileName: "file_upload_file_list_file_name",
  fileListRemoveButton: "file_upload_file_list_remove_button",
};

const FileUpload: React.FC<FileUploadProps> = (props) => {
  return (
    <BaseFileUpload
      {...props}
      FormGroup={FormGroup}
      Button={Button}
      IconButton={IconButton}
      ProgressBar={ProgressBar}
      classMap={classes}
    />
  );
};

export default FileUpload;
