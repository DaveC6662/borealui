import React, { useRef, useState } from "react";
import { FileUploadProps } from "./FileUpload.types";
import { FaFile, FaTrash } from "react-icons/fa";

export interface BaseFileUploadProps extends FileUploadProps {
  FormGroup: React.ComponentType<any>;
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  ProgressBar: React.ComponentType<any>;
  classNames: {
    wrapper: string;
    hiddenInput: string;
    uploadActions: string;
    fileInput: string;
    removeButton: string;
    uploadControls: string;
    uploadProgress: string;
    uploadButton: string;
  };
}

const BaseFileUpload: React.FC<BaseFileUploadProps> = ({
  label = "Upload File",
  description,
  error,
  required = false,
  theme = "primary",
  multiple = false,
  onSubmit,
  uploadProgress,
  "data-testid": testId,
  FormGroup,
  Button,
  IconButton,
  ProgressBar,
  classNames,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [internalProgress, setInternalProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected && selected.length > 0) {
      const croppedNames = Array.from(selected).map((file) =>
        file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name
      );
      setFiles(selected);
      setFileNames(croppedNames);
    } else {
      setFiles(null);
      setFileNames([]);
    }
  };

  const handleUpload = () => {
    if (!files || uploading) return;
    setUploading(true);
    setInternalProgress(0);

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            onSubmit(files);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleRemoveFile = () => {
    setFiles(null);
    setFileNames([]);
    setInternalProgress(0);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <FormGroup
      label={label}
      description={description}
      error={error}
      required={required}
      data-testid={testId}
    >
      <div
        className={classNames.wrapper}
        data-testid={testId ? `${testId}-wrapper` : undefined}
      >
        <input
          ref={fileInput}
          id={`${testId}-input`}
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          className={classNames.hiddenInput}
          aria-required={required}
          aria-label={label}
          data-testid={testId ? `${testId}-input` : undefined}
        />

        <div className={classNames.uploadActions}>
          <Button
            icon={FaFile}
            size="small"
            theme={theme}
            className={classNames.fileInput}
            onClick={() => fileInput.current?.click()}
            aria-label={
              fileNames.length > 0 ? fileNames.join(", ") : "Choose File"
            }
            data-testid={testId ? `${testId}-file-button` : undefined}
          >
            {fileNames.length > 0 ? fileNames.join(", ") : "Choose File"}
          </Button>

          {fileNames.length > 0 && (
            <IconButton
              icon={FaTrash}
              theme="error"
              onClick={handleRemoveFile}
              outline
              size="small"
              className={classNames.removeButton}
              aria-label="Remove file"
              data-testid={testId ? `${testId}-remove-button` : undefined}
            />
          )}
        </div>

        {fileNames.length > 0 && (
          <div
            className={classNames.uploadControls}
            data-testid={testId ? `${testId}-controls` : undefined}
          >
            <ProgressBar
              theme={theme}
              className={classNames.uploadProgress}
              progress={uploadProgress ?? internalProgress}
              indeterminate={uploadProgress === undefined}
              data-testid={testId ? `${testId}-progress` : undefined}
            />
            <Button
              theme={theme}
              disabled={uploading}
              onClick={handleUpload}
              loading={uploading}
              size="small"
              className={classNames.uploadButton}
              data-testid={testId ? `${testId}-upload-button` : undefined}
            >
              Upload
            </Button>
          </div>
        )}
      </div>
    </FormGroup>
  );
};

export default BaseFileUpload;
