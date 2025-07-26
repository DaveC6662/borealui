import { render, screen, fireEvent, act } from "@testing-library/react";
import { AccordionBase } from "@/components/Accordion/AccordionBase";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const styles = {
  accordion: "accordion",
  header: "accordionHeader",
  content: "accordionContent",
  icon: "accordionIcon",
  accordionTitle: "accordionTitle",
  expanded: "expanded",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  disabled: "disabled",
  loading: "loading",
};

describe("AccordionBase (Jest)", () => {
  const getUniqueId = () => "unique-id";

  it("renders with title and toggles content visibility (uncontrolled)", () => {
    render(
      <AccordionBase
        title="Test Accordion"
        getUniqueId={getUniqueId}
        classMap={styles}
        data-testid="test"
      >
        <div>Accordion content</div>
      </AccordionBase>
    );

    const toggle = screen.getByTestId("test-accordion-toggle");
    const content = screen.getByTestId("test-content");

    expect(screen.getByText("Test Accordion")).toBeInTheDocument();
    expect(content).toHaveAttribute("data-state", "collapsed");

    fireEvent.click(toggle);
    expect(content).toHaveAttribute("data-state", "open");

    fireEvent.click(toggle);
    expect(content).toHaveAttribute("data-state", "collapsed");
  });

  it("respects disabled state", () => {
    render(
      <AccordionBase
        title="Disabled Accordion"
        disabled
        getUniqueId={getUniqueId}
        classMap={styles}
        data-testid="test"
      >
        <div>Content</div>
      </AccordionBase>
    );

    const toggle = screen.getByTestId("test-accordion-toggle");
    fireEvent.click(toggle);

    expect(screen.getByTestId("test-content")).toHaveAttribute(
      "data-state",
      "collapsed"
    );
  });

  it("honors initiallyExpanded prop", () => {
    render(
      <AccordionBase
        title="Initially Expanded"
        initiallyExpanded
        getUniqueId={getUniqueId}
        classMap={styles}
        data-testid="test"
      >
        <div>Initial Content</div>
      </AccordionBase>
    );

    expect(screen.getByTestId("test-content")).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(screen.getByText("Initial Content")).toBeInTheDocument();
  });

  it("triggers onToggle in controlled mode", () => {
    const onToggle = jest.fn();
    render(
      <AccordionBase
        title="Controlled Accordion"
        expanded={false}
        onToggle={onToggle}
        getUniqueId={getUniqueId}
        classMap={styles}
        data-testid="test"
      >
        <div>Controlled Content</div>
      </AccordionBase>
    );

    const toggle = screen.getByTestId("test-accordion-toggle");
    fireEvent.click(toggle);

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("renders asyncContent loader and then content", async () => {
    jest.useFakeTimers();
    render(
      <AccordionBase
        title="Async Accordion"
        initiallyExpanded
        asyncContent
        getUniqueId={getUniqueId}
        classMap={styles}
        data-testid="test"
      >
        <div>Loaded Content</div>
      </AccordionBase>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Loaded Content")).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AccordionBase
        title="Accessible Accordion"
        getUniqueId={getUniqueId}
        classMap={styles}
        data-testid="test"
      >
        <div>Accessible content</div>
      </AccordionBase>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
