import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FileUpload } from "@/index.next";

describe("FileUpload", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders with default label", () => {
    render(<FileUpload onSubmit={mockSubmit} />);
    expect(screen.getByText("Choose File")).toBeInTheDocument();
  });

  it("displays file name when selected", () => {
    render(<FileUpload onSubmit={mockSubmit} />);
    const input = screen.getByLabelText("Upload File") as HTMLInputElement;
    const file = new File(["dummy content"], "test.pdf", { type: "application/pdf" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("test.pdf")).toBeInTheDocument();
  });

  it("calls onSubmit after upload completes", async () => {
    render(<FileUpload onSubmit={mockSubmit} data-testid="file-upload"/>);
    const input = screen.getByLabelText("Upload File") as HTMLInputElement;
    const file = new File(["dummy content"], "upload.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [file] } });

    const uploadButton = screen.getByTestId("file-upload-upload-button");
    await act(async () => {
      fireEvent.click(uploadButton);
    });

    for (let i = 0; i <= 10; i++) {
      await act(() => {
        jest.advanceTimersByTime(100);
        return Promise.resolve();
      });
    }

    await act(() => {
      jest.advanceTimersByTime(500); // wait for onSubmit delay
      return Promise.resolve();
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const submittedFiles = mockSubmit.mock.calls[0][0];
    expect(submittedFiles[0].name).toBe("upload.txt");
  });
});
