import TextInputBase from "@/components/TextInput/TextInputBase";
import { FaUser } from "react-icons/fa";

const mockStyles = {
  textBoxContainer: "textBoxContainer",
  textInput: "textInput",
  iconContainer: "iconContainer",
  togglePassword: "togglePassword",
  srOnly: "srOnly",
  primary: "primary",
  disabled: "disabled",
};

describe("TextInputBase Component", () => {
  it("renders and accepts text input", () => {
    cy.mount(
      <TextInputBase
        styles={mockStyles}
        placeholder="Your name"
        ariaLabel="Name input"
        icon={FaUser}
      />
    );

    cy.findByPlaceholderText("Your name").type("John");
    cy.findByPlaceholderText("Your name").should("have.value", "John");
    cy.findByTestId("text-input-icon").should("exist");
  });

  it("toggles password visibility", () => {
    cy.mount(
      <TextInputBase
        styles={mockStyles}
        password
        placeholder="Password"
        ariaLabel="Password input"
      />
    );

    cy.get("input").should("have.attr", "type", "password");
    cy.findByTestId("text-input-password-toggle").click();
    cy.get("input").should("have.attr", "type", "text");
    cy.findByTestId("text-input-password-toggle").click();
    cy.get("input").should("have.attr", "type", "password");
  });

  it("works in mobile view", () => {
    cy.viewport("iphone-6");
    cy.mount(
      <TextInputBase
        styles={mockStyles}
        placeholder="Mobile input"
        ariaLabel="Mobile field"
      />
    );

    cy.findByPlaceholderText("Mobile input").should("exist");
  });

  it("is disabled when passed", () => {
    cy.mount(
      <TextInputBase
        styles={mockStyles}
        placeholder="Disabled input"
        disabled
      />
    );

    cy.findByPlaceholderText("Disabled input").should("be.disabled");
  });
});
