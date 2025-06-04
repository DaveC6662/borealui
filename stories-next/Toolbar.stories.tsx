import { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton, Toolbar } from "../src/index.next";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import type { ToolbarProps } from "../src/components/Toolbar/Toolbar.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const meta: Meta<ToolbarProps> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  args: {
    title: "Dashboard",
    theme: "primary",
  },
};

export default meta;
type Story = StoryObj<ToolbarProps>;

const leftIcon = (
  <IconButton theme="clear" icon={FaArrowLeft} ariaLabel="Back" />
);
const rightIcon = (
  <IconButton theme="clear" icon={FaBell} ariaLabel="Notifications" />
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
