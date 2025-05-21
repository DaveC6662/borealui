import React from "react";
import BaseFooter from "@/components/Footer/FooterBase";
import { FaGithub, FaTwitter } from "react-icons/fa";

const classNames = {
  wrapper: "footerWrapper",
  theme: { primary: "themePrimary" },
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
    <option>Dark</option>
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
  it("renders footer content with links and accessibility", () => {
    cy.mount(
      <BaseFooter
        theme="primary"
        classNames={classNames}
        IconButton={DummyIconButton}
        ThemeSelect={DummyThemeSelect}
        LinkWrapper={DummyLinkWrapper}
        showThemeSelect
        links={[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ]}
        socialLinks={[
          { icon: FaGithub, title: "GitHub", href: "https://github.com" },
          { icon: FaTwitter, title: "Twitter", href: "https://twitter.com" },
        ]}
        copyright="© 2025"
        data-testid="footer"
      />
    );

    cy.findByRole("contentinfo", { name: /footer/i }).should("exist");
    cy.findByRole("navigation", { name: /footer site links/i }).within(() => {
      cy.findByText("Privacy")
        .closest("a")
        .should("have.attr", "href", "/privacy");

      cy.findByText("Terms").closest("a").should("have.attr", "href", "/terms");
    });

    cy.findByRole("navigation", { name: /social media/i }).within(() => {
      cy.findByLabelText("GitHub").should(
        "have.attr",
        "href",
        "https://github.com"
      );
      cy.findByLabelText("Twitter").should(
        "have.attr",
        "href",
        "https://twitter.com"
      );
    });

    cy.findByLabelText("Theme selector").should("exist");
    cy.findByText("© 2025").should("exist");
  });
});
