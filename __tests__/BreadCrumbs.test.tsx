import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { BreadcrumbsBase } from "@/components/Breadcrumbs/BreadcrumbsBase";

expect.extend(toHaveNoViolations);

const classMap = {
  breadcrumbs: "breadcrumbs",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  disabled: "disabled",
  list: "breadcrumb-list",
  item: "breadcrumb-item",
  item_animate: "animate",
  item_active: "active",
  ellipsis: "ellipsis",
  link: "breadcrumb-link",
  link_label: "link-label",
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

describe("BreadcrumbsBase", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Current Page" },
  ];

  it("renders all breadcrumb items", () => {
    render(
      <BreadcrumbsBase
        items={items}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
        data-testid="breadcrumbs"
      />
    );

    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("shows ellipsis and expands when clicked", () => {
    render(
      <BreadcrumbsBase
        items={[
          { label: "1", href: "/1" },
          { label: "2", href: "/2" },
          { label: "3", href: "/3" },
          { label: "4", href: "/4" },
        ]}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
        maxVisible={3}
        data-testid="breadcrumbs"
      />
    );

    const ellipsis = screen.getByLabelText("Show more breadcrumbs");
    expect(ellipsis).toBeInTheDocument();
    fireEvent.click(ellipsis);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BreadcrumbsBase
        items={items}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
        data-testid="breadcrumbs"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
