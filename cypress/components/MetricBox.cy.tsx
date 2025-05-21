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

describe("BaseMetricBox Component", () => {
  it("renders metric box with title, value, and subtext", () => {
    cy.mount(
      <BaseMetricBox
        title="Visitors"
        value="234"
        subtext="Compared to last week"
        icon={FaUsers}
        classNames={classNames}
        data-testid="metric-box"
      />
    );

    cy.findByRole("region", { name: /visitors/i }).should("exist");
    cy.findByTestId("metric-box-value").should(
      "have.attr",
      "aria-label",
      "234 Visitors"
    );
    cy.findByTestId("metric-box-subtext").should(
      "contain.text",
      "Compared to last week"
    );
    cy.findByTestId("metric-box-icon")
      .find("svg")
      .should("have.attr", "aria-hidden", "true");
  });

  it("omits subtext when not provided", () => {
    cy.mount(
      <BaseMetricBox
        title="Signups"
        value="58"
        classNames={classNames}
        data-testid="metric-box"
      />
    );

    cy.findByTestId("metric-box-subtext").should("not.exist");
    cy.findByTestId("metric-box").should("not.have.attr", "aria-describedby");
  });
});
