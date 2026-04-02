import { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "../src/index.core";
import { SidebarProps } from "../src/components/Sidebar/Sidebar.types";
import { FaBook, FaPaperclip, FaCogs, FaCalendar } from "react-icons/fa";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

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
    theme: "primary",
    outline: false,
    rounding: "medium",
    shadow: "light",
    showFooter: false,
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
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
    {stateOptions.map((theme) => (
      <Sidebar
        key={theme}
        theme={theme}
        outline
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
        links={mockLinks}
        currentPath="/Settings"
      />
    ))}
  </StoryGrid>
);
