import { Meta, StoryObj } from "@storybook/react";
import Footer from "@/components/Footer/core/Footer";
import type { FooterProps } from "@/components/Footer/Footer.types";
import { FaGithub, FaTwitter, FaLinkedin, FaTree } from "react-icons/fa";
import ThemeProvider from "@/context/ThemeContext";
import { BorealLogoIcon } from "@/Icons";

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
    logo: <BorealLogoIcon />,
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
