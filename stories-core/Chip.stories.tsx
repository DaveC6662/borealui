// src/stories/Chip.stories.tsx

import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@/index.core";
import { FaCheckCircle } from "react-icons/fa";
import type { ChipProps } from "@/components/Chip/Chip.types";
import { PositionType, SizeType, ThemeType } from "@/types/types";

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

const themes: ThemeType[] = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "clear",
];

const positions: PositionType[] = [
  "topLeft",
  "topCenter",
  "topRight",
  "bottomLeft",
  "bottomCenter",
  "bottomRight",
];

const sizes: SizeType[] = ["xs", "small", "medium", "large", "xl"];

export default meta;

type Story = StoryObj<ChipProps>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Chip</button>
        <Chip
          id="default"
          message="This is a chip message!"
          visible={visible}
          onClose={() => setVisible(false)}
          autoClose={false}
        />
      </>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Chip with Icon</button>
        <Chip
          id="with-icon"
          message="Action completed successfully!"
          icon={FaCheckCircle}
          visible={visible}
          onClose={() => setVisible(false)}
          theme="success"
          autoClose={false}
        />
      </>
    );
  },
};

export const AutoClose: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <button onClick={() => setVisible(true)}>Show Auto-Close Chip</button>
        <Chip
          id="auto-close"
          message="This will disappear in 2 seconds..."
          visible={visible}
          onClose={() => setVisible(false)}
          duration={2000}
          autoClose={true}
        />
      </>
    );
  },
};

export const Themes: Story = {
  render: () => {
    const [visibleTheme, setVisibleTheme] = useState<ThemeType | null>(null);

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setVisibleTheme(theme)}
              className="p-2 border rounded"
            >
              {theme}
            </button>
          ))}
        </div>

        {visibleTheme && (
          <Chip
            id="theme-chip"
            message={`Theme: ${visibleTheme}`}
            theme={visibleTheme}
            position="topRight"
            visible={true}
            onClose={() => setVisibleTheme(null)}
            autoClose={false}
            icon={FaCheckCircle}
          />
        )}
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [visiblePosition, setVisiblePosition] = useState<PositionType | null>(
      null
    );

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {positions.map((position) => (
            <button
              key={position}
              onClick={() => setVisiblePosition(position)}
              className="p-2 border rounded"
            >
              {position}
            </button>
          ))}
        </div>

        {visiblePosition && (
          <Chip
            id="position-chip"
            message={`Position: ${visiblePosition}`}
            theme="primary"
            position={visiblePosition}
            visible={true}
            onClose={() => setVisiblePosition(null)}
            autoClose={false}
            icon={FaCheckCircle}
          />
        )}
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [visibleSize, setVisibleSize] = useState<SizeType | null>(null);

    return (
      <>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setVisibleSize(size)}
              className="p-2 border rounded"
            >
              {size}
            </button>
          ))}
        </div>

        {visibleSize && (
          <Chip
            id="size-chip"
            message={`Size: ${visibleSize}`}
            theme="primary"
            position="topRight"
            size={visibleSize}
            visible={true}
            onClose={() => setVisibleSize(null)}
            autoClose={false}
            icon={FaCheckCircle}
          />
        )}
      </>
    );
  },
};
