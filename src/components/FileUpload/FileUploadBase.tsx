import React, { useMemo, useRef, useState, useEffect } from "react";
import { BaseFileUploadProps } from "./FileUpload.types";
import { FileIcon, TrashIcon } from "../../Icons";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const BaseFileUpload: React.FC<BaseFileUploadProps> = ({
  label = "Upload File",
  description,
  error,
  required = false,
  theme = getDefaultTheme(),
  controlRounding = getDefaultRounding(),
  controlShadow = getDefaultShadow(),
  outline = false,
  outlineRounding = getDefaultRounding(),
  outlineShadow = getDefaultShadow(),
  state = "",
  multiple = false,
  maxFileSizeBytes = Infinity,
  allowedFileTypes = [],
  onSubmit,
  uploadProgress,
  "data-testid": testId = "file-upload",
  FormGroup,
  disabled = false,
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const accept = useMemo(() => {
    if (!allowedFileTypes || allowedFileTypes.length === 0) return undefined;
    return allowedFileTypes.join(",");
  }, [allowedFileTypes]);

  const validateFiles = (newFiles: File[]) => {
    const valid: File[] = [];
    const rejected: { name: string; reason: string }[] = [];

    newFiles.forEach((file) => {
      const isSizeOk = file.size <= maxFileSizeBytes;
      const ext = file.name.includes(".")
        ? "." + file.name.split(".").pop()!.toLowerCase()
        : "";
      const typeAllowed =
        allowedFileTypes.length === 0 ||
        allowedFileTypes.includes(file.type) ||
        (ext && allowedFileTypes.map((t) => t.toLowerCase()).includes(ext));

      if (isSizeOk && typeAllowed) {
        valid.push(file);
      } else {
        rejected.push({
          name: file.name,
          reason: !isSizeOk
            ? `Exceeds size limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`
            : `Invalid type (${file.type || ext || "unknown"})`,
        });
      }
    });

    return { valid, rejected };
  };

  const truncate = (s: string) => (s.length > 30 ? s.slice(0, 27) + "..." : s);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const { valid, rejected } = validateFiles(Array.from(selected));
    const updatedFiles = multiple ? [...files, ...valid] : valid;

    setFiles(updatedFiles);
    setFileNames(updatedFiles.map((f) => truncate(f.name)));
    setRejectedFiles(rejected);

    if (fileInput.current) fileInput.current.value = "";
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFileNames(updatedFiles.map((f) => truncate(f.name)));
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

  const handleUpload = async () => {
    if (!files.length || uploading) return;
    setUploading(true);
    setInternalProgress(0);
    setUploadMessage(null);

    try {
      if (uploadProgress === undefined) {
        intervalRef.current = setInterval(() => {
          setInternalProgress((prev) => {
            if (prev >= 100) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      }

      await Promise.resolve(onSubmit?.(files));
      setUploadMessage("Upload successful.");
    } catch {
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      if (intervalRef.current) {
        if (uploadProgress === undefined) setInternalProgress(100);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setTimeout(() => setUploading(false), 300);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const containerClassName = useMemo(
    () =>
      combineClassNames(
        classMap.fileUpload,
        classMap[state],
        classMap[theme],
        outlineShadow && classMap[`shadow${capitalize(outlineShadow)}`],
        outlineRounding && classMap[`round${capitalize(outlineRounding)}`],
        error && classMap.error,
        isDragging && classMap.dragging,
        disabled && classMap.disabled
      ),
    [
      classMap,
      theme,
      state,
      outlineShadow,
      outlineRounding,
      error,
      isDragging,
      disabled,
    ]
  );

  const describedBy =
    [
      description ? `${testId}-description` : undefined,
      error ? `${testId}-error` : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <FormGroup
      label={label}
      description={description}
      error={error}
      required={required}
      data-testid={testId}
    >
      <div
        className={containerClassName}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-busy={uploading || undefined}
        data-testid={testId ? `${testId}-wrapper` : undefined}
      >
        <input
          ref={fileInput}
          id={`${testId}-input`}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className={classMap.hiddenInput}
          required={required}
          aria-label={label}
          aria-describedby={describedBy}
          data-testid={testId ? `${testId}-input` : undefined}
        />

        <div className={classMap.uploadActions}>
          <Button
            icon={FileIcon}
            size="small"
            theme={theme}
            state={error ? "error" : state}
            className={classMap.fileInput}
            disabled={uploading || disabled}
            outline={outline}
            rounding={controlRounding}
            shadow={controlShadow}
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
                    type="button"
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
                state={error ? "error" : state}
                disabled={disabled || files.length === 0}
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
          data-testid={testId ? `${testId}-upload-message` : undefined}
        >
          {uploadMessage}
        </div>
      </div>
    </FormGroup>
  );
};
BaseFileUpload.displayName = "BaseFileUpload";
export default BaseFileUpload;
