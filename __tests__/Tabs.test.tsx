import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "@/index";
import { FaHome, FaUser } from "react-icons/fa";

describe("Tabs Component", () => {
  const mockTabs = [
    {
      label: "Home",
      icon: FaHome,
      content: <p>Welcome home!</p>,
    },
    {
      label: "Profile",
      icon: FaUser,
      content: <p>Your profile info</p>,
    },
  ];

  it("renders all tab labels", () => {
    render(<Tabs tabs={mockTabs} />);

    expect(screen.getByRole("tab", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Profile" })).toBeInTheDocument();
  });

  it("renders default tab content", () => {
    render(<Tabs tabs={mockTabs} />);
    expect(screen.getByText("Welcome home!")).toBeInTheDocument();
  });

  it("switches content when a different tab is clicked", () => {
    render(<Tabs tabs={mockTabs} />);
    fireEvent.click(screen.getByRole("tab", { name: "Profile" }));
    expect(screen.getByText("Your profile info")).toBeInTheDocument();
  });

  it("applies the correct size class (xs)", () => {
    const { container } = render(<Tabs tabs={mockTabs} size="xs" />);
    const wrapper = container.querySelector("[data-testid='tabs']");
    expect(wrapper?.className).toMatch(/xs/);
  });

  it("applies the correct size class (small)", () => {
    const { container } = render(<Tabs tabs={mockTabs} size="small" />);
    const wrapper = container.querySelector("[data-testid='tabs']");
    expect(wrapper?.className).toMatch(/small/);
  });
});
