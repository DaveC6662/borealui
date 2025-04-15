import { render, screen } from "@testing-library/react";
import { MetricBox } from "@/index.next";
import { FaUsers } from "react-icons/fa";
import "@testing-library/jest-dom";

describe("MetricBox", () => {
  it("renders with required props", () => {
    render(<MetricBox title="Users" value={120} />);

    expect(screen.getByTestId("metric-box")).toBeInTheDocument();
    expect(screen.getByTestId("metric-box-title")).toHaveTextContent("Users");
    expect(screen.getByTestId("metric-box-value")).toHaveTextContent("120");
  });

  it("renders with icon, subtext, and applies theme, align, and size classes", () => {
    render(
      <MetricBox
        title="Active Users"
        value="5,000"
        icon={FaUsers}
        subtext="+20% growth"
        theme="success"
        align="right"
        size="large"
        data-testid="custom-metric"
      />
    );

    const box = screen.getByTestId("custom-metric");

    expect(box).toBeInTheDocument();
    expect(box).toHaveClass("success");
    expect(box).toHaveClass("right");
    expect(box).toHaveClass("large");

    expect(screen.getByTestId("custom-metric-title")).toHaveTextContent("Active Users");
    expect(screen.getByTestId("custom-metric-value")).toHaveTextContent("5,000");
    expect(screen.getByTestId("custom-metric-subtext")).toHaveTextContent("+20% growth");
    expect(screen.getByTestId("custom-metric-icon")).toBeInTheDocument();
  });

  it("falls back to default theme, align, and size if not provided", () => {
    render(<MetricBox title="Fallback Test" value="42" />);

    const box = screen.getByTestId("metric-box");
    expect(box).toHaveClass("primary"); 
    expect(box).toHaveClass("center");  
    expect(box).toHaveClass("medium");     
  });
});
