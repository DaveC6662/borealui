/// <reference types="cypress" />
import { AccordionBase } from "@/components/Accordion/AccordionBase";

const styles = {
  accordion: "accordion",
  accordionHeader: "accordionHeader",
  accordionTitle: "accordionTitle",
  accordionIcon: "accordionIcon",
  accordionContent: "accordionContent",
  expanded: "expanded",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  disabled: "disabled",
};

const getUniqueId = () => "cypress-id";

describe("AccordionBase (Cypress)", () => {
  it("toggles content on click", () => {
    cy.mount(
      <AccordionBase
        title="Toggle Accordion"
        getUniqueId={getUniqueId}
        styles={styles}
      >
        <div>Accordion content</div>
      </AccordionBase>
    );

    cy.findByTestId("accordion-content").should(
      "have.attr",
      "data-state",
      "collapsed"
    );
    cy.findByTestId("accordion-toggle").click();
    cy.findByTestId("accordion-content").should(
      "have.attr",
      "data-state",
      "open"
    );
  });

  it("does not toggle when disabled", () => {
    cy.mount(
      <AccordionBase
        title="Disabled Accordion"
        disabled
        getUniqueId={() => "cypress-id"}
        styles={styles}
      >
        <p>Content should stay hidden</p>
      </AccordionBase>
    );

    // Ensure the button is disabled
    cy.findByTestId("accordion-toggle").should("be.disabled");

    // Ensure the accordion content is still collapsed
    cy.findByTestId("accordion-content").should(
      "have.attr",
      "data-state",
      "collapsed"
    );

    // Optionally assert it does not respond to click
    cy.findByTestId("accordion-toggle").click({ force: true }); // Force click, even though disabled
    cy.findByTestId("accordion-content").should(
      "have.attr",
      "data-state",
      "collapsed"
    );
  });
});
