import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import TagInputBase from "@/components/TagInput/TagInputBase";

expect.extend(toHaveNoViolations);

const mockStyles = {
  tagInput: "tagInput",
  tagContainer: "tagContainer",
  tag: "tag",
  tagLabel: "tagLabel",
  inputWrapper: "inputWrapper",
  input: "input",
  removeButton: "removeButton",
  srOnly: "srOnly",
  primary: "primary",
  medium: "medium",
};

const MockTextInput = ({ value, onChange, onKeyDown, ...rest }: any) => (
  <input
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    data-testid="tag-input-input"
    {...rest}
  />
);

const MockIconButton = ({ onClick, ...rest }: any) => (
  <button onClick={onClick} {...rest}>
    ×
  </button>
);

describe("TagInputBase", () => {
  it("renders input and adds a tag", () => {
    const handleChange = jest.fn();

    render(
      <TagInputBase
        classMap={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        onChange={handleChange}
      />
    );

    const input = screen.getByTestId("tag-input-input");
    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(["React"]);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("removes a tag", () => {
    const handleChange = jest.fn();

    render(
      <TagInputBase
        classMap={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        tags={["JS"]}
        onChange={handleChange}
      />
    );

    const removeBtn = screen.getByRole("button", { name: /remove tag js/i });
    fireEvent.click(removeBtn);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <TagInputBase
        classMap={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        ariaDescription="Accessible tag input"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
