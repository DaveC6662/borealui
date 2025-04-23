import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "jest-axe";
import BaseRichTextEditor from "@/components/RichTextEditor/RichTextEditorBase";

const mockClassNames = {
  container: "editorContainer",
  toolbar: "editorToolbar",
  select: "editorSelect",
  editor: "tiptap",
};

const mockButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const mockSelect = ({ options, value, onChange, ariaLabel, ...props }: any) => (
  <>
    <label htmlFor="heading-select" className="sr-only">
      {ariaLabel}
    </label>
    <select
      id="heading-select"
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid="heading-select"
      {...props}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </>
);

describe("BaseRichTextEditor", () => {
  it("renders editor with initial content", async () => {
    let container: HTMLElement;

    await act(async () => {
      const result = render(
        <BaseRichTextEditor
          initialContent="<p>Accessible test</p>"
          onChange={jest.fn()}
          Button={mockButton}
          Select={mockSelect}
          classNames={mockClassNames}
          data-testid="editor"
        />
      );
      container = result.container;
    });

    expect(screen.getByTestId("editor")).toBeInTheDocument();
    expect(screen.getByTestId("heading-select")).toBeInTheDocument();
  });

  it("allows heading change", async () => {
    await act(async () => {
      render(
        <BaseRichTextEditor
          initialContent="<p>Hello</p>"
          onChange={jest.fn()}
          Button={mockButton}
          Select={mockSelect}
          classNames={mockClassNames}
        />
      );
    });

    const select = screen.getByTestId("heading-select");
    fireEvent.change(select, { target: { value: "h2" } });
    expect(select).toHaveValue("h2");
  });

  it("is accessible", async () => {
    let container: HTMLElement;

    await act(async () => {
      const result = render(
        <BaseRichTextEditor
          initialContent="<p>Accessible test</p>"
          onChange={jest.fn()}
          Button={mockButton}
          Select={mockSelect}
          classNames={mockClassNames}
        />
      );
      container = result.container;
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
