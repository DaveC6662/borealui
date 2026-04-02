import React from "react";
import { render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import BaseFooter from "@/components/Footer/FooterBase";
import { FaGithub, FaTwitter } from "react-icons/fa";
import {
  DummyIconButton,
  DummyThemeSelect,
} from "./test-utils/dummyComponents";

expect.extend(toHaveNoViolations);

const classNames = {
  footer: "footerRoot",
  primary: "themePrimary",
  secondary: "themeSecondary",
  content: "footerContent",
  left: "footerLeft",
  links: "footerLinks",
  link: "footerLink",
  social: "footerSocial",
  themeToggle: "footerThemeToggle",
  logo: "footerLogo",
  copyright: "footerCopyright",
  shadowMedium: "shadowMedium",
  roundLarge: "roundLarge",
  attachmentFixed: "attachmentFixed",
};

type DummyLinkWrapperProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
};

const DummyLinkWrapper: React.FC<DummyLinkWrapperProps> = ({
  href,
  children,
  ...rest
}) => (
  <a href={href} {...rest}>
    {children}
  </a>
);
DummyLinkWrapper.displayName = "DummyLinkWrapper";

type CustomImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const CustomImage: React.FC<CustomImageProps> = (props) => (
  <img {...props} data-custom-image="true" />
);
CustomImage.displayName = "CustomImage";

const defaultProps = {
  theme: "primary" as const,
  classMap: classNames,
  IconButton: DummyIconButton,
  ThemeSelect: DummyThemeSelect,
  LinkWrapper: DummyLinkWrapper,
  showThemeSelect: true,
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ],
  socialLinks: [
    { icon: FaGithub, title: "GitHub", href: "https://github.com" },
    { icon: FaTwitter, title: "Twitter", href: "https://twitter.com" },
  ],
  copyright: "© 2025 MyCompany",
};

const renderFooter = (
  props: Partial<React.ComponentProps<typeof BaseFooter>> = {},
) => render(<BaseFooter {...defaultProps} {...props} />);

