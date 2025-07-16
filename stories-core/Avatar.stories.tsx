import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar } from "../src/index.core";
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
  StateType,
  StatusPositionType,
  StatusType,
  ThemeType,
} from "../src/types/types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];
const stateOptions = ["success", "error", "warning"];
const sizeOptions = [...["xs", "small", "medium", "large", "xl"]] as string[];
const shapeOptions = [...["circle", "rounded", "square"]] as string[];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];
const statusOptions = [
  ...[
    "online",
    "away",
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
    src: {
      description:
        "Image URL for the avatar. If not set, uses fallback initials or icon.",
      control: "text",
      table: { category: "Content" },
    },
    alt: {
      description: "Alternative text for the image (improves accessibility).",
      control: "text",
      table: { category: "Accessibility" },
    },
    name: {
      description: "Name or initials to display when no image is provided.",
      control: "text",
      table: { category: "Content" },
    },
    label: {
      description: "Aria label for accessibility.",
      control: "text",
      table: { category: "Accessibility" },
    },
    fallback: {
      description: "Fallback string (e.g., initials) when no image is loaded.",
      control: "text",
      table: { category: "Content" },
    },
    size: {
      description: "Size of the avatar (xs, sm, md, lg, xl).",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    shape: {
      description: "Shape of the avatar ('circle', 'square', 'rounded').",
      control: { type: "select" },
      options: shapeOptions,
      table: { category: "Appearance" },
    },
    theme: {
      description: "Visual theme color (primary, secondary, etc).",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "State style for semantic status (success, warning, error).",
      control: { type: "select" },
      options: stateOptions,
      table: { category: "Appearance" },
    },
    status: {
      description:
        "Shows a status indicator dot or icon (e.g., 'online', 'busy', etc).",
      control: { type: "select" },
      options: [...statusOptions, undefined],
      table: { category: "Status" },
    },
    statusPosition: {
      description:
        "Where to place the status indicator (e.g., 'bottom-right').",
      control: { type: "select" },
      options: statusPositionOptions,
      table: { category: "Status" },
    },
    outline: {
      description: "Whether to display a colored outline around the avatar.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    priority: {
      description:
        "If true, loads the image with high priority (Next.js only).",
      control: "boolean",
      table: { category: "Performance" },
    },
    href: {
      description: "If set, wraps avatar in a link.",
      control: "text",
      table: { category: "Content" },
    },
    className: {
      description: "Additional CSS class for custom styling.",
      control: "text",
      table: { category: "Appearance" },
    },
    children: {
      description:
        "Children for custom content inside the avatar (overrides src/fallback).",
      control: false,
      table: { category: "Advanced" },
    },
    "data-testid": {
      description: "Test ID for test automation.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const defaultArgs = {
  name: "Davin Chiupka",
  theme: "primary" as ThemeType,
  state: "" as StateType,
  size: "medium" as SizeType,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const WithImage: Story = {
  args: {
    ...defaultArgs,
    src: "https://i.pravatar.cc/150?img=12",
    shape: "circle",
    theme: "secondary",
  },
};

export const WithHref: Story = {
  args: {
    ...defaultArgs,
    href: "https://github.com",
    shape: "square",
    status: "online",
  },
};

export const WithFallback: Story = {
  args: {
    ...defaultArgs,
    name: undefined,
    src: "broken-link.png",
  },
};

export const WithChildren: Story = {
  args: {
    ...defaultArgs,
    children: <strong>👽</strong>,
    theme: "warning" as ThemeType,
    shape: "circle",
  },
};

export const WithStatusIcon: Story = {
  args: {
    ...defaultArgs,
    statusIcon: <span style={{ fontSize: 12 }}>⭐</span>,
    theme: "secondary",
    shape: "square",
    size: "large",
  },
};

export const WithOnClick: Story = {
  args: {
    ...defaultArgs,
    name: "Clickable Avatar",
    shape: "circle",
    theme: "success" as ThemeType,
    onClick: () => alert("Avatar clicked!"),
  },
};

export const StatusPositionVariants = () => (
  <StoryGrid title="Status Positions" columns={4}>
    {statusPositionOptions.map((pos) => (
      <Avatar
        key={pos}
        {...defaultArgs}
        status="online"
        statusPosition={pos as StatusPositionType}
        theme="primary"
        shape="circle"
      />
    ))}
  </StoryGrid>
);

export const ShadowVariants = () =>
  withVariants(
    Avatar,
    {
      ...defaultArgs,
      name: "Shadow Avatar",
      shape: "circle",
    },
    [
      {
        propName: "shadow",
        values: shadowOptions,
      },
    ]
  );

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    onClick: () => alert("Avatar clicked!"),
  },
};

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
        values: [...themeOptions, ...stateOptions],
      },
    ]
  );

export const ThemeVariants = () =>
  withVariants(Avatar, { ...defaultArgs }, [
    {
      propName: "theme",
      values: themeOptions,
    },
  ]);

export const StateVariants = () =>
  withVariants(Avatar, { ...defaultArgs }, [
    { propName: "state", values: stateOptions },
  ]);

export const SizeVariants = () =>
  withVariants(Avatar, { ...defaultArgs }, [
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
