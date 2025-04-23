import { render, screen, fireEvent } from "@testing-library/react";
import BasePopover from "@/components/PopOver/PopOverBase";

const classNames = {
  container: "popoverContainer",
  trigger: "popoverTrigger",
  popover: "popoverContent",
  placementMap: {
    bottom: "placementBottom",
  },
  themeMap: {
    primary: "themePrimary",
  },
};

describe("BasePopover", () => {
  it("toggles popover on click", () => {
    render(
      <BasePopover
        trigger={<span>Open Popover</span>}
        content={<div>Popover Content</div>}
        classNames={classNames}
        data-testid="popover"
      />
    );

    const trigger = screen.getByTestId("popover-trigger");

    // Initially, content should not be visible
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(trigger);
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();

    // Click again to close
    fireEvent.click(trigger);
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    render(
      <BasePopover
        trigger={<span>Toggle</span>}
        content={<div>More info</div>}
        classNames={classNames}
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
        classNames={classNames}
        data-testid="popover"
      />
    );

    const trigger = screen.getByTestId("popover-trigger");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: " " });
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });
});
