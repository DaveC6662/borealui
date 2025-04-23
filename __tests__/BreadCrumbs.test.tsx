import { render, screen } from "@testing-library/react";
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

describe("BreadcrumbsBase", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Current Page" },
  ];

  it("renders all breadcrumbs", () => {
    render(
      <BreadcrumbsBase
        items={items}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
      />
    );

    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("shows ellipsis when maxVisible is set", () => {
    render(
      <BreadcrumbsBase
        items={[
          { label: "1", href: "/" },
          { label: "2", href: "/" },
          { label: "3", href: "/" },
          { label: "4", href: "/" },
        ]}
        classMap={classMap}
        LinkComponent={LinkComponent}
        ButtonComponent={ButtonComponent}
        maxVisible={3}
      />
    );

    expect(screen.getByLabelText("Show more breadcrumbs")).toBeInTheDocument();
  });
});
