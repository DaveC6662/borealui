// src/stories/ChipGroup.stories.tsx

import { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChipGroup } from "@/index.core";
import type {
  ChipGroupProps,
  ChipGroupRef,
} from "@/components/Chip/ChipGroup/ChipGroup.types";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { ChipProps } from "@/components/Chip/Chip.types";

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

const createChip = (
  message: string,
  overrides: Partial<ChipProps> = {}
): ChipProps => ({
  id: crypto.randomUUID(),
  visible: true,
  message,
  autoClose: true,
  ...overrides,
});

const initialChips: ChipProps[] = [
  createChip("Success message!", {
    theme: "success",
    icon: FaCheckCircle,
    duration: 4000,
  }),
  createChip("Something went wrong!", {
    theme: "error",
    icon: FaExclamationTriangle,
    autoClose: false,
  }),
];

export const Default: Story = {
  render: () => {
    const [chips, setChips] = useState<ChipProps[]>(initialChips);

    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() =>
            setChips((prev) => [
              ...prev,
              createChip("New chip at " + new Date().toLocaleTimeString(), {
                theme: "primary",
              }),
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
    const [chips, setChips] = useState<ChipProps[]>(initialChips);

    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() =>
            setChips((prev) => [
              ...prev,
              createChip("Ref-added chip " + new Date().toLocaleTimeString(), {
                theme: "secondary",
              }),
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
    const [chips, setChips] = useState<ChipProps[]>([
      createChip("Positioned bottom-left!", { theme: "primary" }),
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