describe("BaseFooter", () => {
  it("renders the footer landmark and core regions", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-testid", "footer");

    expect(screen.getByTestId("footer-left")).toBeInTheDocument();
    expect(screen.getByTestId("footer-nav")).toBeInTheDocument();
    expect(screen.getByTestId("footer-social")).toBeInTheDocument();
    expect(screen.getByTestId("footer-theme-select")).toBeInTheDocument();
    expect(screen.getByTestId("footer-copyright")).toBeInTheDocument();
  });

  it("applies footer, theme, and layout classes", () => {
    renderFooter();

    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("footerRoot");
    expect(footer).toHaveClass("themePrimary");

    expect(screen.getByTestId("footer-left")).toHaveClass("footerLeft");
    expect(screen.getByTestId("footer-nav")).toHaveClass("footerLinks");
    expect(screen.getByTestId("footer-social")).toHaveClass("footerSocial");
    expect(screen.getByTestId("footer-theme-select")).toHaveClass(
      "footerThemeToggle",
    );
  });

  it("applies optional shadow, rounding, attachment, and custom className", () => {
    renderFooter({
      shadow: "medium",
      rounding: "large",
      attachment: "fixed",
      className: "customFooterClass",
    });

    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("footerRoot");
    expect(footer).toHaveClass("themePrimary");
    expect(footer).toHaveClass("shadowMedium");
    expect(footer).toHaveClass("roundLarge");
    expect(footer).toHaveClass("attachmentFixed");
    expect(footer).toHaveClass("customFooterClass");
  });

  it("applies footer aria attributes", () => {
    renderFooter({
      "aria-label": "Site footer",
      "aria-describedby": "footer-description",
    });

    const footer = screen.getByRole("contentinfo", { name: "Site footer" });
    expect(footer).toHaveAttribute("aria-describedby", "footer-description");
  });

  it("uses labelId as aria-labelledby when provided", () => {
    renderFooter({ labelId: "footer-label" });

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-labelledby", "footer-label");

    const copyrightText = screen.getByText("© 2025 MyCompany");
    expect(copyrightText).toHaveAttribute("id", "footer-label");
  });

  it("prefers explicit aria-labelledby over labelId", () => {
    renderFooter({
      labelId: "footer-label",
      "aria-labelledby": "external-footer-label",
    });

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-labelledby", "external-footer-label");
  });

  it("renders footer site links with expected hrefs and classes", () => {
    renderFooter();

    const nav = screen.getByRole("navigation", { name: /footer site links/i });
    expect(nav).toBeInTheDocument();

    const homeLink = screen.getByTestId("footer-link-home");
    const aboutLink = screen.getByTestId("footer-link-about-us");

    expect(homeLink).toHaveTextContent("Home");
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveClass("footerLink");

    expect(aboutLink).toHaveTextContent("About Us");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(aboutLink).toHaveClass("footerLink");

    const listItems = within(nav).getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("uses a custom nav aria label when provided", () => {
    renderFooter({ navAriaLabel: "Footer navigation links" });

    expect(
      screen.getByRole("navigation", { name: "Footer navigation links" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("navigation", { name: /footer site links/i }),
    ).not.toBeInTheDocument();
  });

  it("passes link accessibility props through to the link wrapper", () => {
    renderFooter({
      links: [
        {
          label: "Docs",
          href: "/docs",
          "aria-label": "Documentation",
          "aria-current": "page",
          title: "View docs",
          target: "_blank",
          rel: "noreferrer",
        },
      ],
    });

    const link = screen.getByTestId("footer-link-docs");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("aria-label", "Documentation");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("title", "View docs");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("renders disabled footer links as non-interactive text", () => {
    renderFooter({
      links: [{ label: "Unavailable", href: "/unavailable", disabled: true }],
    });

    const disabledItem = screen.getByTestId("footer-link-unavailable");
    expect(disabledItem.tagName).toBe("SPAN");
    expect(disabledItem).toHaveTextContent("Unavailable");
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    expect(disabledItem).not.toHaveAttribute("href");
  });

  it("renders social navigation with accessible icon links", () => {
    renderFooter();

    const socialNav = screen.getByRole("navigation", { name: /social media/i });
    expect(socialNav).toBeInTheDocument();

    const github = screen.getByLabelText("GitHub");
    const twitter = screen.getByLabelText("Twitter");

    expect(github).toHaveAttribute("href", "https://github.com");
    expect(github).toHaveAttribute("title", "GitHub");

    expect(twitter).toHaveAttribute("href", "https://twitter.com");
    expect(twitter).toHaveAttribute("title", "Twitter");

    expect(screen.getByTestId("footer-social-github")).toBeInTheDocument();
    expect(screen.getByTestId("footer-social-twitter")).toBeInTheDocument();
  });

  it("uses a custom social nav aria label when provided", () => {
    renderFooter({ socialNavAriaLabel: "Footer social links" });

    expect(
      screen.getByRole("navigation", { name: "Footer social links" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("navigation", { name: /social media/i }),
    ).not.toBeInTheDocument();
  });

  it("uses custom social accessibility props when provided", () => {
    renderFooter({
      socialLinks: [
        {
          icon: FaGithub,
          title: "GitHub",
          href: "https://github.com",
          "aria-label": "Visit our GitHub profile",
          tooltip: "Open GitHub",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
    });

    const socialLink = screen.getByLabelText("Visit our GitHub profile");
    expect(socialLink).toHaveAttribute("href", "https://github.com");
    expect(socialLink).toHaveAttribute("title", "Open GitHub");
    expect(socialLink).toHaveAttribute("target", "_blank");
    expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("passes disabled state to social icon buttons", () => {
    renderFooter({
      socialLinks: [
        {
          icon: FaGithub,
          title: "GitHub",
          href: "https://github.com",
          disabled: true,
        },
      ],
    });

    const socialLink = screen.getByTestId("footer-social-github");
    expect(socialLink).toHaveAttribute("aria-disabled", "true");
  });

  it("renders the theme select with the custom aria label when provided", () => {
    renderFooter({ themeSelectAriaLabel: "Choose theme" });

    const wrapper = screen.getByTestId("footer-theme-select");
    const themeSelect = within(wrapper).getByRole("combobox", {
      name: "Choose theme",
    });

    expect(themeSelect).toBeInTheDocument();
    expect(themeSelect.tagName).toBe("SELECT");
    expect(wrapper).toHaveAttribute("aria-label", "Choose theme");
  });

  it("renders the theme select when showThemeSelect is true", () => {
    renderFooter();

    const wrapper = screen.getByTestId("footer-theme-select");
    const themeSelect = within(wrapper).getByRole("combobox", {
      name: "Theme selector",
    });

    expect(themeSelect).toBeInTheDocument();
    expect(themeSelect.tagName).toBe("SELECT");
  });

  it("does not render the theme select when showThemeSelect is false", () => {
    renderFooter({ showThemeSelect: false });

    expect(screen.queryByTestId("footer-theme-select")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Theme selector")).not.toBeInTheDocument();
  });

  it("renders copyright text when provided", () => {
    renderFooter();

    const copyright = screen.getByTestId("footer-copyright");
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent("© 2025 MyCompany");
    expect(copyright).toHaveClass("footerCopyright");
  });

  it("does not render copyright block when copyright is not provided", () => {
    renderFooter({ copyright: undefined });

    expect(screen.queryByTestId("footer-copyright")).not.toBeInTheDocument();
  });

  it("renders a string logo source as an img element", () => {
    renderFooter({ logo: "/logo.png" });

    const logo = screen.getByTestId("footer-logo");
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", "/logo.png");
    expect(logo).toHaveAttribute("alt", "Logo");
    expect(logo).toHaveAttribute("loading", "lazy");
    expect(logo).toHaveAttribute("width", "20");
    expect(logo).toHaveAttribute("height", "20");
  });

  it("uses logoAriaLabel for image logos", () => {
    renderFooter({
      logo: "/logo.png",
      logoAriaLabel: "Acme brand logo",
    });

    const logo = screen.getByTestId("footer-logo");
    expect(logo).toHaveAttribute("alt", "Acme brand logo");
  });

  it("renders decorative image logos with empty alt text and aria-hidden", () => {
    renderFooter({
      logo: "/logo.png",
      logoDecorative: true,
      logoAriaLabel: "Should not be announced",
    });

    const logo = screen.getByTestId("footer-logo");
    expect(logo).toHaveAttribute("alt", "");
    expect(logo).toHaveAttribute("aria-hidden", "true");
  });

  it("renders an object logo source with custom dimensions", () => {
    renderFooter({
      logo: {
        src: "/brand-mark.svg",
        width: 48,
        height: 32,
      },
    });

    const logo = screen.getByTestId("footer-logo");
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", "/brand-mark.svg");
    expect(logo).toHaveAttribute("width", "48");
    expect(logo).toHaveAttribute("height", "32");
    expect(logo).toHaveAttribute("alt", "Logo");
  });

  it("renders logo using a custom ImageComponent when provided", () => {
    renderFooter({
      logo: "/logo-custom.png",
      ImageComponent: CustomImage,
    });

    const logo = screen.getByTestId("footer-logo");
    expect(logo).toHaveAttribute("src", "/logo-custom.png");
    expect(logo).toHaveAttribute("alt", "Logo");
    expect(logo).toHaveAttribute("data-custom-image", "true");
  });

  it("renders a custom node logo with img role and accessible label", () => {
    renderFooter({
      logo: (
        <svg>
          <title>Brand</title>
        </svg>
      ),
      logoAriaLabel: "Brand logo",
    });

    const logo = screen.getByTestId("footer-logo");
    expect(logo.tagName).toBe("SPAN");
    expect(logo).toHaveAttribute("role", "img");
    expect(logo).toHaveAttribute("aria-label", "Brand logo");
  });

  it("renders a decorative custom node logo as hidden from assistive tech", () => {
    renderFooter({
      logo: (
        <svg>
          <title>Brand</title>
        </svg>
      ),
      logoDecorative: true,
    });

    const logo = screen.getByTestId("footer-logo");
    expect(logo).toHaveAttribute("aria-hidden", "true");
    expect(logo).not.toHaveAttribute("role");
    expect(logo).not.toHaveAttribute("aria-label");
  });

  it("renders no logo element when logo is not provided", () => {
    renderFooter({ logo: undefined });

    expect(screen.queryByTestId("footer-logo")).not.toBeInTheDocument();
  });

  it("renders no site links nav when links array is empty", () => {
    renderFooter({ links: [] });

    expect(
      screen.queryByRole("navigation", { name: /footer site links/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-nav")).not.toBeInTheDocument();
  });

  it("renders no social nav when socialLinks array is empty", () => {
    renderFooter({ socialLinks: [] });

    expect(
      screen.queryByRole("navigation", { name: /social media/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-social")).not.toBeInTheDocument();
  });

  it("uses the provided data-testid prefix for internal elements", () => {
    renderFooter({
      "data-testid": "site-footer",
      logo: "/logo.png",
    });

    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-left")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-nav")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-social")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-theme-select")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-copyright")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-logo")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer-link-home")).toBeInTheDocument();
  });

  it("creates slugged test ids for links based on label text", () => {
    renderFooter({
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    });

    expect(screen.getByTestId("footer-link-contact-us")).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-link-privacy-policy"),
    ).toBeInTheDocument();
  });

  it("creates slugged test ids for social titles with spaces", () => {
    renderFooter({
      socialLinks: [
        {
          icon: FaGithub,
          title: "Git Hub",
          href: "https://github.com",
        },
      ],
    });

    expect(screen.getByTestId("footer-social-git-hub")).toBeInTheDocument();
    expect(screen.getByLabelText("Git Hub")).toHaveAttribute(
      "href",
      "https://github.com",
    );
  });

  it("renders with only the required structural parts when optional content is omitted", () => {
    render(
      <BaseFooter
        theme="primary"
        classMap={classNames}
        IconButton={DummyIconButton}
        ThemeSelect={DummyThemeSelect}
        LinkWrapper={DummyLinkWrapper}
      />,
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByTestId("footer-left")).toBeInTheDocument();

    expect(screen.queryByTestId("footer-nav")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-social")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-theme-select")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-copyright")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer-logo")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderFooter({
      "aria-label": "Site footer",
      navAriaLabel: "Footer navigation links",
      socialNavAriaLabel: "Footer social links",
      themeSelectAriaLabel: "Choose theme",
      logo: {
        src: "/logo.svg",
        width: 40,
        height: 40,
      },
      logoAriaLabel: "Company logo",
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
