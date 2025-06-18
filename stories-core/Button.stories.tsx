import { Meta, StoryObj } from "@storybook/nextjs";
import { FaPlus, FaCheck } from "react-icons/fa";
import { Button } from "../src/index.core";
import { ButtonProps } from "../src/components/Button/Button.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";
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
    theme: "primary",
    size: "medium",
  },
};

const defaultArgs = {
  title: "Sample Button",
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
