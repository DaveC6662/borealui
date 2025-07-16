import { Meta, StoryObj } from "@storybook/nextjs";
import { ScrollToTop } from "../src/index.core";

const meta: Meta = {
  title: "Components/ScrollToTopButton",
  component: ScrollToTop,
  tags: ["autodocs"],
  args: {
    rounding: "large",
    shadow: "light",
  },
  argTypes: {
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Corner rounding for the button.",
      table: { category: "Appearance", defaultValue: { summary: "large" } },
      type: { name: "string", required: false },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow style for the button.",
      table: { category: "Appearance", defaultValue: { summary: "light" } },
      type: { name: "string", required: false },
    },
    IconComponent: {
      control: false,
      description: "Icon to display in the button.",
      table: { category: "Content" },
      type: { name: "string", required: true },
    },
    offset: {
      control: { type: "number", min: 0, step: 10 },
      description: "Scroll offset (in px) before the button appears.",
      table: { category: "Behavior", defaultValue: { summary: "300" } },
      type: { name: "number", required: false },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    rounding: "none",
  },

  render: (args) => (
    <div
      style={{
        height: "200vh",
        padding: "2rem",
      }}
    >
      <p style={{ maxWidth: 600 }}>
        Scroll down the page to make the ScrollToTopButton appear. This demo
        uses a tall container to simulate a real scroll environment.
      </p>
      <ScrollToTop {...args} />
    </div>
  ),
};
