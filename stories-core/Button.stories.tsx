import { Meta, StoryObj } from "@storybook/nextjs";
import { FaPlus } from "react-icons/fa";
import { Button } from "../src/index.core";
import { ButtonProps } from "../src/components/Button/Button.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "../src/types/types";

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

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click Me",
    size: "medium" as SizeType,
    theme: "primary" as ThemeType,
    state: "" as StateType,
    rounding: "medium" as RoundingType,
    shadow: "medium" as ShadowType,
  },
  argTypes: {
    children: { control: "text" },
    icon: { control: false },
    theme: { control: "select", options: themeOptions },
    state: { control: "select", options: ["", ...stateOptions] },
    size: { control: "select", options: sizeOptions },
    rounding: { control: "select", options: roundingOptions },
    shadow: { control: "select", options: shadowOptions },
    outline: { control: "boolean" },
    onClick: { action: "clicked" },
    className: { control: "text" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    href: { control: "text" },
    isExternal: { control: "boolean" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    ariaLabel: { control: "text" },
    "data-testid": { control: "text" },
  },
};

const defaultArgs: ButtonProps = {
  children: "Click Me",
  size: "medium" as SizeType,
  theme: "primary" as ThemeType,
  state: "" as StateType,
  rounding: "medium" as RoundingType,
  shadow: "medium" as ShadowType,
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
    {stateOptions.map((theme) => (
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

export const StateVariants = () => (
  <StoryGrid title="State Variants">
    {stateOptions.map((state) => (
      <Button key={state} state={state}>
        {state}
      </Button>
    ))}
  </StoryGrid>
);

export const SizeVariants = () => (
  <StoryGrid title="Size Variants">
    {sizeOptions.map((size) => (
      <Button key={size} size={size}>
        Button {size}
      </Button>
    ))}
  </StoryGrid>
);

export const RoundingVariants = () => (
  <StoryGrid title="Rounding Variants">
    {roundingOptions.map((rounding) => (
      <Button key={rounding} rounding={rounding}>
        Rounding {rounding}
      </Button>
    ))}
  </StoryGrid>
);

export const ShadowVariants = () => (
  <StoryGrid title="Shadow Variants">
    {shadowOptions.map((shadow) => (
      <Button key={shadow} shadow={shadow}>
        Shadow {shadow}
      </Button>
    ))}
  </StoryGrid>
);

export const WithClassName: Story = {
  args: {
    ...defaultArgs,
    children: "Custom Class",
    className: "storybook-button-custom",
  },
};

export const WithHref: Story = {
  args: {
    ...defaultArgs,
    href: "https://example.com",
    children: "Link Button",
  },
};

export const WithExternalLink: Story = {
  args: {
    ...defaultArgs,
    href: "https://example.com",
    isExternal: true,
    children: "External Link",
  },
};

export const SubmitType: Story = {
  args: {
    ...defaultArgs,
    type: "submit",
    children: "Submit",
  },
};

export const WithAriaLabel: Story = {
  args: {
    ...defaultArgs,
    ariaLabel: "Custom Aria Label",
    children: "Accessible Button",
  },
};
