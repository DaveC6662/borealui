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

const stateOptions = ["success", "error", "warning"];
const sizeOptions = ["xs", "small", "medium", "large", "xl"];
const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "select", options: themeOptions },
    size: { control: "select", options: sizeOptions },
    initiallyExpanded: { control: "boolean" },
    outline: { control: "boolean" },
    disabled: { control: "boolean" },
    customExpandedIcon: { control: "text" },
    customCollapsedIcon: { control: "text" },
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
    initiallyExpanded: false,
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

// Theme Variants
export const ThemeVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "theme", values: [...themeOptions] },
  ]);

// State Variants
export const StateVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "state", values: stateOptions },
  ]);

// Size Variants
export const SizeVariants = () =>
  withVariants(Accordion, { ...defaultArgs }, [
    { propName: "size", values: sizeOptions },
  ]);

// Outline Variants (theme + outline = true)
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
