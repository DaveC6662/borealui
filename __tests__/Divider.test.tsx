import { render, screen } from "@testing-library/react";
import DividerBase from "@/components/Divider/DividerBase";

const styles = {
  divider: "divider",
  horizontal: "horizontal",
  vertical: "vertical",
  dashed: "dashed",
  primary: "themePrimary",
};

describe("DividerBase", () => {
  it("renders horizontal divider with default props", () => {
    render(<DividerBase classMap={styles} data-testid="divider" />);

    const divider = screen.getByTestId("divider");
    expect(divider).toHaveClass("divider");
    expect(divider).toHaveClass("horizontal");
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).not.toHaveAttribute("aria-orientation");
  });

  it("renders vertical divider with aria-orientation", () => {
    render(
      <DividerBase
        orientation="vertical"
        classMap={styles}
        data-testid="divider-vertical"
      />
    );

    const divider = screen.getByTestId("divider-vertical");
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveClass("vertical");
  });

  it("applies dashed and themed styles", () => {
    render(
      <DividerBase
        dashed
        theme="primary"
        classMap={styles}
        data-testid="divider-styled"
      />
    );

    const divider = screen.getByTestId("divider-styled");
    expect(divider).toHaveClass("dashed");
    expect(divider).toHaveClass("themePrimary");
  });

  it("does not include role or aria-orientation when using semantic <hr>", () => {
    render(
      <DividerBase
        as="hr"
        orientation="vertical"
        classMap={styles}
        data-testid="divider-hr"
      />
    );

    const divider = screen.getByTestId("divider-hr");
    expect(divider.tagName).toBe("HR");
    expect(divider).not.toHaveAttribute("role");
    expect(divider).not.toHaveAttribute("aria-orientation");
  });

  it("respects aria-hidden for decorative usage", () => {
    render(
      <DividerBase
        classMap={styles}
        aria-hidden="true"
        data-testid="divider-hidden"
      />
    );

    const divider = screen.getByTestId("divider-hidden");
    expect(divider).toHaveAttribute("aria-hidden", "true");
  });
});
