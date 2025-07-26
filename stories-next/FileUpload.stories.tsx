import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FileUpload } from "../src/index.next";
import type { FileUploadProps } from "../src/components/FileUpload/FileUpload.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<FileUploadProps> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: {
    label: "Upload your document",
    theme: "primary",
    required: false,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the file upload input.",
      table: { category: "General" },
    },
    description: {
      control: "text",
      description: "Short helper text or instructions below the label.",
      table: { category: "General" },
    },
    error: {
      control: "text",
      description: "Error message displayed below the input.",
      table: { category: "General" },
    },
    required: {
      control: "boolean",
      description: "Marks the field as required.",
      table: { category: "General" },
    },
    disabled: {
      control: "boolean",
      description: "Disables the file input.",
      table: { category: "General" },
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple files to be selected.",
      table: { category: "General" },
    },
    allowedFileTypes: {
      control: false,
      description:
        "List of allowed file MIME types (e.g. ['image/png', 'application/pdf']).",
      table: { category: "Validation" },
    },
    maxFileSizeBytes: {
      control: "number",
      description: "Maximum allowed file size in bytes. Default: Infinity.",
      table: { category: "Validation" },
    },
    theme: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color for the input.",
      table: { category: "Appearance" },
    },
    state: {
      control: "select",
      options: ["", "success", "error", "warning"],
      description: "State variant for status feedback.",
      table: { category: "Appearance" },
    },
    outline: {
      control: "boolean",
      description: "Display the control in outlined style.",
      table: { category: "Appearance" },
    },
    outlineRounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the outlined box.",
      table: { category: "Appearance" },
    },
    outlineShadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow for the outlined box.",
      table: { category: "Appearance" },
    },
    controlRounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the upload button.",
      table: { category: "Appearance" },
    },
    controlShadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow for the upload button.",
      table: { category: "Appearance" },
    },
    uploadProgress: {
      control: "number",
      description:
        "Current upload progress percentage (0–100) if externally controlled.",
      table: { category: "Status" },
    },
    onSubmit: {
      action: "submit",
      description: "Callback fired when the user confirms file upload.",
      table: { category: "Events" },
    },
    "data-testid": {
      control: "text",
      description: "Test ID for query selectors in testing.",
      table: { category: "Testing" },
    },
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <FileUpload {...args} onSubmit={() => {}} />,
};

export const ThemeVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {themeOptions.map((theme) => (
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

export const StateVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {stateOptions.map((state) => (
        <div key={state}>
          <h4 style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
            {state} state
          </h4>
          <FileUpload
            {...args}
            state={state}
            theme="secondary"
            label={`Upload (${state})`}
            onSubmit={(files) => console.log(`${state}:`, files)}
          />
        </div>
      ))}
    </div>
  ),
};

export const OutlineRoundingVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {roundingOptions.map((rounding) => (
        <div key={rounding}>
          <h4 style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
            {rounding} rounding
          </h4>
          <FileUpload
            {...args}
            outlineRounding={rounding}
            label={`Upload (${rounding})`}
            onSubmit={(files) => console.log(`${rounding}:`, files)}
          />
        </div>
      ))}
    </div>
  ),
};

export const OutlineShadowVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {shadowOptions.map((shadow) => (
        <div key={shadow}>
          <h4 style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
            {shadow} shadow
          </h4>
          <FileUpload
            {...args}
            outlineShadow={shadow}
            label={`Upload (${shadow})`}
            onSubmit={(files) => console.log(`${shadow}:`, files)}
          />
        </div>
      ))}
    </div>
  ),
};
