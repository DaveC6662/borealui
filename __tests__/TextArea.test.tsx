import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TextArea } from "@/index.next";
import { FaCommentDots } from "react-icons/fa";

describe("TextArea", () => {
  it("renders with placeholder text", () => {
    render(<TextArea placeholder="Write something..." />);
    const textarea = screen.getByPlaceholderText("Write something...");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with an icon", () => {
    render(<TextArea icon={FaCommentDots} />);
    expect(screen.getByLabelText("textarea icon")).toBeInTheDocument();
  });

  it("updates value on change", () => {
    render(<TextArea value="hello" onChange={() => {}} />);
    const textarea = screen.getByDisplayValue("hello");
    expect(textarea).toBeInTheDocument();
  });

  it("applies custom height", () => {
    render(<TextArea height="150px" data-testid="custom-height-textarea" />);
    const textarea = screen.getByTestId("custom-height-textarea-input");
    expect(textarea).toHaveStyle("height: 150px");
  });

  it("applies disabled state", () => {
    render(<TextArea disabled value="Can't type" />);
    const textarea = screen.getByDisplayValue("Can't type");
    expect(textarea).toBeDisabled();
  });

  it("applies aria-label and aria-describedby", () => {
    render(
      <TextArea
        ariaLabel="custom label"
        ariaDescription="custom description"
        placeholder="Write here"
      />
    );
    const textarea = screen.getByLabelText("custom label");
    const description = screen.getByText("custom description");
    expect(textarea).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
