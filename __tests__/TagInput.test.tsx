import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import TagInputBase from "@/components/TagInput/TagInputBase";

// Mock styles
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

// Mock TextInput and IconButton
const MockTextInput = ({ value, onChange, onKeyDown, ...rest }: any) => (
  <input
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    {...rest}
    data-testid="text-input"
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
        styles={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        combineClassNames={(...classes) => classes.join(" ")}
        onChange={handleChange}
      />
    );

    const input = screen.getByTestId("text-input");
    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(["React"]);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("removes a tag", () => {
    const handleChange = jest.fn();

    render(
      <TagInputBase
        styles={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        combineClassNames={(...classes) => classes.join(" ")}
        tags={["JS"]}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /remove tag js/i }));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("is accessible", async () => {
    const { container } = render(
      <TagInputBase
        styles={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        combineClassNames={(...classes) => classes.join(" ")}
        ariaDescription="Test tag input accessibility"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
