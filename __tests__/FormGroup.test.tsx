import { render, screen } from "@testing-library/react";
import BaseFormGroup from "@/components/FormGroup/FormGroupBase";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

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
  vertical: "layoutVertical",
  horizontal: "layoutHorizontal",
  medium: "spacingMedium",
  large: "spacingLarge",
};

describe("BaseFormGroup", () => {
  it("renders label, description, and multiple inputs", () => {
    render(
      <BaseFormGroup
        id="login"
        label="Login Info"
        description="Enter your email and password"
        classMap={classNames}
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
        classMap={classNames}
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

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseFormGroup
        id="signup"
        label="Signup Info"
        description="Enter a valid email and password"
        classMap={classNames}
        spacing="medium"
        layout="vertical"
      >
        <>
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            aria-describedby="signup-description"
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            aria-describedby="signup-description"
          />
        </>
      </BaseFormGroup>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
