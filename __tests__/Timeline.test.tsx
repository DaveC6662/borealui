import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
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
  horizontal: "horizontal",
  primary: "primary",
};

const items = [
  {
    title: "Project Kickoff",
    date: "Jan 1, 2023",
    description: "Initial meeting with stakeholders.",
    icon: FaCheck,
  },
  {
    title: "Design Phase",
    date: "Feb 15, 2023",
    description: "Wireframes and mockups created.",
  },
];

describe("TimelineBase", () => {
  it("renders timeline items with correct structure", () => {
    render(<TimelineBase items={items} classMap={mockStyles} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(items.length);
    expect(screen.getByText("Project Kickoff")).toBeInTheDocument();
    expect(screen.getByText("Design Phase")).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(
      <TimelineBase items={items} classMap={mockStyles} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
