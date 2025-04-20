import TextAreaBase from "@/components/TextArea/TextAreaBase";
import { FaCommentDots } from "react-icons/fa";

const mockStyles = {
  textArea: "textArea",
  textInput: "textInput",
  iconContainer: "iconContainer",
  customResizeHandle: "customResizeHandle",
  srOnly: "srOnly",
  disabled: "disabled",
};

describe("TextAreaBase Component", () => {
  it("renders and allows typing", () => {
    cy.mount(
      <TextAreaBase
        styles={mockStyles}
        placeholder="Enter feedback"
        ariaLabel="Feedback box"
      />
    );

    cy.findByPlaceholderText("Enter feedback").type("Great UI!");
    cy.findByPlaceholderText("Enter feedback").should(
      "have.value",
      "Great UI!"
    );
  });

  it("renders with an icon", () => {
    cy.mount(
      <TextAreaBase
        styles={mockStyles}
        placeholder="Write a message"
        icon={FaCommentDots}
      />
    );

    cy.findByTestId("text-area-icon").should("exist");
  });

  it("shows a screen reader-only description", () => {
    cy.mount(
      <TextAreaBase
        styles={mockStyles}
        placeholder="Tell us more"
        ariaDescription="Explain your feedback in detail"
      />
    );

    cy.findByTestId("text-area-description")
      .should("exist")
      .and("have.text", "Explain your feedback in detail");

    cy.get("textarea").should("have.attr", "aria-describedby");
  });

  it("works in mobile view", () => {
    cy.viewport("iphone-6");
    cy.mount(
      <TextAreaBase
        styles={mockStyles}
        placeholder="Mobile input"
        ariaLabel="Mobile input field"
      />
    );

    cy.findByPlaceholderText("Mobile input").should("exist");
  });

  it("is disabled when specified", () => {
    cy.mount(
      <TextAreaBase styles={mockStyles} placeholder="Disabled input" disabled />
    );

    cy.findByPlaceholderText("Disabled input").should("be.disabled");
  });
});
