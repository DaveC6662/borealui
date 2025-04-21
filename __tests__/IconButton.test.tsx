import { render, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import IconButtonBase from "@/components/Buttons/IconButton/IconButtonBase";

const mockClassMap = {
  iconButton: "iconButton",
  primary: "primary",
  outline: "outline",
  disabled: "disabled",
  medium: "medium",
  buttonLabel: "buttonLabel",
  loader: "loader",
};

const DummyIcon = () => <svg role="img" aria-label="icon" />;

describe("IconButtonBase", () => {
  it("renders with default ARIA label", () => {
    const { getByRole } = render(
      <IconButtonBase icon={DummyIcon} classMap={mockClassMap} />
    );
    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Icon button");
  });

  it("uses custom ariaLabel if provided", () => {
    const { getByLabelText } = render(
      <IconButtonBase
        icon={DummyIcon}
        classMap={mockClassMap}
        ariaLabel="custom label"
      />
    );
    expect(getByLabelText("custom label")).toBeInTheDocument();
  });

  it("handles click and keyboard events", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IconButtonBase
        icon={DummyIcon}
        classMap={mockClassMap}
        onClick={onClick}
      />
    );

    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();

    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyDown(button, { key: " " });
    // Two additional simulated clicks from keyboard
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("calls custom onKeyDown handler", () => {
    const onKeyDown = jest.fn();
    const { getByRole } = render(
      <IconButtonBase
        icon={DummyIcon}
        classMap={mockClassMap}
        onKeyDown={onKeyDown}
      />
    );

    const button = getByRole("button");
    fireEvent.keyDown(button, { key: "ArrowDown" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("is accessible according to axe", async () => {
    const { container } = render(
      <IconButtonBase
        icon={DummyIcon}
        classMap={mockClassMap}
        ariaLabel="test icon"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
