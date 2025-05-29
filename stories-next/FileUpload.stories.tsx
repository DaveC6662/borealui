import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FileUpload } from "@/index.next";
import type { FileUploadProps } from "@/components/FileUpload/FileUpload.types";

const meta: Meta<FileUploadProps> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: {
    label: "Upload your document",
    theme: "primary",
    required: false,
  },
};

export default meta;

type Story = StoryObj<FileUploadProps>;

export const Default: Story = {
  render: (args) => {
    const handleSubmit = (files: FileList) => {
      alert(
        `Uploaded ${files.length} file(s): ${Array.from(files)
          .map((f) => f.name)
          .join(", ")}`
      );
    };

    return <FileUpload {...args} onSubmit={() => handleSubmit} />;
  },
};

export const MaxFileSizeLimit: Story = {
  args: {
    label: "Upload a file (max 1MB)",
    maxFileSizeBytes: 1024 * 1024, // 1MB
  },
  render: (args) => {
    const handleSubmit = (files: File[]) => {
      alert(`Submitted: ${files.map((f) => f.name).join(", ")}`);
    };

    return <FileUpload {...args} multiple onSubmit={handleSubmit} />;
  },
};

export const AllowedFileTypes: Story = {
  args: {
    label: "Upload PNG or PDF",
    allowedFileTypes: ["image/png", "application/pdf"],
  },
  render: (args) => {
    const handleSubmit = (files: File[]) => {
      alert(`Accepted: ${files.map((f) => f.name).join(", ")}`);
    };

    return <FileUpload {...args} multiple onSubmit={handleSubmit} />;
  },
};

export const FileTypeAndSizeCombined: Story = {
  args: {
    label: "Upload JPG (max 500KB)",
    allowedFileTypes: ["image/jpeg"],
    maxFileSizeBytes: 500 * 1024,
  },
  render: (args) => {
    const handleSubmit = (files: File[]) => {
      alert(`Valid file(s): ${files.map((f) => f.name).join(", ")}`);
    };

    return <FileUpload {...args} multiple onSubmit={handleSubmit} />;
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
  },
  render: (args) => {
    return (
      <FileUpload
        {...args}
        onSubmit={(files) => console.log("Files submitted:", files)}
      />
    );
  },
};

export const ExternalProgress: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(0);

    return (
      <>
        <FileUpload
          {...args}
          uploadProgress={progress}
          onSubmit={(files) => {
            console.log("Externally submitted:", files);
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => setProgress((p) => Math.min(p + 10, 100))}>
            Simulate Upload Progress ({progress}%)
          </button>
        </div>
      </>
    );
  },
};

export const ErrorState: Story = {
  args: {
    error: "File is required.",
    required: true,
  },
  render: (args) => <FileUpload {...args} onSubmit={() => {}} />,
};

export const WithDescription: Story = {
  args: {
    description: "Supported formats: .pdf, .docx, .jpg",
  },
  render: (args) => <FileUpload {...args} onSubmit={() => {}} />,
};

const themes = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "clear",
] as const;

export const ThemeVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {themes.map((theme) => (
        <div key={theme}>
          <h4 style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
            {theme} Theme
          </h4>
          <FileUpload
            {...args}
            theme={theme}
            label={`Upload (${theme})`}
            onSubmit={(files) => console.log(`${theme}:`, files)}
          />
        </div>
      ))}
    </div>
  ),
};
