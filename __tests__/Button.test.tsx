import { render, screen, fireEvent } from "@testing-library/react";
import ButtonBase from "../src/components/Button/ButtonBase";
import { FaStar } from "react-icons/fa";

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
    expect(
      screen.getByRole("button", { name: "Favorite" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const onClick = jest.fn();
    render(
      <ButtonBase classMap={classMap} onClick={onClick} data-testid="clickable">
        Click
      </ButtonBase>
    );
    fireEvent.click(screen.getByTestId("clickable"));
    expect(onClick).toHaveBeenCalled();
  });

  it("respects disabled state", () => {
    render(
      <ButtonBase classMap={classMap} disabled data-testid="disabled-btn">
        Disabled
      </ButtonBase>
    );
    expect(screen.getByTestId("disabled-btn")).toBeDisabled();
  });
});
