import { render, screen, fireEvent } from "@testing-library/react";
import IconButtonBase from "../src/components/IconButton/IconButtonBase";
import { FaTimes } from "react-icons/fa";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const classMap = {
  iconButton: "icon-button",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  disabled: "disabled",
  buttonLabel: "button-label",
  loader: "loader",
};

describe("IconButtonBase", () => {
  it("renders the icon button with label", () => {
    render(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Close"
        classMap={classMap}
        data-testid="icon-button"
      />
    );

    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("icon-button-icon")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Close"
        classMap={classMap}
        onClick={handleClick}
        data-testid="icon-button"
      />
    );

    fireEvent.click(screen.getByTestId("icon-button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("respects disabled state", () => {
    const handleClick = jest.fn();
    render(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Close"
        disabled
        classMap={classMap}
        onClick={handleClick}
        data-testid="icon-button"
      />
    );

    fireEvent.click(screen.getByTestId("icon-button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Close"
        classMap={classMap}
        data-testid="icon-button"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
