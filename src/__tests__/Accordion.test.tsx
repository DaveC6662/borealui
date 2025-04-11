import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "../components/Accordion/Accordion";
import React from "react";

describe("Accordion Component", () => {
  it("renders with default props", () => {
    render(<Accordion title="Test Accordion">Content</Accordion>);
    expect(screen.getByTestId("accordion-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-content")).toHaveAttribute("data-state", "collapsed");
  });

  it("expands and collapses in uncontrolled mode", () => {
    render(<Accordion title="Toggle Me">Hello World</Accordion>);

    const button = screen.getByTestId("accordion-toggle");
    const content = screen.getByTestId("accordion-content");

    expect(content).toHaveAttribute("data-state", "collapsed");

    fireEvent.click(button);
    expect(content).toHaveAttribute("data-state", "open");

    fireEvent.click(button);
    expect(content).toHaveAttribute("data-state", "collapsed");
  });

  it("respects initiallyExpanded prop", () => {
    render(<Accordion title="Initially Open" initiallyExpanded>Visible content</Accordion>);
    expect(screen.getByTestId("accordion-content")).toHaveAttribute("data-state", "open");
  });

  it("respects controlled mode (expanded=true)", () => {
    render(
      <Accordion title="Controlled" expanded>
        Controlled content
      </Accordion>
    );
    expect(screen.getByTestId("accordion-content")).toHaveAttribute("data-state", "open");
  });

  it("respects controlled mode (expanded=false)", () => {
    render(
      <Accordion title="Controlled" expanded={false}>
        Controlled content
      </Accordion>
    );
    expect(screen.getByTestId("accordion-content")).toHaveAttribute("data-state", "collapsed");
  });

  it("fires onToggle in controlled mode", () => {
    const handleToggle = jest.fn();
    render(
      <Accordion title="Controlled" expanded={false} onToggle={handleToggle}>
        Controlled content
      </Accordion>
    );

    fireEvent.click(screen.getByTestId("accordion-toggle"));
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    render(
      <Accordion title="Disabled" disabled>
        You shouldn&apos;t see this
      </Accordion>
    );

    const button = screen.getByTestId("accordion-toggle");
    const content = screen.getByTestId("accordion-content");

    expect(content).toHaveAttribute("data-state", "collapsed");

    fireEvent.click(button);
    expect(content).toHaveAttribute("data-state", "collapsed"); // Should not toggle
  });

  it("applies the outline class", () => {
    const { container } = render(
      <Accordion title="Outline Test" outline>
        Outline content
      </Accordion>
    );

    expect(container.firstChild).toHaveClass("outline");
  });

  it("applies size and theme classes", () => {
    const { container } = render(
      <Accordion title="Styled" size="large" theme="success">
        Themed content
      </Accordion>
    );

    expect(container.firstChild).toHaveClass("large");
    expect(container.firstChild).toHaveClass("success");
  });

  it("sets appropriate ARIA attributes", () => {
    render(<Accordion title="Accessible Accordion">A11y</Accordion>);

    const button = screen.getByTestId("accordion-toggle");
    const content = screen.getByTestId("accordion-content");

    const controlsId = button.getAttribute("aria-controls");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("id", controlsId);
    expect(content).toHaveAttribute("role", "region");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("supports custom icons", () => {
    const CustomExpandedIcon = () => <span data-testid="expanded-icon">▲</span>;
    const CustomCollapsedIcon = () => <span data-testid="collapsed-icon">▼</span>;

    render(
      <Accordion
        title="Icon Accordion"
        customExpandedIcon={<CustomExpandedIcon />}
        customCollapsedIcon={<CustomCollapsedIcon />}
      >
        Icon Content
      </Accordion>
    );

    expect(screen.getByTestId("collapsed-icon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("accordion-toggle"));
    expect(screen.getByTestId("expanded-icon")).toBeInTheDocument();
  });

  it("supports keyboard interaction (Enter & Space)", () => {
    render(<Accordion title="Keyboard Accessible">Key Content</Accordion>);

    const button = screen.getByTestId("accordion-toggle");
    const content = screen.getByTestId("accordion-content");

    expect(content).toHaveAttribute("data-state", "collapsed");

    fireEvent.keyDown(button, { key: "Enter" });
    expect(content).toHaveAttribute("data-state", "open");

    fireEvent.keyDown(button, { key: " " });
    expect(content).toHaveAttribute("data-state", "collapsed");
  });
});
