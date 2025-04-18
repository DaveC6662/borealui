// src/stories/Chip.stories.tsx

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Chip from "@/components/Chip/next/Chip";
import { FaCheckCircle } from "react-icons/fa";
import type { ChipProps } from "@/components/Chip/Chip.types";

const meta: Meta<ChipProps> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <div id="widget-portal" />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<ChipProps>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Chip</button>
        <Chip
          id="default"
          message="This is a chip message!"
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Chip</button>
        <Chip
          id="with-icon"
          message="Action completed successfully!"
          icon={FaCheckCircle}
          visible={visible}
          onClose={() => setVisible(false)}
          theme="success"
        />
      </>
    );
  },
};

export const AutoClose: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Auto-Close Chip</button>
        <Chip
          id="auto-close"
          message="This will disappear in 2 seconds..."
          visible={visible}
          onClose={() => setVisible(false)}
          duration={2000}
          autoClose
        />
      </>
    );
  },
};

export const CustomPositionAndTheme: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Top Right Warning</button>
        <Chip
          id="custom-pos"
          message="Watch out! This is a warning."
          visible={visible}
          onClose={() => setVisible(false)}
          theme="warning"
          position="topRight"
        />
      </>
    );
  },
};
