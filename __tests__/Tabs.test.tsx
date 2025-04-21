import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import TabsBase from "@/components/Tabs/TabsBase";

const mockStyles = {
  tabsContainer: "tabsContainer",
  tabs: "tabs",
  tab: "tab",
  active: "active",
  content: "content",
  primary: "primary",
  medium: "medium",
  icon: "icon",
};

const tabsMock = [
  { label: "Tab 1", content: <p>Content 1</p> },
  { label: "Tab 2", content: <p>Content 2</p> },
  { label: "Tab 3", content: <p>Content 3</p> },
];

describe("TabsBase", () => {
  it("renders tabs and content correctly", () => {
    render(<TabsBase tabs={tabsMock} styles={mockStyles} data-testid="tabs" />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 1");
  });

  it("switches tab on click", () => {
    render(<TabsBase tabs={tabsMock} styles={mockStyles} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 2");
  });

  it("supports keyboard arrow navigation", () => {
    render(<TabsBase tabs={tabsMock} styles={mockStyles} />);

    const [tab1, tab2] = screen.getAllByRole("tab");

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(tab2).toHaveFocus();
  });

  it("passes axe accessibility check", async () => {
    const { container } = render(
      <TabsBase tabs={tabsMock} styles={mockStyles} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
