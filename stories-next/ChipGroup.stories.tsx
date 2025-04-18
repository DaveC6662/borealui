// src/stories/ChipGroup.stories.tsx

import { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ChipGroup from "@/components/Chip/ChipGroup/next/ChipGroup";
import type {
  ChipGroupProps,
  ChipGroupRef,
  ChipItem,
} from "@/components/Chip/ChipGroup/ChipGroup.types";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const meta: Meta<ChipGroupProps> = {
  title: "Components/ChipGroup",
  component: ChipGroup,
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

type Story = StoryObj<ChipGroupProps>;

const initialChips: ChipItem[] = [
  {
    message: "Success message!",
    theme: "success",
    icon: FaCheckCircle,
    autoClose: true,
    duration: 4000,
  },
  {
    message: "Something went wrong!",
    theme: "error",
    icon: FaExclamationTriangle,
    autoClose: false,
  },
];

export const Default: Story = {
  render: () => {
    const [chips, setChips] = useState<ChipItem[]>(initialChips);

    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() =>
            setChips((prev) => [
              ...prev,
              {
                message: "New chip at " + new Date().toLocaleTimeString(),
                theme: "primary",
                autoClose: true,
              },
            ])
          }
        >
          Add Chip
        </button>
        <ChipGroup
          chips={chips}
          onRemove={(id) => setChips((prev) => prev.filter((c) => c.id !== id))}
        />
      </div>
    );
  },
};

export const WithRefCloseAll: Story = {
  render: () => {
    const ref = useRef<ChipGroupRef>(null);
    const [chips, setChips] = useState<ChipItem[]>(initialChips);

    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() =>
            setChips((prev) => [
              ...prev,
              {
                message: "Ref-added chip " + new Date().toLocaleTimeString(),
                theme: "secondary",
              },
            ])
          }
        >
          Add Chip
        </button>
        <button
          onClick={() => ref.current?.closeAllChips()}
          style={{ marginLeft: "1rem" }}
        >
          Close All
        </button>
        <ChipGroup
          ref={ref}
          chips={chips}
          onRemove={(id) => setChips((prev) => prev.filter((c) => c.id !== id))}
        />
      </div>
    );
  },
};

export const BottomLeftPosition: Story = {
  render: () => {
    const [chips, setChips] = useState<ChipItem[]>([
      {
        message: "Positioned bottom-left!",
        theme: "primary",
        autoClose: true,
      },
    ]);

    return (
      <div style={{ padding: "2rem" }}>
        <ChipGroup
          position="bottomLeft"
          chips={chips}
          onRemove={(id) => setChips((prev) => prev.filter((c) => c.id !== id))}
        />
      </div>
    );
  },
};
