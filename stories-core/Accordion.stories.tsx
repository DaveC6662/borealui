import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../src/index.core";
import { withVariants } from "../.storybook-core/helpers/withVariants";
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

const stateOptions = ["", "success", "error", "warning"];
const sizeOptions = ["xs", "small", "medium", "large", "xl"];
const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "Accordion summary or heading text.",
      control: "text",
      table: { category: "Content" },
    },
    id: {
      description: "HTML id for the accordion (for accessibility).",
      control: "text",
      table: { category: "Accessibility" },
    },
    description: {
      description: "Optional description below the title.",
      control: "text",
      table: { category: "Content" },
    },
    children: {
      description: "Content to display inside the expanded accordion.",
      control: false,
      table: { category: "Content" },
    },
    theme: {
      description: "Visual theme of the accordion.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description:
        "Visual state for semantic meaning (success, warning, error).",
      control: { type: "select" },
      options: stateOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Shadow effect for the accordion container.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Corner radius of the accordion container.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    size: {
      description: "Overall size of the accordion.",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    initiallyExpanded: {
      description: "If true, accordion is expanded by default.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    expanded: {
      description: "Manually control expanded state (controlled mode).",
      control: "boolean",
      table: { category: "Behavior" },
    },
    outline: {
      description: "Show outline border style.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    disabled: {
      description: "Disable interaction and dim the accordion.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    isToggleable: {
      description: "If false, accordion cannot be collapsed.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    asyncContent: {
      description: "Simulate async content loading when expanded.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    lazyLoad: {
      description: "Only render children when expanded.",
      control: "boolean",
      table: { category: "Performance" },
    },
    iconPosition: {
      description: "Position of expand/collapse icon.",
      control: { type: "radio" },
      options: ["left", "right"],
      table: { category: "Appearance" },
    },
    customExpandedIcon: {
      description: "Custom icon to show when expanded.",
      control: "text",
      table: { category: "Appearance" },
    },
    customCollapsedIcon: {
      description: "Custom icon to show when collapsed.",
      control: "text",
      table: { category: "Appearance" },
    },
    className: {
      description: "Custom CSS class for styling.",
      control: "text",
      table: { category: "Appearance" },
    },
    onToggle: {
      description: "Callback fired when expanded/collapsed state changes.",
      action: "onToggle",
      table: { category: "Events" },
    },
    "data-testid": {
      description: "Test ID for test automation.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const defaultArgs = {
  title: "Sample Accordion",
  children: <p>This is the content revealed when expanded.</p>,
  size: "medium" as SizeType,
  theme: "primary" as ThemeType,
  state: "" as StateType,
  rounding: "medium" as RoundingType,
  shadow: "medium" as ShadowType,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    title: "Default Accordion",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Accordion
        {...args}
        expanded={open}
        onToggle={(val: boolean | ((prev: boolean) => boolean)) =>
          setOpen(typeof val === "function" ? val(open) : val)
        }
        customCollapsedIcon="⏵"
        customExpandedIcon="⏷"
      />
    );
  },
  args: {
    ...defaultArgs,
    title: "Controlled Accordion",
    children: <p>This accordion is fully controlled via external state.</p>,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    title: "Disabled Accordion",
    disabled: true,
  },
};

export const LazyAndAsync: Story = {
  args: {
    title: "Lazy & Async Accordion",
    lazyLoad: true,
    asyncContent: true,
    initiallyExpanded: false,
    children: (
      <div>
        <p>
          This content is both <strong>lazy-loaded</strong> and{" "}
          <strong>async-loaded</strong>.
        </p>
        <p>
          It will not render into the DOM until the accordion is expanded, and
          then simulates a delay to fetch content.
        </p>
        <p>
          After a short simulated loading period, the content appears. You can
          customize this delay or replace it with a real fetch call.
        </p>
      </div>
    ),
  },
};

export const ThemeVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "theme", values: [...themeOptions] },
  ]);

export const StateVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "state", values: stateOptions },
  ]);

export const SizeVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "size", values: sizeOptions },
  ]);

export const OutlineVariants = () =>
  withVariants(
    Accordion,
    {
      ...defaultArgs,
      outline: true,
    },
    [{ propName: "theme", values: [...themeOptions, ...stateOptions] }]
  );

export const LotsOfContent: Story = {
  args: {
    ...defaultArgs,
    title: "Accordion With Lots of Content",
    initiallyExpanded: false,
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada.
        </p>
        {[...Array(10)].map((_, i) => (
          <p key={i}>
            This is paragraph #{i + 1} of the accordion content. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas.
          </p>
        ))}
        <ul>
          {["Item A", "Item B", "Item C", "Item D", "Item E"].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>
          End of content. Scroll or expand/collapse the accordion to test
          transitions and max-height handling.
        </p>
      </div>
    ),
  },
};

export const LazyLoadContent: Story = {
  args: {
    title: "Lazy Loaded Accordion",
    lazyLoad: true,
    initiallyExpanded: false,
    children: (
      <div>
        <p>
          This content is <strong>not rendered</strong> in the DOM until the
          accordion is expanded.
        </p>
        <p>
          Try inspecting the DOM before expanding — the content won't exist
          until you open it.
        </p>
      </div>
    ),
  },
};

export const IconOnLeft: Story = {
  args: {
    title: "Icon on the Left",
    iconPosition: "left",
    initiallyExpanded: true,
    customCollapsedIcon: "▶",
    customExpandedIcon: "▼",
    children: (
      <p>
        The expand/collapse icon appears <strong>to the left</strong> of the
        title.
      </p>
    ),
  },
};

export const NonToggleableAccordion: Story = {
  args: {
    title: "Non-Toggleable Accordion",
    initiallyExpanded: true,
    isToggleable: false,
    children: (
      <p>
        Once opened, this accordion cannot be closed. This is useful for locked
        or non-interruptible sections.
      </p>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    title: "Accordion with Screen Reader Description",
    description: "This section contains tips for screen reader users.",
    initiallyExpanded: false,
    children: (
      <p>
        The description prop is visually hidden but read aloud to users of
        assistive technologies.
      </p>
    ),
  },
};

export const RoundingVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);
