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
  isActive,
  testId,
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
  it("displays nav items and highlights current page", () => {
    cy.mount(
      <BaseNavBar
        items={mockItems}
        currentPath="/profile"
        classNames={classNames}
        LinkWrapper={LinkWrapper}
        data-testid="nav-bar"
      />
    );

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("nav-item-home")
      .should("exist")
      .should("not.have.attr", "aria-current");
    cy.findByTestId("nav-item-profile")
      .should("exist")
      .should("have.attr", "aria-current", "page");
    cy.findByTestId("nav-icon-profile").should(
      "have.attr",
      "aria-hidden",
      "true"
    );
  });
});
