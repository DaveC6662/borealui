import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseNavBar from "@/components/NavBar/NavBarBase";
import { FaHome, FaUser } from "react-icons/fa";

expect.extend(toHaveNoViolations);

const mockItems = [
  { label: "Home", path: "/home", icon: <FaHome /> },
  { label: "Profile", path: "/profile", icon: <FaUser /> },
];

const classMap = {
  container: "navContainer",
  item: "navItem",
  "item--active": "navItemActive",
  navItem: "navItemOverride",
  icon: "navIcon",
  label: "navLabel",
  primary: "primaryTheme",
  roundMedium: "roundMedium",
  shadowLight: "shadowLight",
};

const LinkWrapper = ({
  href,
  children,
  className,
  testId,
  isActive,
  ...props
}: any) => (
  <a
    href={href}
    className={className}
    data-testid={testId}
    {...(isActive ? { "aria-current": "page" } : {})}
    {...props}
  >
    {children}
  </a>
);

describe("BaseNavBar", () => {
  const currentPath = "/home";
  const testId = "test";

  it("renders all navigation items and highlights the active one", () => {
    render(
      <BaseNavBar
        items={mockItems}
        currentPath={currentPath}
        classMap={classMap}
        LinkWrapper={LinkWrapper}
        data-testid={testId}
      />
    );

    const nav = screen.getByTestId(`${testId}-nav-bar`);
    expect(nav).toBeInTheDocument();

    const homeItem = screen.getByTestId(`${testId}-nav-item-home`);
    const profileItem = screen.getByTestId(`${testId}-nav-item-profile`);

    expect(homeItem).toHaveAttribute("aria-current", "page");
    expect(profileItem).not.toHaveAttribute("aria-current");

    expect(screen.getByTestId(`${testId}-nav-icon-home`)).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(
      screen.getByTestId(`${testId}-nav-icon-profile`)
    ).toBeInTheDocument();
  });

  it("sets aria-current on the correct item", () => {
    render(
      <BaseNavBar
        items={mockItems}
        currentPath="/profile"
        classMap={classMap}
        LinkWrapper={LinkWrapper}
        data-testid={testId}
      />
    );

    expect(screen.getByTestId(`${testId}-nav-item-home`)).not.toHaveAttribute(
      "aria-current"
    );
    expect(screen.getByTestId(`${testId}-nav-item-profile`)).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseNavBar
        items={mockItems}
        currentPath="/home"
        classMap={classMap}
        LinkWrapper={LinkWrapper}
        data-testid={testId}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
