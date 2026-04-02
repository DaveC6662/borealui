import { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton, Toolbar } from "../src/index.core";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import type { ToolbarBaseProps } from "../src/components/Toolbar/Toolbar.types";
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
};

export default meta;
type Story = StoryObj<ToolbarBaseProps>;

const leftIcon = (
  <IconButton
    theme="clear"
    shadow="none"
    icon={FaArrowLeft}
    aria-label="Back"
  />
);
const rightIcon = (
  <IconButton
    theme="clear"
    shadow="none"
    icon={FaBell}
    aria-label="Notifications"
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
