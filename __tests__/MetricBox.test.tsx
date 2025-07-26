import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseMetricBox from "@/components/MetricBox/MetricBoxBase";
import { FaUsers } from "react-icons/fa";

expect.extend(toHaveNoViolations);

const classNames = {
  wrapper: "metricWrapper",
  primary: "themePrimary",
  medium: "sizeMedium",
  center: "alignCenter",
  icon: "metricIcon",
  content: "metricContent",
  title: "metricTitle",
  value: "metricValue",
  subtext: "metricSubtext",
};

describe("BaseMetricBox", () => {
  it("renders all metric content and includes correct aria attributes", () => {
    render(
      <BaseMetricBox
        title="New Users"
        value="12"
        subtext="Since yesterday"
        icon={FaUsers}
        classMap={classNames}
        data-testid="metric-box"
      />
    );

    const region = screen.getByRole("region", { name: /new users/i });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-describedby");

    expect(screen.getByTestId("metric-box-title").tagName).toBe("H3");
    expect(screen.getByTestId("metric-box-value")).toHaveAttribute(
      "aria-label",
      "12 New Users"
    );
    expect(screen.getByTestId("metric-box-icon").firstChild).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByTestId("metric-box-subtext")).toHaveTextContent(
      "Since yesterday"
    );
  });

  it("does not include aria-describedby if subtext is missing", () => {
    render(
      <BaseMetricBox
        title="Active Users"
        value="24"
        classMap={classNames}
        data-testid="metric-box"
      />
    );

    const region = screen.getByTestId("metric-box");
    expect(region).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByTestId("metric-box-subtext")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseMetricBox
        title="A11y Metric"
        value="99"
        subtext="Accessible"
        icon={FaUsers}
        classMap={classNames}
        data-testid="metric-box"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
