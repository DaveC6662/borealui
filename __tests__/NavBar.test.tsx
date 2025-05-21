import { render, screen } from "@testing-library/react";
import BaseNavBar from "@/components/NavBar/NavBarBase";
import { FaHome, FaUser } from "react-icons/fa";

const mockItems = [
  { label: "Home", path: "/home", icon: <FaHome /> },
  { label: "Profile", path: "/profile", icon: <FaUser /> },
];

const classNames = {
  container: "navContainer",
  item: "navItem",
  active: "navActive",
  icon: "navIcon",
  label: "navLabel",
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
  it("renders all navigation items", () => {
    render(
      <BaseNavBar
        items={mockItems}
        currentPath="/home"
        classMap={classNames}
        LinkWrapper={LinkWrapper}
      />
    );

    expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-profile")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-home")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByTestId("nav-icon-home")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("does not set aria-current on inactive links", () => {
    render(
      <BaseNavBar
        items={mockItems}
        currentPath="/profile"
        classMap={classNames}
        LinkWrapper={LinkWrapper}
      />
    );

    expect(screen.getByTestId("nav-item-home")).not.toHaveAttribute(
      "aria-current"
    );
    expect(screen.getByTestId("nav-item-profile")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
