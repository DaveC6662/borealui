import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FormGroup, TextInput, Button } from "../src/index.next";
import type { FormGroupProps } from "../src/components/FormGroup/FormGroup.types";

const meta: Meta<FormGroupProps> = {
  title: "Components/FormGroup",
  component: FormGroup,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description:
        "Label for the form group. Required unless `hideLabel` is set.",
      table: { category: "Content" },
    },
    description: {
      control: "text",
      description:
        "Additional description or help text displayed below the inputs.",
      table: { category: "Content" },
    },
    error: {
      control: "text",
      description:
        "Error message to show below the inputs. If provided, shows in place of description.",
      table: { category: "State" },
    },
    id: {
      control: "text",
      description:
        "Unique id for accessibility, used for ARIA labelling and test ids.",
      table: { category: "Accessibility" },
    },
    required: {
      control: "boolean",
      description:
        "Marks the field as required, adds a visual indicator and aria-required.",
      table: { category: "State" },
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description:
        "Layout direction of the label and children: vertical (default) or horizontal.",
      table: { category: "Appearance" },
    },
    spacing: {
      control: "select",
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Spacing (gap) between children inside the group.",
      table: { category: "Appearance" },
    },
    hideLabel: {
      control: "boolean",
      description:
        "Visually hides the label but keeps it accessible for screen readers.",
      table: { category: "Accessibility" },
    },
    controller: {
      control: false,
      description:
        "JSX element rendered beside the first input (e.g., button, icon).",
      table: { category: "Content", type: { summary: "ReactNode" } },
    },
    children: {
      control: false,
      description: "Inputs or elements to render inside the form group.",
      table: { category: "Content", type: { summary: "ReactNode" } },
    },
    className: {
      control: "text",
      description: "Custom CSS class for the wrapper.",
      table: { category: "Appearance" },
    },
    "data-testid": {
      control: "text",
      description: "Custom test id for the root element.",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<FormGroupProps>;

export const LayoutVariants: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <FormGroup label="Vertical" id="layout-vertical" layout="vertical">
          <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        </FormGroup>
        <FormGroup
          label="Horizontal"
          id="layout-horizontal"
          layout="horizontal"
        >
          <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        </FormGroup>
      </div>
    );
  },
};

export const SpacingVariants: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const spacings = ["xs", "small", "medium", "large", "xl"] as const;

    return (
      <div style={{ display: "grid", gap: "2rem" }}>
        {spacings.map((spacing) => (
          <FormGroup
            key={spacing}
            label={`Spacing: ${spacing}`}
            id={`spacing-${spacing}`}
            spacing={spacing}
          >
            <TextInput
              placeholder="Text 1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextInput
              placeholder="Text 2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </FormGroup>
        ))}
      </div>
    );
  },
};

export const DescriptionVariants: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <FormGroup label="No Description" id="desc-none">
          <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        </FormGroup>
        <FormGroup
          label="With Description"
          id="desc-present"
          description="Helpful context goes here."
        >
          <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        </FormGroup>
      </div>
    );
  },
};

export const ErrorVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <FormGroup label="No Error" id="error-none">
          <TextInput value="" onChange={() => {}} />
        </FormGroup>
        <FormGroup
          label="With Error"
          id="error-present"
          error="This field is required"
        >
          <TextInput value="" onChange={() => {}} />
        </FormGroup>
      </div>
    );
  },
};

export const HideLabelVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <FormGroup label="Visible Label" id="label-visible">
          <TextInput value="" onChange={() => {}} />
        </FormGroup>
        <FormGroup
          label="Hidden Label"
          id="label-hidden"
          hideLabel
          description="Label is hidden but still available to screen readers"
        >
          <TextInput value="" onChange={() => {}} />
        </FormGroup>
      </div>
    );
  },
};

export const ControllerVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <FormGroup label="No Controller" id="ctrl-none">
          <TextInput value="" onChange={() => {}} />
        </FormGroup>
        <FormGroup
          label="With Controller"
          id="ctrl-present"
          controller={<Button size="small">Search</Button>}
        >
          <TextInput value="" onChange={() => {}} />
        </FormGroup>
      </div>
    );
  },
};
