import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Divider } from "@/index";

describe("Divider", () => {
  it("renders horizontal divider by default", () => {
    render(<Divider data-testid="divider" />);
    const divider = screen.getByTestId("divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("divider", "horizontal");
  });

  it("renders vertical orientation", () => {
    render(<Divider orientation="vertical" data-testid="divider-vertical" />);
    const divider = screen.getByTestId("divider-vertical");
    expect(divider).toHaveClass("vertical");
  });

  it("applies dashed style", () => {
    render(<Divider dashed data-testid="divider-dashed" />);
    const divider = screen.getByTestId("divider-dashed");
    expect(divider).toHaveClass("dashed");
  });

  it("applies custom thickness and length", () => {
    render(
      <Divider
        orientation="horizontal"
        thickness="5px"
        length="80%"
        data-testid="divider-size"
      />
    );
    const divider = screen.getByTestId("divider-size");
    expect(divider).toHaveStyle({
      height: "5px",
      width: "80%",
    });
  });

  it("applies themed color classes", () => {
    render(<Divider theme="success" data-testid="divider-success" dashed />);
    const divider = screen.getByTestId("divider-success");
    expect(divider).toHaveClass("success", "dashed");
  });

  it("includes role='separator'", () => {
    render(<Divider data-testid="divider-role" />);
    const divider = screen.getByTestId("divider-role");
    expect(divider).toHaveAttribute("role", "separator");
  });
});
