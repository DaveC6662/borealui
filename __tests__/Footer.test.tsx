import React from "react";
import { render, screen } from "@testing-library/react";
import BaseFooter from "@/components/Footer/FooterBase";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const classNames = {
  wrapper: "footerWrapper",
  primary: "themePrimary",
  content: "footerContent",
  left: "footerLeft",
  links: "footerLinks",
  link: "footerLink",
  social: "footerSocial",
  themeToggle: "footerThemeToggle",
};

const DummyIconButton = ({ icon: Icon, href, ariaLabel, ...props }: any) => (
  <a href={href} aria-label={ariaLabel} {...props}>
    {Icon && <Icon aria-hidden="true" />}
  </a>
);
DummyIconButton.displayName = "DummyIconButton";

const DummyThemeSelect = () => (
  <select aria-label="Theme selector">
    <option>Light</option>
  </select>
);

const DummyLinkWrapper = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => <a href={href}>{children}</a>;

describe("BaseFooter", () => {
  it("renders links, social icons, theme selector, and copyright", () => {
    render(
      <BaseFooter
        theme="primary"
        classMap={classNames}
        IconButton={DummyIconButton}
        ThemeSelect={DummyThemeSelect}
        LinkWrapper={DummyLinkWrapper}
        showThemeSelect
        links={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        socialLinks={[
          { icon: FaGithub, title: "GitHub", href: "https://github.com" },
          { icon: FaTwitter, title: "Twitter", href: "https://twitter.com" },
        ]}
        copyright="© 2025 MyCompany"
      />
    );

    expect(
      screen.getByRole("contentinfo", { name: /footer/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: /footer site links/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: /social media/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub")).toHaveAttribute(
      "href",
      "https://github.com"
    );
    expect(screen.getByLabelText("Twitter")).toHaveAttribute(
      "href",
      "https://twitter.com"
    );

    expect(screen.getByLabelText("Theme selector")).toBeInTheDocument();

    expect(screen.getByText(/© 2025 MyCompany/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseFooter
        theme="primary"
        classMap={classNames}
        IconButton={DummyIconButton}
        ThemeSelect={DummyThemeSelect}
        LinkWrapper={DummyLinkWrapper}
        showThemeSelect
        links={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        socialLinks={[
          { icon: FaGithub, title: "GitHub", href: "https://github.com" },
          { icon: FaTwitter, title: "Twitter", href: "https://twitter.com" },
        ]}
        copyright="© 2025 MyCompany"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
