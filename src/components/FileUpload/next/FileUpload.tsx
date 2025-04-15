"use client";

import React, { JSX, useRef, useState } from "react";
import FormGroup from "../../FormGroup/next/FormGroup";
import styles from "./FileUpload.module.scss";
import { Button, IconButton, Progressbar } from "@/index.next";
import { FaFile, FaTrash } from "react-icons/fa";
import { FileUploadProps } from "../FileUpload.types";

/**
 * FileUpload is a component for uploading one or more files with visual feedback,
 * file preview, and a simulated or external progress bar.
 *
 * @param {FileUploadProps} props - Props to configure file upload behavior.
 * @returns {JSX.Element} The rendered file upload component.
 */
const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload File",
  description,
  error,
  required = false,
  theme = "primary",
  multiple = false,
  onSubmit,
  uploadProgress,
  "data-testid": testId,
}: FileUploadProps): JSX.Element => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [internalProgress, setInternalProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  /**
   * Handles file selection and stores filenames for preview.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected && selected.length > 0) {
      const croppedNames = Array.from(selected).map((file) => {
        const maxLength = 30;
        return file.name.length > maxLength ? file.name.slice(0, maxLength - 3) + "..." : file.name;
      });

      setFiles(selected);
      setFileNames(croppedNames);
    } else {
      setFiles(null);
      setFileNames([]);
    }
  };

  /**
   * Simulates file upload and triggers `onSubmit` once complete.
   * If external progress is provided, skips internal simulation.
   */
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

  /**
   * Clears file input and resets state.
   */
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
      <div className={styles.fileUploadBox} data-testid={testId ? `${testId}-wrapper` : undefined}>
        <input
          ref={fileInput}
          id={`${testId}-input`}
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          className={styles.hiddenInput}
          aria-required={required}
          aria-label={label}
          data-testid={testId ? `${testId}-input` : undefined}
        />

        <div className={styles.uploadActions}>
          <Button
            icon={FaFile}
            size="small"
            theme={theme}
            className={styles.fileInput}
            onClick={() => fileInput.current?.click()}
            aria-label={fileNames.length > 0 ? fileNames.join(", ") : "Choose File"}
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
              className={styles.removeButton}
              aria-label="Remove file"
              data-testid={testId ? `${testId}-remove-button` : undefined}
            />
          )}
        </div>

        {fileNames.length > 0 && (
          <div
            className={styles.uploadControls}
            data-testid={testId ? `${testId}-controls` : undefined}
          >
            <Progressbar
              theme={theme}
              className={styles.uploadProgress}
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
              className={styles.uploadButton}
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

export default FileUpload;
