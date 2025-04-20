import TagInputBase from "@/components/TagInput/TagInputBase";

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

const MockTextInput = (props: any) => (
  <input {...props} data-testid="text-input" />
);

const MockIconButton = ({ onClick, ...rest }: any) => (
  <button onClick={onClick} {...rest}>
    ×
  </button>
);

describe("TagInputBase Component", () => {
  it("adds and removes tags", () => {
    const onChange = cy.stub().as("onChange");

    cy.mount(
      <TagInputBase
        styles={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        combineClassNames={(...classes) => classes.join(" ")}
        onChange={onChange}
      />
    );

    cy.findByTestId("text-input").type("Vue{enter}");
    cy.findByText("Vue").should("exist");
    cy.get("@onChange").should("have.been.calledWith", ["Vue"]);

    cy.findByRole("button", { name: /remove tag vue/i }).click();
    cy.get("@onChange").should("have.been.calledWith", []);
  });

  it("displays screen reader label and description", () => {
    cy.mount(
      <TagInputBase
        styles={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        combineClassNames={(...classes) => classes.join(" ")}
        ariaDescription="Enter tags for your topic"
      />
    );

    cy.findByTestId("text-input").should("have.attr", "aria-describedby");
    cy.findByTestId("tag-input-description").should(
      "contain.text",
      "Enter tags"
    );
  });

  it("renders correctly on mobile view", () => {
    cy.viewport("iphone-6");

    cy.mount(
      <TagInputBase
        styles={mockStyles}
        TextInput={MockTextInput}
        IconButton={MockIconButton}
        combineClassNames={(...classes) => classes.join(" ")}
      />
    );

    cy.findByTestId("text-input").should("exist");
  });
});
