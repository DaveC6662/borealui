// __tests__/BaseSelect.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import BaseSelect from "@/components/Select/SelectBase";

const classNames = {
  main: "main",
  select: "select",
  icon: "icon",
  primary: "themePrimary",
  disabled: "disabled",
};

describe("BaseSelect", () => {
  const defaultProps = {
    value: "",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
    onChange: jest.fn(),
    classNames,
    "data-testid": "select",
  };

  it("renders and allows selecting an option", () => {
    render(<BaseSelect {...defaultProps} classMap={classNames} />);

    const select = screen.getByTestId("select-input");
    fireEvent.change(select, { target: { value: "banana" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("banana");
  });

  it("displays the correct placeholder", () => {
    render(
      <BaseSelect
        {...defaultProps}
        placeholder="Choose fruit"
        classMap={classNames}
      />
    );
    const option = screen.getByText("Choose fruit") as HTMLOptionElement;
    expect(option.disabled).toBe(true);
  });

  it("supports accessibility attributes", () => {
    render(
      <BaseSelect
        {...defaultProps}
        ariaLabel="Fruit select"
        ariaDescription="Select your favorite fruit"
        classMap={classNames}
      />
    );

    const select = screen.getByTestId("select-input");
    const desc = screen.getByTestId("select-description");

    expect(select).toHaveAttribute("aria-label", "Fruit select");
    expect(select).toHaveAttribute("aria-describedby", desc.id);
    expect(desc).toHaveTextContent("Select your favorite fruit");
  });

  it("is accessible according to axe", async () => {
    const { container } = render(
      <BaseSelect {...defaultProps} classMap={classNames} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
