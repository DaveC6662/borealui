import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import SkeletonLoaderBase from "@/components/Skeleton/SkeletonBase";

describe("SkeletonLoaderBase", () => {
  it("renders with specified dimensions", () => {
    render(
      <SkeletonLoaderBase
        width="150px"
        height="80px"
        className="custom-skeleton"
        data-testid="skeleton-loader"
      />
    );

    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: "150px", height: "80px" });
    expect(skeleton).toHaveAttribute("role", "status");
    expect(skeleton).toHaveAttribute("aria-live", "polite");
    expect(skeleton).toHaveAttribute("aria-busy", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SkeletonLoaderBase />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
