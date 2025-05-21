import { render, screen, fireEvent } from "@testing-library/react";
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

describe("AccordionBase (Jest)", () => {
  const getUniqueId = () => "unique-id";

  it("renders with title and toggles content visibility", () => {
    render(
      <AccordionBase
        title="Test Accordion"
        getUniqueId={getUniqueId}
        classMap={styles}
      >
        <div>Accordion content</div>
      </AccordionBase>
    );

    expect(screen.getByText("Test Accordion")).toBeInTheDocument();
    const content = screen.getByTestId("accordion-content");
    expect(content).toHaveAttribute("data-state", "collapsed");

    fireEvent.click(screen.getByTestId("accordion-toggle"));
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("respects disabled state", () => {
    render(
      <AccordionBase
        title="Disabled Accordion"
        disabled
        getUniqueId={getUniqueId}
        classMap={styles}
      >
        <div>Content</div>
      </AccordionBase>
    );

    fireEvent.click(screen.getByTestId("accordion-toggle"));
    expect(screen.getByTestId("accordion-content")).toHaveAttribute(
      "data-state",
      "collapsed"
    );
  });
});
