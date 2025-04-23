import { render, screen } from "@testing-library/react";
import BaseFormGroup from "@/components/FormGroup/FormGroupBase";

const classNames = {
  wrapper: "formWrapper",
  label: "formLabel",
  srOnly: "srOnly",
  required: "formRequired",
  inputWrapper: "inputWrapper",
  inputField: "inputField",
  controller: "controller",
  description: "description",
  errorMessage: "errorMessage",
  layoutMap: {
    vertical: "layoutVertical",
    horizontal: "layoutHorizontal",
  },
  spacingMap: {
    medium: "spacingMedium",
    large: "spacingLarge",
  },
};

describe("BaseFormGroup", () => {
  it("renders label, description, and multiple inputs", () => {
    render(
      <BaseFormGroup
        id="login"
        label="Login Info"
        description="Enter your email and password"
        classNames={classNames}
        spacing="medium"
        layout="vertical"
      >
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-describedby="login-description" />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            aria-describedby="login-description"
          />
        </>
      </BaseFormGroup>
    );

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-labelledby", "login-label");
    expect(group).toHaveAttribute("aria-describedby", "login-description");

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders required indicator and error message", () => {
    render(
      <BaseFormGroup
        id="contact"
        label="Contact Info"
        error="This field is required"
        required
        classNames={classNames}
      >
        <input title="contact" id="contact" type="text" aria-invalid="true" />
      </BaseFormGroup>
    );

    expect(screen.getByTestId("form-group-required")).toHaveTextContent("*");
    expect(screen.getByTestId("form-group-error")).toHaveTextContent(
      "This field is required"
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
