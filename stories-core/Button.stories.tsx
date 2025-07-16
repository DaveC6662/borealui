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
    children: {
      description: "Button label or node content.",
      control: "text",
      table: { category: "Content" },
    },
    icon: {
      description: "Optional icon component displayed in the button.",
      control: false,
      table: { category: "Content" },
    },
    theme: {
      description: "Visual theme color of the button.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "Visual state indicator (success, warning, error, etc).",
      control: { type: "select" },
      options: ["", ...stateOptions],
      table: { category: "Appearance" },
    },
    size: {
      description: "Size of the button.",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Rounding of the button corners.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Button shadow style.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    outline: {
      description: "If true, renders the button with an outline style.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    onClick: {
      description: "Click event handler.",
      action: "clicked",
      table: { category: "Events" },
    },
    className: {
      description: "Additional CSS class(es) for custom styling.",
      control: "text",
      table: { category: "Appearance" },
    },
    disabled: {
      description: "If true, disables the button.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    loading: {
      description: "If true, shows a loading spinner and disables interaction.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    fullWidth: {
      description: "If true, button stretches to 100% width of its container.",
      control: "boolean",
      table: { category: "Layout" },
    },
    href: {
      description: "If provided, renders the button as a link with this URL.",
      control: "text",
      table: { category: "Behavior" },
    },
    isExternal: {
      description:
        "If true, external link opens in a new tab (used with href).",
      control: "boolean",
      table: { category: "Behavior" },
    },
    type: {
      description: "Button type (button, submit, reset).",
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      table: { category: "Behavior" },
    },
    ariaLabel: {
      description: "Custom ARIA label for accessibility.",
      control: "text",
      table: { category: "Accessibility" },
    },
    "data-testid": {
      description: "Custom test ID for unit/integration tests.",
      control: "text",
      table: { category: "Testing" },
    },
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
