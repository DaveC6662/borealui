import { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "../src/index.core";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import testImage from "./assets/test_pattern.jpg";
import type { CardProps } from "../src/components/Card/Card.types";
import { StateType, ThemeType } from "../src/types/types";

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

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card Title",
    description:
      "This is a description of the card. You can include additional info here.",
    theme: "primary" as ThemeType,
    state: "" as StateType,
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    theme: { control: "select", options: themeOptions },
    state: { control: "select", options: ["", ...stateOptions] },
    cardIcon: { control: false },
    imageUrl: { control: "text" },
    imageAlt: { control: "text" },
    imageClassName: { control: "text" },
    headerClassName: { control: "text" },
    bodyClassName: { control: "text" },
    footerClassName: { control: "text" },
    rounding: { control: "select", options: roundingOptions },
    shadow: { control: "select", options: shadowOptions },
    size: { control: "select", options: sizeOptions },
    align: { control: "select", options: alignments },
    outline: { control: "boolean" },
    layout: { control: "select", options: layoutOptions },
    blur: { control: "boolean" },
    loading: { control: "boolean" },
    actionButtons: { control: false },
    useIconButtons: { control: "boolean" },
    renderHeader: { control: false },
    renderContent: { control: false },
    renderFooter: { control: false },
    children: { control: false },
    className: { control: "text" },
    "data-testid": { control: "text" },
    "aria-label": { control: "text" },
    "aria-labelledby": { control: "text" },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

const defaultArgs: CardProps = {
  title: "Card Preview",
  description: "Quick description to show style and layout.",
};

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    ...defaultArgs,
    imageUrl: testImage,
    imageAlt: "Placeholder image",
  },
};

export const WithIcon: Story = {
  args: {
    ...defaultArgs,
    cardIcon: FaInfoCircle,
  },
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const WithActions: Story = {
  args: {
    ...defaultArgs,
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
      <div style={{ fontSize: "0.9rem" }}>Footer text here</div>
    ),
  },
};

export const ThemeVariants = () =>
  withVariants(Card, defaultArgs, [
    { propName: "theme", values: [...themeOptions] },
  ]);

export const StateVariants = () =>
  withVariants(Card, defaultArgs, [
    { propName: "theme", values: [...stateOptions] },
  ]);
export const OutlineThemeVariants = () =>
  withVariants(Card, { ...defaultArgs, outline: true }, [
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
        <div style={{ fontSize: "0.8rem" }}>
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
  withVariants(Card, { ...defaultArgs, imageUrl: testImage }, [
    { propName: "layout", values: [...layoutOptions] },
  ]);

export const IconButtonVariants = () => (
  <StoryGrid title="Card with action buttons and icons">
    <Card
      {...defaultArgs}
      actionButtons={[
        { label: "Edit", icon: FaEdit, state: "success", onClick: () => {} },
        { label: "Delete", icon: FaTrash, state: "error", onClick: () => {} },
      ]}
      useIconButtons={true}
    />
    <Card
      {...defaultArgs}
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

export const RoundingVariants = () =>
  withVariants(Card, { ...defaultArgs }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = () =>
  withVariants(Card, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);

export const WithClassName: Story = {
  args: {
    ...defaultArgs,
    className: "storybook-card-custom",
  },
};

export const WithCustomSectionClassNames: Story = {
  args: {
    ...defaultArgs,
    imageUrl: testImage,
    imageClassName: "storybook-card-image",
    headerClassName: "storybook-card-header",
    bodyClassName: "storybook-card-body",
    footerClassName: "storybook-card-footer",
    renderFooter: () => <div>Footer with custom class</div>,
  },
};

export const WithBlur: Story = {
  args: {
    ...defaultArgs,
    imageUrl: testImage,
    blur: true,
  },
};

export const WithAccessibilityProps: Story = {
  args: {
    ...defaultArgs,
    "aria-label": "Aria label for the card",
    "data-testid": "storybook-card",
  },
};
