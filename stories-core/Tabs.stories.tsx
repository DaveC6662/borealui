import React, { JSX, useMemo, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FaCode, FaImage, FaMusic } from "react-icons/fa";
import { Tabs } from "../src/index.core";
import type { TabsProps, Tab } from "../src/components/Tabs/Tabs.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
] as const;
const stateOptions = ["success", "error", "warning"] as const;
const roundingOptions = ["none", "small", "medium", "large"] as const;
const shadowOptions = ["none", "light", "medium", "strong", "intense"] as const;

type PanelMap = Record<number, React.ReactNode>;

const tabsWithIcons: Tab[] = [
  { label: "Code", icon: FaCode },
  { label: "Music", icon: FaMusic },
  { label: "Images", icon: FaImage },
];

const tabsWithoutIcons: Tab[] = [
  { label: "Overview" },
  { label: "Details" },
  { label: "Settings" },
];

const panelsWithIcons: PanelMap = {
  0: <div>Code content goes here.</div>,
  1: <div>Music player or list here.</div>,
  2: <div>Gallery or image preview here.</div>,
};

const panelsWithoutIcons: PanelMap = {
  0: <p>Overview content.</p>,
  1: <p>Details content.</p>,
  2: <p>Settings content.</p>,
};

type TabsWithPanelProps = TabsProps & {
  panels: PanelMap;
  idBase?: string;
};

function TabsWithPanel({
  panels,
  idBase = "storybook-tabs",
  defaultIndex = 0,
  value,
  onChange,
  ...args
}: TabsWithPanelProps): JSX.Element {
  const isControlled = typeof value === "number";
  const [active, setActive] = useState<number>(defaultIndex);

  const currentIndex = isControlled ? (value as number) : active;

  const handleChange = (index: number): void => {
    if (!isControlled) setActive(index);
    onChange?.(index);
  };

  const panel = useMemo<React.ReactNode>(() => {
    return panels[currentIndex] ?? null;
  }, [panels, currentIndex]);

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <Tabs
        {...args}
        idBase={idBase}
        value={currentIndex}
        onChange={handleChange}
      />

      <div
        role="tabpanel"
        id={`${idBase}-panel-${currentIndex}`}
        aria-labelledby={`${idBase}-tab-${currentIndex}`}
        tabIndex={0}
        style={{
          padding: "1rem",
          border: "1px solid rgba(120,120,120,0.25)",
          borderRadius: 12,
        }}
      >
        {panel}
      </div>
    </div>
  );
}

const meta: Meta<TabsProps> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    theme: "primary",
    size: "medium",
    defaultIndex: 0,
    tabs: tabsWithIcons,
  },
  argTypes: {
    tabs: {
      control: false,
      description:
        "Array of tab objects. Each tab includes at least a `label`, and optionally `icon` or `disabled`. Panel content is rendered by the parent.",
      table: { category: "Data", type: { summary: "TabItem[]" } },
    },
    defaultIndex: {
      control: { type: "number", min: 0 },
      description:
        "Uncontrolled: index of the tab that is active by default (internal state).",
      table: {
        category: "State",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    value: {
      control: { type: "number", min: 0 },
      description: "Controlled: the active tab index.",
      table: { category: "State", type: { summary: "number" } },
    },
    onChange: {
      action: "changed",
      description:
        "Callback fired when the active tab changes. Receives the tab index.",
      table: { category: "Events" },
    },
    idBase: {
      control: "text",
      description:
        "Base used to generate tab/panel ids for aria wiring: `${idBase}-tab-${i}` and `${idBase}-panel-${i}`.",
      table: { category: "Accessibility" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant for the tabs.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description:
        "Visual state variant for tabs (applies state color styling).",
      table: { category: "Appearance" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the tabs and their labels.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for tab buttons.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the tabs container.",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Additional class names for the outermost tabs container.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Test ID for the root element (for testing utilities).",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

export const Default: Story = {
  render: (args) => (
    <TabsWithPanel
      {...args}
      idBase="tabs-default"
      tabs={tabsWithIcons}
      panels={panelsWithIcons}
    />
  ),
};

export const NoIcons: Story = {
  args: {
    tabs: tabsWithoutIcons,
  },
  render: (args) => (
    <TabsWithPanel
      {...args}
      idBase="tabs-without-icons"
      tabs={tabsWithoutIcons}
      panels={panelsWithoutIcons}
    />
  ),
};

export const ThemeVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {themeOptions.map((theme) => (
          <TabsWithPanel
            key={theme}
            {...args}
            idBase={`tabs-theme-${theme}`}
            theme={theme}
            tabs={tabsWithIcons}
            panels={panelsWithIcons}
          />
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {stateOptions.map((state) => (
          <TabsWithPanel
            key={state}
            {...args}
            idBase={`tabs-state-${state}`}
            state={state}
            tabs={tabsWithIcons}
            panels={panelsWithIcons}
          />
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {sizes.map((size) => (
          <TabsWithPanel
            key={size}
            {...args}
            idBase={`tabs-size-${size}`}
            size={size}
            tabs={tabsWithIcons}
            panels={panelsWithIcons}
          />
        ))}
      </div>
    );
  },
};

export const WithOnChange: Story = {
  render: (args) => (
    <TabsWithPanel
      {...args}
      idBase="tabs-onchange"
      tabs={tabsWithIcons}
      panels={panelsWithIcons}
      onChange={(index) => {
        args.onChange?.(index);
      }}
    />
  ),
};

export const RoundingVariants = (args: TabsProps) =>
  withVariants(Tabs, { ...args, tabs: tabsWithIcons }, [
    { propName: "rounding", values: roundingOptions as unknown as string[] },
  ]);

export const ShadowVariants = (args: TabsProps) =>
  withVariants(Tabs, { ...args, tabs: tabsWithIcons }, [
    { propName: "shadow", values: shadowOptions as unknown as string[] },
  ]);
