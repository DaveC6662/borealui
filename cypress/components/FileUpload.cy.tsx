import BaseFileUpload from "@/components/FileUpload/FileUploadBase";

const DummyFormGroup = ({
  children,
  label,
  description,
  error,
  ...props
}: any) => (
  <div {...props}>
    <label>{label}</label>
    {description && <p id="file-upload-description">{description}</p>}
    {error && (
      <p id="file-upload-error" role="alert">
        {error}
      </p>
    )}
    {children}
  </div>
);

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props}>{Icon && <Icon aria-hidden="true" />}</button>
);

const DummyProgressBar = ({ progress, indeterminate, ...props }: any) => (
  <div
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={indeterminate ? undefined : progress}
    {...props}
  >
    {indeterminate ? "Loading..." : `${progress}%`}
  </div>
);

const classNames = {
  wrapper: "uploadWrapper",
  hiddenInput: "hiddenInput",
  uploadActions: "uploadActions",
  fileInput: "fileInput",
  removeButton: "removeButton",
  uploadControls: "uploadControls",
  uploadProgress: "uploadProgress",
  uploadButton: "uploadButton",
};

describe("BaseFileUpload", () => {
  it("renders accessible file upload UI", () => {
    cy.mount(
      <BaseFileUpload
        label="Upload your file"
        description="Supported formats: PDF, DOCX"
        error="This field is required"
        required
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        classNames={classNames}
        data-testid="file-upload"
        onSubmit={() => {}}
      />
    );

    cy.findByLabelText("Upload your file")
      .should("have.attr", "type", "file")
      .and("have.attr", "aria-required", "true");

    cy.findByRole("alert").should("contain.text", "This field is required");
  });

  it("allows file selection and shows upload controls", () => {
    cy.mount(
      <BaseFileUpload
        label="Upload"
        FormGroup={DummyFormGroup}
        Button={DummyButton}
        IconButton={DummyIconButton}
        ProgressBar={DummyProgressBar}
        classNames={classNames}
        data-testid="file-upload"
        onSubmit={() => {}}
      />
    );

    cy.get('[data-testid="file-upload-input"]').selectFile(
      {
        contents: "cypress/fixtures/sample.pdf",
        fileName: "sample.pdf",
        mimeType: "application/pdf",
      },
      { force: true }
    );

    cy.findByTestId("file-upload-upload-button").should("exist");
    cy.findByTestId("file-upload-remove-button").should("exist");
    cy.findByRole("progressbar").should("exist");
  });
});
