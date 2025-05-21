import type { Meta, StoryObj } from "@storybook/react";
import { FaCheck, FaExclamation, FaInfoCircle } from "react-icons/fa";
import { Badge } from "../src/index.core";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    text: "Badge",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: "Default",
    theme: "primary",
  },
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Badge text="Primary" theme="primary" />
      <Badge text="Secondary" theme="secondary" />
      <Badge text="Success" theme="success" />
      <Badge text="Warning" theme="warning" />
      <Badge text="Error" theme="error" />
      <Badge text="Clear" theme="clear" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge text="XS" size="xs" />
      <Badge text="Small" size="small" />
      <Badge text="Medium" size="medium" />
      <Badge text="Large" size="large" />
      <Badge text="XL" size="xl" />
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Badge text="Primary" theme="primary" outline />
      <Badge text="Secondary" theme="secondary" outline />
      <Badge text="Success" theme="success" outline />
      <Badge text="Warning" theme="warning" outline />
      <Badge text="Error" theme="error" outline />
      <Badge text="Clear" theme="clear" outline />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Badge text="Check" icon={FaCheck} theme="success" />
      <Badge text="Warning" icon={FaExclamation} theme="warning" />
      <Badge text="Info" icon={FaInfoCircle} theme="primary" />
    </div>
  ),
};
