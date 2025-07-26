import { render, screen, fireEvent } from "@testing-library/react";
import BasePopover from "@/components/PopOver/PopOverBase";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const classNames = {
  container: "popoverContainer",
  trigger: "popoverTrigger",
  popover: "popoverContent",
  bottom: "placementBottom",
  primary: "themePrimary",
};

describe("BasePopover", () => {
  it("toggles popover on click", () => {
    render(
      <BasePopover
        trigger={<span>Open Popover</span>}
        content={<div>Popover Content</div>}
        classMap={classNames}
        data-testid="popover"
      />
    );

    const trigger = screen.getByTestId("popover-trigger");

    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    render(
      <BasePopover
        trigger={<span>Toggle</span>}
        content={<div>More info</div>}
        classMap={classNames}
        data-testid="popover"
      />
    );

    fireEvent.click(screen.getByTestId("popover-trigger")); // open
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("toggles with Enter and Space keys", () => {
    render(
      <BasePopover
        trigger={<span>Open</span>}
        content={<div>Text</div>}
        classMap={classNames}
        data-testid="popover"
      />
    );

    const trigger = screen.getByTestId("popover-trigger");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: " " });
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <BasePopover
        trigger={<span>Open Popover</span>}
        content={<div>Popover Content</div>}
        classMap={classNames}
        data-testid="popover"
      />
    );

    fireEvent.click(screen.getByTestId("popover-trigger"));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
