import { Meta, StoryObj } from "@storybook/nextjs";
import { FaPlus } from "react-icons/fa";
import { Button } from "../src/index.next"; // adjust path if needed
import { ButtonProps } from "../src/components/Button/Button.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

const themeOptions = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "clear",
] as const;

const sizeOptions = ["xs", "small", "medium", "large", "xl"] as const;

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click Me",
    theme: "primary",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FaPlus,
    children: "Add Item",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
};

export const OutlineVariants = () => (
  <StoryGrid title="Outline Buttons">
    {themeOptions.map((theme) => (
      <Button key={theme} theme={theme} outline>
        {theme} Outline
      </Button>
    ))}
  </StoryGrid>
);

export const ThemeVariants = () => (
  <StoryGrid title="Theme Variants">
    {themeOptions.map((theme) => (
      <Button key={theme} theme={theme}>
        {theme}
      </Button>
    ))}
  </StoryGrid>
);

export const SizeVariants = () =>
  withVariants(Button, { size: "medium" }, [
    { propName: "size", values: [...sizeOptions] },
  ]);
