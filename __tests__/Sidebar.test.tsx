import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SidebarBase from "../src/components/Sidebar/SidebarBase";

expect.extend(toHaveNoViolations);

const mockLinks = [
  { label: "Dashboard", href: "/Dashboard" },
  {
    label: "Reports",
    children: [
      { label: "Monthly", href: "/Reports/Monthly" },
      { label: "Annual", href: "/Reports/Annual" },
    ],
  },
  { label: "Settings", href: "/Settings" },
];

const mockFooterLinks = [
  { label: "Help", href: "/Help" },
  { label: "Logout", href: "/Logout" },
];

const classMap = {
  wrapper: "wrapper",
  nav: "nav",
  list: "list",
  childList: "childList",
  item: "item",
  link: "link",
  childLink: "childLink",
  active: "active",
  chevron: "chevron",
  chevronOpen: "chevronOpen",
  submenu: "submenu",
  submenuOpen: "submenuOpen",
  footer: "footer",
  footerLink: "footerLink",
  footerVersion: "footerVersion",
};

describe("SidebarBase", () => {
  it("renders without crashing and shows main list", () => {
    render(
      <SidebarBase
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    );
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    const lists = screen.getAllByTestId("sidebar-list");
    expect(lists.length).toBeGreaterThan(0);
    expect(lists[0]).toBeInTheDocument();
  });

  it("highlights the active link", () => {
    render(
      <SidebarBase
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    );
    const activeLink = screen
      .getAllByTestId("sidebar-sidebarLink")
      .find((link) => link.classList.contains("active"));
    expect(activeLink).toBeInTheDocument();
    expect(activeLink?.textContent).toBe("Settings");
  });

  it("renders footer when showFooter is true", () => {
    render(
      <SidebarBase
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
        showFooter
        footerLinks={mockFooterLinks}
        footerVersion="v1.0.0"
      />
    );

    expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
    expect(screen.getAllByTestId("sidebar-footerLink")).toHaveLength(2);
    expect(screen.getByTestId("sidebar-footerVersion")).toHaveTextContent(
      "v1.0.0"
    );
  });

  it("does not render footer when showFooter is false", () => {
    render(
      <SidebarBase
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
        showFooter={false}
      />
    );
    expect(screen.queryByTestId("sidebar-footer")).not.toBeInTheDocument();
  });

  it("is accessible according to axe", async () => {
    const { container } = render(
      <SidebarBase
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
