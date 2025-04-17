import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import FileUpload from "@/components/FileUpload/core/FileUpload";
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
      alert(`Uploaded ${files.length} file(s): ${Array.from(files).map(f => f.name).join(", ")}`);
    };

    return <FileUpload {...args} onSubmit={() => handleSubmit} />;
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
  },
  render: (args) => {
    return <FileUpload {...args} onSubmit={(files: any) => console.log("Files submitted:", files)} />;
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
          onSubmit={(files: any) => {
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
