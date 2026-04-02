import { Meta, StoryObj } from "@storybook/nextjs-vite";
import CircularProgress from "../src/components/CircularProgress/next/CircularProgress";
import type { CircularProgressProps } from "../src/components/CircularProgress/CircularProgress.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

const sizeOptions = ["xs", "small", "medium", "large", "xl"] as const;

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<CircularProgressProps> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  args: {
    value: 75,
    min: 0,
    max: 100,
    label: "Progress",
    shadow: "none",
    showRaw: false,
    size: "medium",
    theme: "primary",
    state: "",
    className: "",
    "data-testid": "circular-progress",
  },
  argTypes: {
    value: {
      description:
        "Current value shown in the circular progress (usually a percentage).",
      control: "number",
      table: { category: "Main" },
    },
    min: {
      description: "Minimum value for the progress range (default: 0).",
      control: "number",
      table: { category: "Main" },
    },
    max: {
      description: "Maximum value for the progress range (default: 100).",
      control: "number",
      table: { category: "Main" },
    },
    label: {
      description:
        "Optional label displayed below or inside the circular progress.",
      control: "text",
      table: { category: "Content" },
    },
    shadow: {
      description: "Visual shadow depth for the component.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    showRaw: {
      description:
        "Show the raw numeric value instead of the formatted percentage.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    size: {
      description: "Size of the circular progress indicator.",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    theme: {
      description: "Visual theme of the component.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "Status color: '', success, error, or warning.",
      control: { type: "select" },
      options: ["", ...stateOptions],
      table: { category: "Appearance" },
    },
    className: {
      description: "Additional CSS class names for custom styling.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test ID for targeting the component in tests.",
      control: "text",
      table: { category: "Advanced" },
    },
  },
};

export default meta;
type Story = StoryObj<CircularProgressProps>;

const defaultArgs: CircularProgressProps = {
  value: 75,
  label: "Progress Score",
};

export const Default: Story = {};

export const ShowRawScore: Story = {
  args: {
    ...defaultArgs,
    showRaw: true,
  },
};

export const LowScore: Story = {
  args: {
    ...defaultArgs,
    value: 32,
    label: "Low Score",
  },
};

export const WarningZone: Story = {
  args: {
    ...defaultArgs,
    value: 58,
    label: "Warning Score",
  },
};

export const HighScore: Story = {
  args: {
    ...defaultArgs,
    value: 95,
    label: "Excellent Score",
  },
};

export const CustomRange: Story = {
  args: {
    value: 7,
    min: 0,
    max: 10,
    showRaw: true,
    label: "Custom Scale (0–10)",
  },
};

// Variant grid
export const SizeVariants = () =>
  withVariants(CircularProgress, defaultArgs, [
    { propName: "size", values: [...sizeOptions] },
  ]);

export const ThemeVariants = () => (
  <StoryGrid title="Theme Variants">
    {themeOptions.map((theme) => (
      <CircularProgress
        key={theme}
        value={76}
        theme={theme}
        label={`Theme: ${theme}`}
      />
    ))}
  </StoryGrid>
);

export const StateVariants = () => (
  <StoryGrid title="State Variants">
    {stateOptions.map((state) => (
      <CircularProgress
        key={state}
        value={76}
        theme={state}
        label={`State: ${state}`}
      />
    ))}
  </StoryGrid>
);

export const ScoreRangeVariants = () => (
  <StoryGrid title="Various Scores">
    <CircularProgress value={15} label="Very Low" />
    <CircularProgress value={45} label="Below Avg" />
    <CircularProgress value={70} label="Okay" />
    <CircularProgress value={85} label="Strong" />
    <CircularProgress value={100} label="Perfect!" />
  </StoryGrid>
);

export const WithShowRaw = () => (
  <StoryGrid title="With Raw Value">
    <CircularProgress value={18} showRaw label="Raw: 18" />
    <CircularProgress value={56} showRaw label="Raw: 56" />
    <CircularProgress value={99} showRaw label="Raw: 99" />
  </StoryGrid>
);

export const CustomMinMaxExamples = () => (
  <StoryGrid title="Custom Min/Max">
    <CircularProgress value={3} min={0} max={5} label="Out of 5" showRaw />
    <CircularProgress value={7.5} min={0} max={10} label="Out of 10" showRaw />
    <CircularProgress value={43} min={0} max={50} label="Out of 50" showRaw />
  </StoryGrid>
);

export const ShadowVariants = () =>
  withVariants(CircularProgress, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);

export const WithClassName: Story = {
  args: {
    ...defaultArgs,
    className: "storybook-circular-progress",
    value: 88,
    label: "With Custom Class",
  },
};

export const WithDataTestid: Story = {
  args: {
    ...defaultArgs,
    "data-testid": "circular-progress-test-id",
    value: 55,
    label: "With Data Testid",
  },
};
