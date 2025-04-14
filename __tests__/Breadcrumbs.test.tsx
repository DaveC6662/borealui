import { render, screen, fireEvent } from "@testing-library/react";
import { Breadcrumbs } from "@/index";
import "@testing-library/jest-dom";
import { FaArrowRight } from "react-icons/fa";
import { BreadcrumbsProps } from "@/components/Breadcrumbs/Breadcrumbs";

const baseItems = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Navigation", href: "/docs/components/navigation" },
  { label: "Breadcrumbs" },
];

const setup = (props: Partial<BreadcrumbsProps> = {}) =>
  render(<Breadcrumbs items={baseItems} {...props} />);

describe("Breadcrumbs Component", () => {
  it("renders all items by default", () => {
    setup();
    baseItems.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("applies theme, size and outline classes", () => {
    setup({ theme: "success", size: "large", outline: true });
    const nav = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(nav.className).toMatch(/success/);
    expect(nav.className).toMatch(/large/);
    expect(nav.className).toMatch(/outline/);
  });

  it("limits visible items when maxVisible is set", () => {
    setup({ maxVisible: 3 });
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("…")).toBeInTheDocument();
    expect(screen.getByText("Breadcrumbs")).toBeInTheDocument();

    // Intermediate collapsed items should not be visible
    expect(screen.queryByText("Docs")).not.toBeInTheDocument();
  });

  it("expands collapsed items when ellipsis is clicked", () => {
    setup({ maxVisible: 3 });

    fireEvent.click(screen.getByRole("button", { name: "Expand breadcrumbs" }));

    // All labels should now be visible
    baseItems.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("renders a custom separator", () => {
    setup({ separator: <FaArrowRight data-testid="custom-separator" /> });
    const separators = screen.getAllByTestId("custom-separator");
    expect(separators.length).toBe(baseItems.length - 1);
  });

  it("marks the last item with aria-current", () => {
    setup();
    const current = screen.getByText("Breadcrumbs").closest(".current");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("uses semantic nav and breadcrumb structure", () => {
    const { container } = setup();
    const nav = screen.getByRole("navigation", { name: "breadcrumb" });

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("itemtype", "https://schema.org/BreadcrumbList");
    expect(container.querySelectorAll("[itemtype='https://schema.org/ListItem']")).toHaveLength(baseItems.length);
  });
});
