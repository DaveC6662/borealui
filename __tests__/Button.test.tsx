import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ButtonBase from "../src/components/Button/ButtonBase";
import { FaStar } from "react-icons/fa";

expect.extend(toHaveNoViolations);

const classMap = {
  button: "btn",
  primary: "btn-primary",
  outline: "btn-outline",
  small: "btn-sm",
  medium: "btn-md",
  large: "btn-lg",
  fullWidth: "btn-full",
  disabled: "btn-disabled",
  link: "btn-link",
  buttonIcon: "btn-icon",
  buttonLabel: "btn-label",
  loader: "btn-loader",
  icon: "icon-style",
};

describe("ButtonBase", () => {
  it("renders button with icon and text", () => {
    render(
      <ButtonBase
        icon={FaStar}
        classMap={classMap}
        ariaLabel="Favorite"
        data-testid="button-test"
      >
        Click me
      </ButtonBase>
    );

    const button = screen.getByRole("button", { name: "Favorite" });
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId("button-test-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(
      <ButtonBase
        onClick={handleClick}
        classMap={classMap}
        data-testid="clickable"
      >
        Click
      </ButtonBase>
    );

    fireEvent.click(screen.getByTestId("clickable"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("respects disabled state", () => {
    const handleClick = jest.fn();
    render(
      <ButtonBase
        classMap={classMap}
        disabled
        onClick={handleClick}
        data-testid="disabled-btn"
      >
        Disabled
      </ButtonBase>
    );

    const button = screen.getByTestId("disabled-btn");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders loading spinner when loading is true", () => {
    render(
      <ButtonBase classMap={classMap} loading data-testid="button-load">
        Loading
      </ButtonBase>
    );

    const loadingContainer = screen.getByTestId("button-load-loading");
    expect(loadingContainer).toBeInTheDocument();
    expect(
      loadingContainer.querySelector(`.${classMap.loader}`)
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ButtonBase
        icon={FaStar}
        classMap={classMap}
        ariaLabel="Favorite"
        data-testid="button-axe"
      >
        Accessible Button
      </ButtonBase>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
