import { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "../src/index.core";
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
