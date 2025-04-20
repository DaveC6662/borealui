import Tooltip from "@/components/Tooltip/core/Tooltip";
import Button from "@/components/Buttons/Button/core/Button";
import { ThemeType } from "@/types/types";

describe("Tooltip Component", () => {
  const mountTooltip = ({
    content,
    position = "top",
    theme = "primary",
    label = "Hover me",
  }: {
    content: string;
    position?: "top" | "bottom" | "left" | "right";
    theme?: string;
    label?: string;
  }) => {
    cy.mount(
      <Tooltip content={content} position={position} theme={theme as ThemeType}>
        <Button>{label}</Button>
      </Tooltip>
    );
  };

  describe("basic behavior", () => {
    it("is hidden by default and visible on hover", () => {
      mountTooltip({ content: "This is a tooltip" });

      cy.findByTestId("tooltip").as("tooltip");

      // Initially hidden
      cy.get("@tooltip")
        .should("have.css", "visibility", "hidden")
        .and("have.attr", "aria-hidden", "true");

      // Trigger visibility
      cy.findByRole("button", { name: /hover me/i }).realHover();

      cy.get("@tooltip")
        .should("have.css", "visibility", "visible")
        .and("have.attr", "aria-hidden", "false");
    });

    it("displays the correct tooltip content", () => {
      mountTooltip({
        content: "Tooltip content",
        label: "Info",
        position: "bottom",
        theme: "success",
      });

      cy.findByRole("button", { name: /info/i }).realHover();
      cy.findByTestId("tooltip").should("contain.text", "Tooltip content");
    });
  });

  describe("styles and positioning", () => {
    it("applies correct theme and position classes", () => {
      mountTooltip({
        content: "Styled tooltip",
        label: "Styled",
        position: "left",
        theme: "error",
      });

      cy.findByRole("button", { name: /styled/i }).realHover();

      cy.findByTestId("tooltip")
        .should("have.class", "left")
        .and("have.class", "error");
    });
  });

  describe("Tooltip Component - Mobile Responsiveness", () => {
    beforeEach(() => {
      // Simulate mobile device
      cy.viewport("iphone-6");
    });

    it("renders correctly and shows tooltip on touch-like hover", () => {
      cy.mount(
        <Tooltip content="Mobile tooltip test">
          <button>Tap me</button>
        </Tooltip>
      );

      cy.findByRole("button", { name: /tap me/i }).realHover();

      // Tooltip becomes visible
      cy.findByTestId("tooltip")
        .should("have.css", "visibility", "visible")
        .and("contain.text", "Mobile tooltip test");
    });
  });
});
