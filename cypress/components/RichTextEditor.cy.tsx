import BaseRichTextEditor from "@/components/RichTextEditor/RichTextEditorBase";

const mockClassNames = {
  container: "editorContainer",
  toolbar: "editorToolbar",
  select: "editorSelect",
  editor: "editorContent",
};

const mockButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const mockSelect = ({ options, value, onChange, ...props }: any) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
    {options.map((opt: any) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

describe("RichTextEditor", () => {
  it("renders and accepts typing", () => {
    cy.mount(
      <BaseRichTextEditor
        initialContent="<p>Hello Cypress</p>"
        onChange={cy.stub().as("onChange")}
        Button={mockButton}
        Select={mockSelect}
        classNames={mockClassNames}
      />
    );

    cy.get(".editorContent").click().type(" More text");
    cy.get(".editorContent").contains("Hello Cypress More text");
  });

  it("can change heading style", () => {
    cy.mount(
      <BaseRichTextEditor
        initialContent="<p>Text</p>"
        onChange={cy.stub().as("onChange")}
        Button={mockButton}
        Select={mockSelect}
        classNames={mockClassNames}
      />
    );

    cy.get("select").select("Heading 2").should("have.value", "h2");
  });
});
