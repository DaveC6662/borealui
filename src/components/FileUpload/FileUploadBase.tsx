import React, { useRef, useState } from "react";
import { FileUploadProps } from "./FileUpload.types";
import { FileIcon, TrashIcon } from "@/Icons";

export interface BaseFileUploadProps extends FileUploadProps {
  FormGroup: React.ComponentType<any>;
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  ProgressBar: React.ComponentType<any>;
  classMap: Record<string, string>;
}

const BaseFileUpload: React.FC<BaseFileUploadProps> = ({
  label = "Upload File",
  description,
  error,
  required = false,
  theme = "primary",
  multiple = false,
  maxFileSizeBytes = Infinity,
  allowedFileTypes = [],
  onSubmit,
  uploadProgress,
  "data-testid": testId = "file-upload",
  FormGroup,
  Button,
  IconButton,
  ProgressBar,
  classMap,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<
    { name: string; reason: string }[]
  >([]);
  const [internalProgress, setInternalProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const validateFiles = (newFiles: File[]) => {
    const valid: File[] = [];
    const rejected: { name: string; reason: string }[] = [];

    newFiles.forEach((file) => {
      const isSizeOk = file.size <= maxFileSizeBytes;
      const isTypeOk =
        allowedFileTypes.length === 0 || allowedFileTypes.includes(file.type);

      if (isSizeOk && isTypeOk) {
        valid.push(file);
      } else {
        rejected.push({
          name: file.name,
          reason: !isSizeOk
            ? `Exceeds size limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`
            : `Invalid type (${file.type || "unknown"})`,
        });
      }
    });

    return { valid, rejected };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const { valid, rejected } = validateFiles(Array.from(selected));
    const updatedFiles = multiple ? [...files, ...valid] : valid;

    setFiles(updatedFiles);
    setFileNames(
      updatedFiles.map((file) =>
        file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name
      )
    );
    setRejectedFiles(rejected);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFileNames(
      updatedFiles.map((file) =>
        file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name
      )
    );
  };

  const getButtonLabel = () => {
    if (fileNames.length > 0) return multiple ? "Add Files" : "Select New";
    return "Choose File";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange({
        target: { files: droppedFiles },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleUpload = () => {
    if (!files || uploading) return;
    setUploading(true);
    setInternalProgress(0);
    setUploadMessage(null);

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            try {
              onSubmit(files);
              setUploadMessage("Upload successful.");
            } catch {
              setUploadMessage("Upload failed. Please try again.");
            }
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleRemoveFile = () => {
    setFiles([]);
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
        className={`${classMap.fileUpload} ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid={testId ? `${testId}-wrapper` : undefined}
      >
        <input
          ref={fileInput}
          id={`${testId}-input`}
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          className={classMap.hiddenInput}
          aria-required={required}
          aria-label={label}
          aria-describedby={`${testId}-description ${testId}-error`}
          data-testid={testId ? `${testId}-input` : undefined}
        />

        <div className={classMap.uploadActions}>
          <Button
            icon={FileIcon}
            size="small"
            theme={theme}
            className={classMap.fileInput}
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
            aria-label={
              fileNames.length > 0 ? fileNames.join(", ") : "Choose File"
            }
            data-testid={testId ? `${testId}-file-button` : undefined}
          >
            {getButtonLabel()}
          </Button>
        </div>

        {rejectedFiles.length > 0 && (
          <div className={classMap.rejectedFiles}>
            <p className={classMap.rejectedLabel}>Rejected Files:</p>
            <ul className={classMap.rejectedList}>
              {rejectedFiles.map((file, index) => (
                <li key={index} className={classMap.rejectedItem}>
                  <span>{file.name}</span>
                  <span className={classMap.rejectedReason}>
                    {" "}
                    – {file.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {fileNames.length > 0 && (
          <div
            className={classMap.uploadControls}
            data-testid={testId ? `${testId}-controls` : undefined}
          >
            <ul className={classMap.fileList}>
              {fileNames.map((name, index) => (
                <li key={index} className={classMap.fileListItem}>
                  <span>{name}</span>
                  <IconButton
                    icon={TrashIcon}
                    theme="error"
                    size="xsmall"
                    outline
                    aria-label={`Remove ${name}`}
                    onClick={() => removeFile(index)}
                    className={classMap.removeButton}
                  />
                </li>
              ))}
            </ul>
            {uploading && (
              <ProgressBar
                theme={theme}
                className={classMap.uploadProgress}
                progress={uploadProgress ?? internalProgress}
                indeterminate={uploadProgress === undefined}
                data-testid={testId ? `${testId}-progress` : undefined}
              />
            )}
            {!uploading && (
              <Button
                theme={theme}
                disabled={uploading}
                onClick={handleUpload}
                loading={uploading}
                size="small"
                className={classMap.uploadButton}
                data-testid={testId ? `${testId}-upload-button` : undefined}
              >
                Upload
              </Button>
            )}
          </div>
        )}
        <div
          className="sr_only"
          aria-live="polite"
          aria-atomic="true"
          data-testid={`${testId}-upload-message`}
        >
          {uploadMessage}
        </div>
      </div>
    </FormGroup>
  );
};

export default BaseFileUpload;
