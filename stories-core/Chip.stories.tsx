// src/stories/Chip.stories.tsx

import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Chip } from "../src/index.core";
import { FaCheckCircle } from "react-icons/fa";
import {
  PositionType,
  RoundingType,
  ShadowType,
  StateType,
  ThemeType,
} from "../src/types/types";
import { ChipBaseProps } from "../src/components/Chip/Chip.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const positions: PositionType[] = [
  "topLeft",
  "topCenter",
  "topRight",
  "bottomLeft",
  "bottomCenter",
  "bottomRight",
];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<ChipBaseProps> = {
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
  argTypes: {
    id: { control: "text" },
    message: { control: "text" },
    visible: { control: "boolean" },
    onClose: { action: "closed" },
    icon: { control: false },
    closeIcon: { control: false },
    size: {
      control: "select",
      options: ["xs", "small", "medium", "large", "xl"],
    },
    theme: { control: "select", options: themeOptions },
    state: { control: "select", options: ["", ...stateOptions] },
    rounding: { control: "select", options: roundingOptions },
    shadow: { control: "select", options: shadowOptions },
    position: { control: "select", options: positions },
    usePortal: { control: "boolean" },
    className: { control: "text" },
    autoClose: { control: "boolean" },
    duration: { control: "number" },
    "data-testid": { control: "text" },
  },
};

export default meta;

type Story = StoryObj<ChipBaseProps>;

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
          usePortal={true}
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
          {themeOptions.map((theme) => (
            <button
              key={theme}
              onClick={() => setVisibleTheme(theme as ThemeType)}
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

export const States: Story = {
  render: () => {
    const [visibleState, setVisibleState] = useState<StateType | null>(null);

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {stateOptions.map((theme) => (
            <button
              key={theme}
              onClick={() => setVisibleState(theme as StateType)}
              className="p-2 border rounded"
            >
              {theme}
            </button>
          ))}
        </div>

        {visibleState && (
          <Chip
            id="theme-chip"
            message={`State: ${visibleState}`}
            theme={visibleState}
            position="topRight"
            visible={true}
            onClose={() => setVisibleState(null)}
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

export const RoundingVariants: Story = {
  render: () => {
    const [visibleRounding, setVisibleRounding] = useState<RoundingType | null>(
      null
    );

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {roundingOptions.map((rounding) => (
            <button
              key={rounding}
              onClick={() => setVisibleRounding(rounding as RoundingType)}
              className="p-2 border rounded"
            >
              {rounding}
            </button>
          ))}
        </div>

        {visibleRounding && (
          <Chip
            id="rounding-chip"
            message={`Rounding: ${visibleRounding}`}
            theme="primary"
            rounding={visibleRounding}
            position="topRight"
            visible={true}
            onClose={() => setVisibleRounding(null)}
            autoClose={false}
            icon={FaCheckCircle}
          />
        )}
      </>
    );
  },
};

export const ShadowVariants: Story = {
  render: () => {
    const [visibleShadow, setVisibleShadow] = useState<ShadowType | null>(null);

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {shadowOptions.map((shadow) => (
            <button
              key={shadow}
              onClick={() => setVisibleShadow(shadow as ShadowType)}
              className="p-2 border rounded"
            >
              {shadow}
            </button>
          ))}
        </div>

        {visibleShadow && (
          <Chip
            id="shadow-chip"
            message={`Shadow: ${visibleShadow}`}
            theme="primary"
            shadow={visibleShadow}
            position="topRight"
            visible={true}
            onClose={() => setVisibleShadow(null)}
            autoClose={false}
            icon={FaCheckCircle}
          />
        )}
      </>
    );
  },
};
