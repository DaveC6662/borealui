import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SkeletonBase from "@/components/Skeleton/SkeletonBase";

expect.extend(toHaveNoViolations);

const classMap = {
  shadowLight: "shadow-light",
  shadowMedium: "shadow-medium",
  shadowStrong: "shadow-strong",
  shadowIntense: "shadow-intense",
  roundSmall: "round-small",
  roundMedium: "round-medium",
  roundLarge: "round-large",
};

describe("SkeletonBase", () => {
  it("renders with specified dimensions and attributes", () => {
    render(
      <SkeletonBase
        width="150px"
        height="80px"
        className="custom-skeleton"
        classMap={classMap}
        data-testid="skeleton-loader"
      />
    );

    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: "150px", height: "80px" });
    expect(skeleton).toHaveAttribute("role", "status");
    expect(skeleton).toHaveAttribute("aria-live", "polite");
    expect(skeleton).toHaveAttribute("aria-busy", "true");

    const desc = screen.getByTestId("skeleton-loader-description");
    expect(desc).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-describedby", desc.id);
    expect(desc).toHaveTextContent("Loading content...");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SkeletonBase classMap={classMap} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
