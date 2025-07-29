import { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "../src/index.next";
import { SidebarProps } from "../src/components/Sidebar/Sidebar.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import { FaBook, FaCalendar, FaCogs, FaPaperclip } from "react-icons/fa";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];
const stateOptions = ["success", "error", "warning"];

const sizeOptions = ["xs", "small", "medium", "large", "xl"] as const;

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const classMap = {
  wrapper: "wrapper",
  nav: "nav",
  list: "list",
  childList: "childList",
  item: "item",
  link: "link",
  childLink: "childLink",
  active: "active",
  chevron: "chevron",
  chevronOpen: "chevronOpen",
  submenu: "submenu",
  submenuOpen: "submenuOpen",
  footer: "footer",
  footerLink: "footerLink",
  footerVersion: "footerVersion",
};

const mockLinks = [
  { label: "Dashboard", href: "/Dashboard", icon: <FaBook /> },
  {
    label: "Reports",
    children: [
      { label: "Monthly", icon: <FaCalendar /> },
      { label: "Annual", icon: <FaCalendar /> },
    ],
    icon: <FaPaperclip />,
  },
  { label: "Settings", href: "/Settings", icon: <FaCogs /> },
];

const meta: Meta<SidebarProps> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  args: {
    links: mockLinks,
    currentPath: "/Settings",
    theme: "primary",
    outline: false,
    rounding: "medium",
    shadow: "light",
    showFooter: false,
  },
  argTypes: {
    links: {
      control: false,
      description:
        "Array of navigation links, each may include label, href, icon, and children.",
      table: { category: "Content" },
    },
    currentPath: {
      control: "text",
      description: "The current active path used to highlight the active link.",
      table: { category: "Behavior" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color for the sidebar.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "warning", "error", "disabled"],
      description: "Visual state for feedback.",
      table: { category: "Appearance" },
    },
    outline: {
      control: "boolean",
      description: "Whether the sidebar should use an outlined style.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large", "full"],
      description: "Corner rounding style for the sidebar container.",
      table: { category: "Appearance", defaultValue: { summary: "medium" } },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow style for the sidebar container.",
      table: { category: "Appearance", defaultValue: { summary: "light" } },
    },
    LinkComponent: {
      control: false,
      description:
        "Custom link component (e.g. Next.js Link or React Router Link).",
      table: { category: "Advanced" },
    },
    showFooter: {
      control: "boolean",
      description:
        "Whether to display the footer section at the bottom of the sidebar.",
      table: { category: "Content" },
    },
    footerLinks: {
      control: false,
      description: "Array of footer links displayed when `showFooter` is true.",
      table: { category: "Content" },
    },
    footerVersion: {
      control: "text",
      description: "Version label displayed in the footer (e.g. v1.0.0).",
      table: { category: "Content" },
    },
    classMap: {
      control: false,
      description:
        "Map of CSS class names used to style various sidebar elements.",
      table: { category: "Advanced" },
    },
    className: {
      control: "text",
      description: "Custom class names for the sidebar wrapper.",
      table: { category: "Advanced" },
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for the sidebar navigation landmark.",
      table: {
        category: "Accessibility",
        defaultValue: { summary: "Sidebar navigation" },
      },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      table: { category: "Testing" },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarProps>;

export const Default: Story = {};

export const OutlineVariants = () => (
  <StoryGrid title="Outline Sidebars">
    {themeOptions.map((theme) => (
      <Sidebar
        key={theme}
        theme={theme}
        outline
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
    {stateOptions.map((theme) => (
      <Sidebar
        key={theme}
        theme={theme}
        outline
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
  </StoryGrid>
);

export const ThemeVariants = () => (
  <StoryGrid title="Theme Variants">
    {themeOptions.map((theme) => (
      <Sidebar
        key={theme}
        theme={theme}
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
  </StoryGrid>
);

export const StateVariants = () => (
  <StoryGrid title="State Variants">
    {stateOptions.map((state) => (
      <Sidebar
        key={state}
        state={state}
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
  </StoryGrid>
);

export const RoundingVariants = () => (
  <StoryGrid title="Rounding Variants">
    {roundingOptions.map((rounding) => (
      <Sidebar
        key={rounding}
        rounding={rounding}
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
  </StoryGrid>
);

export const ShadowVariants = () => (
  <StoryGrid title="Shadow Variants">
    {shadowOptions.map((shadow) => (
      <Sidebar
        key={shadow}
        shadow={shadow}
        classMap={classMap}
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
  </StoryGrid>
);
