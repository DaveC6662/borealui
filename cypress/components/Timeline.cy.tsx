import TimelineBase from "@/components/Timeline/TimelineBase";
import { FaCheck } from "react-icons/fa";

const mockStyles = {
  timeline: "timeline",
  timelineItem: "timelineItem",
  marker: "marker",
  icon: "icon",
  dot: "dot",
  content: "content",
  title: "title",
  date: "date",
  description: "description",
  vertical: "vertical",
  primary: "primary",
};

const items = [
  {
    title: "Step One",
    date: "Jan 2023",
    description: "First milestone",
    icon: FaCheck,
  },
  {
    title: "Step Two",
    date: "Feb 2023",
    description: "Second milestone",
  },
];

describe("TimelineBase Component", () => {
  it("renders timeline items correctly", () => {
    cy.mount(<TimelineBase items={items} styles={mockStyles} />);

    cy.findAllByRole("listitem").should("have.length", items.length);
    cy.findByText("Step One").should("exist");
    cy.findByText("Step Two").should("exist");
  });

  it("shows icons and dots conditionally", () => {
    cy.mount(<TimelineBase items={items} styles={mockStyles} />);

    cy.get('[data-testid="timeline-item-0-icon"]').should("exist");
    cy.get('[data-testid="timeline-item-1-dot"]').should("exist");
  });

  it("renders and stacks properly in mobile view", () => {
    cy.viewport("iphone-6");

    cy.mount(<TimelineBase items={items} styles={mockStyles} />);
    cy.findByRole("list").should("exist");

    cy.get(".timelineItem").each(($item) => {
      cy.wrap($item).should("have.class", "vertical");
    });
  });
});
