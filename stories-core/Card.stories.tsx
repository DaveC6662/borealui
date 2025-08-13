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
    title: {
      description: "The card’s main heading/title.",
      control: "text",
      table: { category: "Content" },
    },
    description: {
      description: "The card’s subtitle or description text.",
      control: "text",
      table: { category: "Content" },
    },
    theme: {
      description: "Visual theme color for the card.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "Special state styling (success, error, warning, etc).",
      control: { type: "select" },
      options: ["", ...stateOptions],
      table: { category: "Appearance" },
    },
    cardIcon: {
      description: "Optional icon component to show in the card header.",
      control: false,
      table: { category: "Content" },
    },
    imageUrl: {
      description: "URL of an image to display in the card.",
      control: "text",
      table: { category: "Media" },
    },
    imageAlt: {
      description: "Alt text for the card image.",
      control: "text",
      table: { category: "Media" },
    },
    imageClassName: {
      description: "Custom class for styling the image.",
      control: "text",
      table: { category: "Media" },
    },
    headerClassName: {
      description: "Custom class for the card header.",
      control: "text",
      table: { category: "Advanced" },
    },
    bodyClassName: {
      description: "Custom class for the card body/content.",
      control: "text",
      table: { category: "Advanced" },
    },
    footerClassName: {
      description: "Custom class for the card footer.",
      control: "text",
      table: { category: "Advanced" },
    },
    rounding: {
      description: "Card border-radius style.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Shadow style for the card.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    size: {
      description: "Card size preset.",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    align: {
      description: "Content alignment within the card.",
      control: { type: "select" },
      options: alignments,
      table: { category: "Layout" },
    },
    outline: {
      description: "Render card with an outline variant.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    layout: {
      description: "Card layout direction (vertical, horizontal, etc).",
      control: { type: "select" },
      options: layoutOptions,
      table: { category: "Layout" },
    },
    loading: {
      description: "If true, displays a loading skeleton instead of content.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    actionButtons: {
      description: "Buttons or actions shown in the card footer.",
      control: false,
      table: { category: "Advanced" },
    },
    useIconButtons: {
      description: "If true, uses icon buttons for actions.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    renderHeader: {
      description: "Custom render function for the header section.",
      control: false,
      table: { category: "Advanced" },
    },
    renderContent: {
      description: "Custom render function for the main content section.",
      control: false,
      table: { category: "Advanced" },
    },
    renderFooter: {
      description: "Custom render function for the footer section.",
      control: false,
      table: { category: "Advanced" },
    },
    children: {
      description: "React children for custom card content.",
      control: false,
      table: { category: "Content" },
    },
    className: {
      description: "Additional CSS class(es) for the card wrapper.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test ID for test automation.",
      control: "text",
      table: { category: "Testing" },
    },
    "aria-label": {
      description: "Custom ARIA label for accessibility.",
      control: "text",
      table: { category: "Accessibility" },
    },
    "aria-labelledby": {
      description: "ID of element labeling this card (accessibility).",
      control: "text",
      table: { category: "Accessibility" },
    },
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

export const WithAccessibilityProps: Story = {
  args: {
    ...defaultArgs,
    "aria-label": "Aria label for the card",
    "data-testid": "storybook-card",
  },
};
