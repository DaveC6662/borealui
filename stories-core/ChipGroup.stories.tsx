import { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { ChipGroup } from "../src/index.core";
import type {
  ChipGroupProps,
  ChipGroupRef,
} from "../src/components/Chip/ChipGroup/ChipGroup.types";
import { ChipProps } from "../src/components/Chip/Chip.types";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

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
  argTypes: {
    chips: {
      description: "Array of chip objects to display in the group.",
      control: false,
      table: { category: "Content" },
    },
    onRemove: {
      description: "Callback fired when a chip's close button is clicked.",
      action: "removed",
      control: false,
      table: { category: "Events" },
    },
    position: {
      description:
        "Position of the group on the screen (used for toast/fixed display).",
      control: { type: "select" },
      options: [
        "topLeft",
        "topCenter",
        "topRight",
        "bottomLeft",
        "bottomCenter",
        "bottomRight",
      ],
      table: { category: "Layout" },
    },
    size: {
      description: "Size for all chips in the group.",
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      table: { category: "Appearance" },
    },
    className: {
      description:
        "Additional CSS class names to apply to the group container.",
      control: "text",
      table: { category: "Appearance" },
    },
  },
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

const allThemes: ChipProps["theme"][] = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "clear",
];

const positions: ChipGroupProps["position"][] = [
  "topLeft",
  "topCenter",
  "topRight",
  "bottomLeft",
  "bottomCenter",
  "bottomRight",
];

const defaultChips: ChipProps[] = [
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
    const [chips, setChips] = useState<ChipProps[]>(defaultChips);

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
    const [chips, setChips] = useState<ChipProps[]>(defaultChips);

    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() =>
            setChips((prev) => [
              ...prev,
              createChip("Ref chip at " + new Date().toLocaleTimeString(), {
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

export const PositionVariants = () => (
  <StoryGrid title="Position Variants">
    {positions.map((position) => (
      <ChipGroup
        key={position}
        position={position}
        chips={[
          createChip(`Position: ${position}`, {
            theme: "primary",
            autoClose: false,
          }),
        ]}
      />
    ))}
  </StoryGrid>
);

export const WithClassName: Story = {
  render: () => {
    return (
      <ChipGroup
        chips={[createChip("ClassName Chip", { theme: "secondary" })]}
        position="topRight"
        className="storybook-chip-group-custom"
        onRemove={() => {}}
      />
    );
  },
};
