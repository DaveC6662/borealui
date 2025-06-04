import { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "../src/index.next";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import testImage from "./assets/test_pattern.jpg";
import type { CardProps } from "../src/components/Card/Card.types";
import { ThemeType } from "../src/types/types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];
const sizeOptions = ["xs", "small", "medium", "large", "xl"] as const;
const layoutOptions = ["vertical", "horizontal"] as const;
const alignments: CardProps["align"][] = ["left", "center", "right"];
const titles = ["Left-Aligned", "Center-Aligned", "Right-Aligned"];
const descriptions = [
  "This content is aligned to the left.",
  "This content is centered.",
  "This content is aligned to the right.",
];

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card Title",
    description:
      "This is a description of the card. You can include additional info here.",
    theme: "primary",
  },
};

export default meta;
type Story = StoryObj<CardProps>;

const baseArgs: CardProps = {
  title: "Card Preview",
  description: "Quick description to show style and layout.",
};

// Default
export const Default: Story = {};

// Original static stories preserved
export const WithImage: Story = {
  args: {
    ...baseArgs,
    imageUrl: testImage,
    imageAlt: "Placeholder image",
  },
};

export const WithIcon: Story = {
  args: {
    ...baseArgs,
    cardIcon: FaInfoCircle,
  },
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
};

export const WithActions: Story = {
  args: {
    ...baseArgs,
    actionButtons: [
      {
        label: "Edit",
        icon: FaEdit,
        theme: "secondary",
        onClick: () => alert("Edit clicked"),
      },
      {
        label: "Delete",
        icon: FaTrash,
        state: "error",
        onClick: () => alert("Delete clicked"),
      },
    ],
    useIconButtons: true,
  },
};

export const WithCustomRender: Story = {
  args: {
    renderHeader: () => <h2 style={{ margin: 0 }}>Custom Header 🎉</h2>,
    renderContent: () => (
      <div>This content is rendered via a custom render function.</div>
    ),
    renderFooter: () => (
      <div style={{ fontSize: "0.9rem", color: "#777" }}>Footer text here</div>
    ),
  },
};

export const ThemeVariants = () =>
  withVariants(Card, baseArgs, [
    { propName: "theme", values: [...themeOptions] },
  ]);

export const StateVariants = () =>
  withVariants(Card, baseArgs, [
    { propName: "theme", values: [...stateOptions] },
  ]);
export const OutlineThemeVariants = () =>
  withVariants(Card, { ...baseArgs, outline: true }, [
    { propName: "theme", values: [...themeOptions, ...stateOptions] },
  ]);

export const SizeVariants = () =>
  withVariants(
    Card,
    {
      title: "Card Size Preview",
      description: "This is a description for the card size variant.",
      imageUrl: testImage,
      imageAlt: "Test image",
      cardIcon: FaInfoCircle,
      actionButtons: [
        {
          label: "Edit",
          icon: FaEdit,
          theme: "secondary",
          onClick: () => alert("Edit clicked"),
        },
        {
          label: "Delete",
          icon: FaTrash,
          state: "error",
          onClick: () => alert("Delete clicked"),
        },
      ],
      renderFooter: () => (
        <div style={{ fontSize: "0.8rem", color: "#999" }}>
          This is a footer rendered below the card content.
        </div>
      ),
      children: (
        <p>
          This is additional custom content inside the card body. It's meant to
          demonstrate how each size handles layout and spacing.
        </p>
      ),
    },
    [{ propName: "size", values: [...sizeOptions] }]
  );

export const LayoutVariants = () =>
  withVariants(Card, { ...baseArgs, imageUrl: testImage }, [
    { propName: "layout", values: [...layoutOptions] },
  ]);

export const IconButtonVariants = () => (
  <StoryGrid title="Card with action buttons and icons">
    <Card
      {...baseArgs}
      actionButtons={[
        { label: "Edit", icon: FaEdit, state: "success", onClick: () => {} },
        { label: "Delete", icon: FaTrash, state: "error", onClick: () => {} },
      ]}
      useIconButtons={true}
    />
    <Card
      {...baseArgs}
      actionButtons={[
        { label: "Edit", icon: FaEdit, theme: "secondary", onClick: () => {} },
        { label: "Remove", icon: FaTrash, state: "error", onClick: () => {} },
      ]}
      useIconButtons={false}
    />
  </StoryGrid>
);

export const AlignmentGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      {/* Vertical Cards */}
      {alignments.map((align, index) => (
        <Card
          key={`vertical-${align}`}
          title="Card Preview"
          description={descriptions[index]}
          imageUrl={testImage}
          imageAlt={`${titles[index]} image`}
          align={align}
          layout="vertical"
          theme={themeOptions[index] as ThemeType}
          size="medium"
          cardIcon={FaInfoCircle}
          actionButtons={[
            {
              label: "Edit",
              icon: FaEdit,
              state: "warning",
              onClick: () => {},
            },
            {
              label: "Remove",
              icon: FaTrash,
              state: "error",
              onClick: () => {},
            },
          ]}
        >
          <p>
            This is additional paragraph content included in the card body to
            demonstrate alignment.
          </p>
        </Card>
      ))}

      {alignments.map((align, index) => (
        <Card
          key={`horizontal-${align}`}
          title="Card Preview"
          description={descriptions[index]}
          imageUrl={testImage}
          imageAlt={`${titles[index]} image`}
          align={align}
          layout="horizontal"
          theme={themeOptions[index] as ThemeType}
          size="medium"
          cardIcon={FaInfoCircle}
          actionButtons={[
            {
              label: "Edit",
              icon: FaEdit,
              state: "warning",
              onClick: () => {},
            },
            {
              label: "Remove",
              icon: FaTrash,
              state: "error",
              onClick: () => {},
            },
          ]}
        >
          <p>
            This is additional paragraph content included in the card body to
            demonstrate alignment.
          </p>
        </Card>
      ))}
    </div>
  ),
};
