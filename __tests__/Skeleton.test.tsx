import { render, screen } from "@testing-library/react";
import SkeletonLoader from "@/components/Skeleton/Skeleton";

describe("SkeletonLoader", () => {
  it("renders with default dimensions and accessibility attributes", () => {
    render(<SkeletonLoader data-testid="skeleton-test" />);

    const skeleton = screen.getByTestId("skeleton-test");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: "100%", height: "100%" });
    expect(skeleton).toHaveAttribute("role", "status");
    expect(skeleton).toHaveAttribute("aria-live", "polite");
    expect(skeleton).toHaveAttribute("aria-busy", "true");
  });

  it("applies custom width and height", () => {
    render(<SkeletonLoader width="200px" height="50px" data-testid="custom-skeleton" />);
    const skeleton = screen.getByTestId("custom-skeleton");
    expect(skeleton).toHaveStyle({ width: "200px", height: "50px" });
  });

  it("allows custom className override", () => {
    render(
      <SkeletonLoader
        width="150px"
        height="30px"
        className="my-custom-class"
        data-testid="styled-skeleton"
      />
    );
    const skeleton = screen.getByTestId("styled-skeleton");
    expect(skeleton.className).toContain("my-custom-class");
  });
});