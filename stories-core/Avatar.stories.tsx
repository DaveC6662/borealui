import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/index.core";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import {
  FaVideo,
  FaMicrophone,
  FaUsers,
  FaUmbrellaBeach,
  FaKeyboard,
  FaVolumeUp,
  FaEye,
  FaStar,
} from "react-icons/fa";
import {
  SizeType,
  StatusPositionType,
  StatusType,
  ThemeType,
} from "@/types/types";
import { IconType } from "react-icons";

// Prop options
const themeOptions = [
  ...["primary", "secondary", "success", "error", "warning", "clear"],
] as string[];
const sizeOptions = [...["xs", "small", "medium", "large", "xl"]] as string[];
const shapeOptions = [...["circle", "rounded", "square"]] as string[];
const statusOptions = [
  ...[
    "online",
    "idle",
    "offline",
    "busy",
    "in-a-meeting",
    "on-vacation",
    "streaming",
    "recording",
    "typing",
    "speaking",
    "viewing",
    "custom",
  ],
] as string[];
const statusPositionOptions = [
  ...["topLeft", "topRight", "bottomLeft", "bottomRight"],
] as string[];

const iconMap = {
  streaming: <FaVideo />,
  recording: <FaMicrophone />,
  "in-a-meeting": <FaUsers />,
  "on-vacation": <FaUmbrellaBeach />,
  typing: <FaKeyboard />,
  speaking: <FaVolumeUp />,
  viewing: <FaEye />,
  custom: <FaStar />,
};

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    src: { control: "text" },
    size: { control: "select", options: sizeOptions },
    theme: { control: "select", options: themeOptions },
    shape: { control: "select", options: shapeOptions },
    status: { control: "select", options: [...statusOptions, undefined] },
    statusPosition: { control: "select", options: statusPositionOptions },
    alt: { control: "text" },
    label: { control: "text" },
    fallback: { control: "text" },
    children: { control: "text" },
    href: { control: "text" },
    outline: { control: "boolean" },
    priority: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const baseArgs = {
  name: "Davin Chiupka",
  theme: "primary" as ThemeType,
  size: "medium" as SizeType,
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

export const WithImage: Story = {
  args: {
    ...baseArgs,
    src: "https://i.pravatar.cc/150?img=12",
    shape: "circle",
    theme: "secondary",
  },
};

export const WithHref: Story = {
  args: {
    ...baseArgs,
    href: "https://github.com",
    shape: "square",
    status: "online",
  },
};

export const WithFallback: Story = {
  args: {
    ...baseArgs,
    fallback: "👤",
    src: "broken-link.png",
  },
};

export const WithChildren: Story = {
  args: {
    ...baseArgs,
    children: <strong>👽</strong>,
    theme: "warning",
    shape: "circle",
  },
};

export const WithStatusIcon: Story = {
  args: {
    ...baseArgs,
    statusIcon: <span style={{ fontSize: 12 }}>⭐</span>,
    theme: "secondary",
    shape: "square",
    size: "large",
  },
};

export const StatusPositionVariants = () => (
  <StoryGrid title="Status Positions" columns={4}>
    {statusPositionOptions.map((pos) => (
      <Avatar
        key={pos}
        {...baseArgs}
        status="online"
        statusPosition={pos as StatusPositionType}
        theme="primary"
        shape="circle"
      />
    ))}
  </StoryGrid>
);

export const OutlineVariants = () =>
  withVariants(
    Avatar,
    {
      name: "Outlined Avatar",
      size: "medium",
      shape: "circle",
      outline: true,
    },
    [
      {
        propName: "theme",
        values: themeOptions,
      },
    ]
  );

export const ThemeVariants = () =>
  withVariants(Avatar, { ...baseArgs }, [
    {
      propName: "theme",
      values: themeOptions,
    },
  ]);

export const SizeVariants = () =>
  withVariants(Avatar, { ...baseArgs }, [
    {
      propName: "size",
      values: sizeOptions,
    },
  ]);

export const ShapeVariants = () =>
  withVariants(
    Avatar,
    {
      name: "Davin Chiupka",
      theme: "primary",
      size: "medium",
      shape: "circle",
    },
    [
      {
        propName: "shape",
        values: shapeOptions,
      },
    ]
  );

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {statusOptions.map((status) => (
        <div key={status} style={{ textAlign: "center" }}>
          <Avatar
            name={status}
            status={status as StatusType}
            statusIcon={iconMap[status as keyof typeof iconMap] ?? undefined}
          />
          <div style={{ fontSize: "0.75rem", marginTop: 4 }}>{status}</div>
        </div>
      ))}
    </div>
  ),
};
