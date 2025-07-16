import { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton, Toolbar } from "../src/index.core";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import type {
  ToolbarBaseProps,
  ToolbarProps,
} from "../src/components/Toolbar/Toolbar.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];
const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<ToolbarBaseProps> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  args: {
    title: "Dashboard",
    theme: "primary",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Optional title displayed in the center section.",
      table: { category: "Content" },
    },
    left: {
      control: false,
      description: "Content to render in the left section of the toolbar.",
      table: { category: "Layout" },
    },
    center: {
      control: false,
      description:
        "Content to render in the center section, below the title if present.",
      table: { category: "Layout" },
    },
    right: {
      control: false,
      description:
        "Content to render in the right section of the toolbar, before the avatar.",
      table: { category: "Layout" },
    },
    avatar: {
      control: false,
      description:
        "Optional avatar component displayed at the end of the toolbar.",
      table: { category: "Layout" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Visual theme of the toolbar.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the toolbar.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius of the toolbar.",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Custom class name for the toolbar.",
      table: { category: "Appearance" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for the toolbar root element.",
      table: { category: "Testing" },
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for the toolbar for accessibility.",
      table: {
        category: "Accessibility",
        defaultValue: { summary: "Toolbar" },
      },
    },
    headingLevel: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "Heading level used for the title element.",
      table: { category: "Accessibility", defaultValue: { summary: "1" } },
    },
  },
};

export default meta;
type Story = StoryObj<ToolbarBaseProps>;

const leftIcon = (
  <IconButton theme="clear" shadow="none" icon={FaArrowLeft} ariaLabel="Back" />
);
const rightIcon = (
  <IconButton
    theme="clear"
    shadow="none"
    icon={FaBell}
    ariaLabel="Notifications"
  />
);

export const Default: Story = {
  args: {
    left: leftIcon,
    right: rightIcon,
  },
};

export const WithAvatar: Story = {
  args: {
    left: leftIcon,
    right: rightIcon,
    avatar: {
      name: "Davin Chiupka",
      onClick: () => alert("Avatar clicked"),
    },
  },
};

export const ThemedVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => (
          <Toolbar
            key={theme}
            {...args}
            theme={theme}
            title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
            left={leftIcon}
            right={rightIcon}
          />
        ))}
      </div>
    );
  },
};

export const RoundingVariants = (args) =>
  withVariants(Toolbar, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Toolbar, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
