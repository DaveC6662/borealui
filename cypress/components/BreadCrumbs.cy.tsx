/// <reference types="cypress" />
import { BreadcrumbsBase } from "@/components/Breadcrumbs/BreadcrumbsBase";

const classMap = {
  breadcrumbs: "breadcrumbs",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  list: "breadcrumb-list",
  item: "breadcrumb-item",
  itemAnimate: "animate",
  active: "active",
  ellipsis: "ellipsis",
  link: "breadcrumb-link",
  linkLabel: "link-label",
  current: "current-page",
  separator: "separator",
  separatorIcon: "separator-icon",
};

const LinkComponent = ({ href, children, ...props }: any) => (
  <a href={href} {...props}>
    {children}
  </a>
);

const ButtonComponent = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

describe("BreadcrumbsBase (Cypress)", () => {
  const items = [
    { label: "Dashboard", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Profile" },
  ];

  it("renders all items with accessibility roles", () => {
    cy.mount(
      <BreadcrumbsBase
        items={items}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
      />
    );

    cy.findByLabelText("Breadcrumb").should("exist");
    cy.findByText("Dashboard").should("exist");
    cy.findByText("Settings").should("exist");
    cy.findByText("Profile").should("exist");
  });

  it("expands ellipsis on button click", () => {
    cy.mount(
      <BreadcrumbsBase
        items={[
          { label: "One", href: "/" },
          { label: "Two", href: "/" },
          { label: "Three", href: "/" },
          { label: "Four", href: "/" },
        ]}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
        maxVisible={3}
      />
    );

    cy.findByLabelText("Show more breadcrumbs").click();
    cy.findByText("Two").should("exist");
  });
});
