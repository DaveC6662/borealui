import { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "../src/index.next";
import type { FooterProps } from "../src/components/Footer/Footer.types";
import { FaGithub, FaTwitter, FaLinkedin, FaIcons } from "react-icons/fa";
import ThemeProvider from "../src/context/ThemeContext";
import image from "./assets/tutorials.svg";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<FooterProps> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    theme: "primary",
    showThemeSelect: false,
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color for the footer background and text.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the footer container.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow style for the footer.",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Additional CSS class for the footer container.",
      table: { category: "Appearance" },
    },
    "data-testid": {
      control: "text",
      description: "Custom test id for the root element.",
      table: { category: "Testing" },
    },
    copyright: {
      control: "text",
      description: "Copyright notice displayed in the footer.",
      table: { category: "Content" },
    },
    links: {
      control: "object",
      description:
        "Array of navigation links in the footer. Each item is `{ label: string; href: string }`.",
      table: {
        category: "Content",
        type: { summary: "Array<{ label, href }>" },
      },
    },
    logo: {
      control: false,
      description:
        "Logo for the footer. Can be an image URL, imported image, or JSX element.",
      table: { category: "Content" },
    },
    socialLinks: {
      control: "object",
      description:
        "Array of social link objects. Each is `{ icon: React.ElementType, href: string, title: string }`.",
      table: {
        category: "Content",
        type: { summary: "Array<{ icon, href, title }>" },
      },
    },
    showThemeSelect: {
      control: "boolean",
      description: "Show a theme select dropdown in the footer.",
      table: { category: "Controls" },
    },
    attachment: {
      control: "select",
      options: ["static", "sticky", "fixed"],
      description:
        "Attachment type of the footer: static (default), sticky (sticks to bottom), or fixed (fixed to viewport).",
      table: { category: "Layout" },
    },
  },
};

export default meta;

type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {
    copyright: "© 2025 Your Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    logo: image,
    socialLinks: [
      {
        icon: FaGithub,
        href: "https://github.com",
        title: "GitHub",
      },
      {
        icon: FaTwitter,
        href: "https://twitter.com",
        title: "Twitter",
      },
      {
        icon: FaLinkedin,
        href: "https://linkedin.com",
        title: "LinkedIn",
      },
    ],
  },
};

export const ThemeSelect: Story = {
  args: {
    ...Default.args,
    showThemeSelect: true,
  },
};

export const Themes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {themeOptions.map((theme) => (
        <div key={theme} style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3 style={{ textTransform: "capitalize" }}>{theme} theme</h3>
          <Footer
            {...args}
            theme={theme as FooterProps["theme"]}
            copyright={`© 2025 Your Company (${theme})`}
            showThemeSelect={true}
          />
        </div>
      ))}
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const LinksOnly: Story = {
  args: {
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

export const SocialOnly: Story = {
  args: {
    socialLinks: [
      { icon: FaGithub, href: "https://github.com", title: "GitHub" },
    ],
  },
};

export const RoundingVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {roundingOptions.map((rounding) => (
        <Footer
          key={`rounding-${rounding}`}
          rounding={rounding}
          copyright={`Rounding ${rounding.charAt(0).toUpperCase() + rounding.slice(1)}`}
        />
      ))}
    </div>
  ),
};

export const ShadowVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {shadowOptions.map((shadow) => (
        <Footer
          key={`shadow-${shadow}`}
          shadow={shadow}
          copyright={`Shadow ${shadow.charAt(0).toUpperCase() + shadow.slice(1)}`}
        />
      ))}
    </div>
  ),
};
