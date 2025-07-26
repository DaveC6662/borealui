import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { FaCommentDots } from "react-icons/fa";
import TextAreaBase from "@/components/TextArea/TextAreaBase";

expect.extend(toHaveNoViolations);

const mockStyles = {
  textArea: "textArea",
  textInput: "textInput",
  iconContainer: "iconContainer",
  customResizeHandle: "customResizeHandle",
  srOnly: "srOnly",
  disabled: "disabled",
};

describe("TextAreaBase", () => {
  it("renders a basic textarea", () => {
    render(
      <TextAreaBase
        classMap={mockStyles}
        placeholder="Type your message"
        ariaLabel="Message input"
      />
    );

    expect(
      screen.getByPlaceholderText("Type your message")
    ).toBeInTheDocument();
  });

  it("renders with an icon", () => {
    render(
      <TextAreaBase
        classMap={mockStyles}
        placeholder="Comment"
        icon={FaCommentDots}
      />
    );

    expect(screen.getByTestId("text-area-icon")).toBeInTheDocument();
  });

  it("includes an accessible description", () => {
    render(
      <TextAreaBase
        classMap={mockStyles}
        placeholder="Describe yourself"
        ariaDescription="Please describe your skills and experience"
      />
    );

    const input = screen.getByPlaceholderText("Describe yourself");
    const desc = screen.getByTestId("text-area-description");

    expect(desc).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-describedby", desc.id);
  });

  it("is accessible with axe", async () => {
    const { container } = render(
      <TextAreaBase
        classMap={mockStyles}
        placeholder="Write something"
        ariaLabel="Text area field"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
