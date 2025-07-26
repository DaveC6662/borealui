// BaseFileUpload.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseFileUpload from "@/components/FileUpload/FileUploadBase";
import { FaTrash, FaFile } from "react-icons/fa";

// Extend Jest with accessibility matcher
expect.extend(toHaveNoViolations);

// Dummy Components
const DummyFormGroup = ({ children, label, "data-testid": testId }: any) => (
  <div data-testid={testId}>
    <label>{label}</label>
    {children}
  </div>
);

const DummyButton = ({ children, onClick, ...props }: any) => (
  <button onClick={onClick} {...props}>
    {children}
  </button>
);

const DummyIconButton = ({ "aria-label": label, onClick, ...props }: any) => (
  <button aria-label={label} onClick={onClick} {...props}>
    <FaTrash />
  </button>
);

const DummyProgressBar = ({ progress }: any) => (
  <div data-testid="progress-bar">{progress}%</div>
);

const classMap = {
  fileUpload: "fileUpload",
  uploadActions: "uploadActions",
  fileInput: "fileInput",
  hiddenInput: "hiddenInput",
  fileList: "fileList",
  fileListItem: "fileListItem",
  removeButton: "removeButton",
  uploadButton: "uploadButton",
  rejectedFiles: "rejectedFiles",
  rejectedLabel: "rejectedLabel",
  rejectedList: "rejectedList",
  rejectedItem: "rejectedItem",
  rejectedReason: "rejectedReason",
  uploadControls: "uploadControls",
  uploadProgress: "uploadProgress",
  error: "error",
  disabled: "disabled",
  roundMedium: "roundMedium",
  shadowLight: "shadowLight",
  primary: "primary",
};

describe("BaseFileUpload", () => {
  it("renders with label and input", () => {
    render(
      <BaseFileUpload
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        classMap={classMap}
        onSubmit={jest.fn()}
        data-testid="upload"
        label="Upload a file"
      />
    );

    expect(screen.getByText("Upload a file")).toBeInTheDocument();
    expect(screen.getByTestId("upload-input")).toBeInTheDocument();
  });

  it("handles file selection and displays file name", () => {
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });

    render(
      <BaseFileUpload
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        classMap={classMap}
        onSubmit={jest.fn()}
        data-testid="upload"
      />
    );

    const input = screen.getByTestId("upload-input") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("hello.txt")).toBeInTheDocument();
  });

  it("rejects invalid files and displays reason", () => {
    const file = new File(["bad"], "bad.exe", {
      type: "application/x-msdownload",
    });

    render(
      <BaseFileUpload
        allowedFileTypes={["image/png"]}
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        onSubmit={jest.fn()}
        classMap={classMap}
        data-testid="upload"
      />
    );

    const input = screen.getByTestId("upload-input") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("bad.exe")).toBeInTheDocument();
    expect(screen.getByText(/Invalid type/)).toBeInTheDocument();
  });

  it("removes file on trash button click", () => {
    const file = new File(["good"], "good.txt", { type: "text/plain" });

    render(
      <BaseFileUpload
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        onSubmit={jest.fn()}
        classMap={classMap}
        data-testid="upload"
      />
    );

    const input = screen.getByTestId("upload-input") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("good.txt")).toBeInTheDocument();
    const removeBtn = screen.getByLabelText("Remove good.txt");
    fireEvent.click(removeBtn);

    expect(screen.queryByText("good.txt")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseFileUpload
        label="Upload"
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        onSubmit={jest.fn()}
        classMap={classMap}
        data-testid="upload"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
