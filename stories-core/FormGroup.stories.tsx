import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import FormGroup from "@/components/FormGroup/core/FormGroup"; 
import TextInput from "@/components/TextInput/core/TextInput"; 
import Button from "@/components/Buttons/Button/core/Button";

import type { FormGroupProps } from "@/components/FormGroup/FormGroup.types";

const meta: Meta<FormGroupProps> = {
  title: "Components/FormGroup",
  component: FormGroup,
  tags: ["autodocs"],
  args: {
    label: "Username",
    id: "username",
    required: true,
    layout: "vertical",
    spacing: "medium",
  },
};

export default meta;

type Story = StoryObj<FormGroupProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <FormGroup {...args}>
        <TextInput value={value} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)} />
      </FormGroup>
    );
  },
};

export const WithDescription: Story = {
  args: {
    description: "Enter your preferred display name.",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <FormGroup {...args}>
        <TextInput value={value} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)} />
      </FormGroup>
    );
  },
};

export const WithError: Story = {
  args: {
    error: "Username is required.",
  },
  render: (args) => {
    return (
      <FormGroup {...args}>
        <TextInput value="" onChange={() => {}} />
      </FormGroup>
    );
  },
};

export const HorizontalLayout: Story = {
  args: {
    layout: "horizontal",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <FormGroup {...args}>
        <TextInput value={value} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)} />
      </FormGroup>
    );
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    description: "Screen reader-only label",
  },
  render: (args) => {
    return (
      <FormGroup {...args}>
        <TextInput value="" onChange={() => {}} />
      </FormGroup>
    );
  },
};

export const WithController: Story = {
  args: {
    label: "Promo Code",
    controller: <Button size="small">Apply</Button>,
  },
  render: (args) => {
    return (
      <FormGroup {...args}>
        <TextInput value="" onChange={() => {}} />
      </FormGroup>
    );
  },
};
