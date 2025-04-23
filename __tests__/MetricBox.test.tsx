import { render, screen } from "@testing-library/react";
import BaseMetricBox from "@/components/MetricBox/MetricBoxBase";
import { FaUsers } from "react-icons/fa";

const classNames = {
  wrapper: "metricWrapper",
  themeMap: {
    primary: "themePrimary",
  },
  sizeMap: {
    medium: "sizeMedium",
  },
  alignMap: {
    center: "alignCenter",
  },
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
        classNames={classNames}
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
        classNames={classNames}
        data-testid="metric-box"
      />
    );

    const region = screen.getByTestId("metric-box");
    expect(region).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByTestId("metric-box-subtext")).not.toBeInTheDocument();
  });
});
