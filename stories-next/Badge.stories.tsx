import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "../src/index.next";
import { FaCheck, FaExclamation, FaInfoCircle } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import type { SizeType, StateType, ThemeType } from "../src/types/types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];
const stateOptions = ["success", "error", "warning"];
const sizeOptions = ["xs", "small", "medium", "large", "xl"];

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    theme: { control: "select", options: themeOptions },
    state: { control: "select", options: [...stateOptions, ""] },
    size: { control: "select", options: sizeOptions },
    outline: { control: "boolean" },
    icon: { control: false },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const defaultArgs = {
  text: "Badge",
  theme: "primary" as ThemeType,
  state: "" as StateType,
  size: "medium" as SizeType,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Badge text="Check" icon={FaCheck} state="success" />
      <Badge text="Warning" icon={FaExclamation} state="warning" />
      <Badge text="Info" icon={FaInfoCircle} theme="primary" />
    </div>
  ),
};

export const WithOnClick: Story = {
  args: {
    ...defaultArgs,
    text: "Clickable Badge",
    onClick: () => alert("Badge clicked!"),
    theme: "success" as ThemeType,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    title: "Disabled Badge",
    disabled: true,
  },
};

export const ThemeVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "theme", values: themeOptions },
  ]);

export const StateVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "state", values: stateOptions },
  ]);

export const SizeVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "size", values: sizeOptions },
  ]);

export const OutlineVariants = () =>
  withVariants(
    Badge,
    {
      ...defaultArgs,
      outline: true,
    },
    [{ propName: "theme", values: [...themeOptions, ...stateOptions] }]
  );
