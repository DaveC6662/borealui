import type { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumbs } from "../src/index.core";
import { FaArrowRight } from "react-icons/fa";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const baseItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Data", href: "/library/data" },
];

export const Default: Story = {
  args: {
    items: baseItems,
  },
};

export const Themed: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Breadcrumbs items={baseItems} theme="primary" />
      <Breadcrumbs items={baseItems} theme="secondary" />
      <Breadcrumbs items={baseItems} theme="tertiary" />
      <Breadcrumbs items={baseItems} theme="quaternary" />
      <Breadcrumbs items={baseItems} theme="clear" />
    </div>
  ),
};

export const State: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Breadcrumbs items={baseItems} theme="success" />
      <Breadcrumbs items={baseItems} theme="warning" />
      <Breadcrumbs items={baseItems} theme="error" />
    </div>
  ),
};

export const WithOutline: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Breadcrumbs items={baseItems} theme="primary" outline />
      <Breadcrumbs items={baseItems} theme="secondary" outline />
      <Breadcrumbs items={baseItems} theme="tertiary" outline />
      <Breadcrumbs items={baseItems} theme="quaternary" outline />
      <Breadcrumbs items={baseItems} state="success" outline />
      <Breadcrumbs items={baseItems} state="warning" outline />
      <Breadcrumbs items={baseItems} state="error" outline />
      <Breadcrumbs items={baseItems} theme="clear" outline />
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Subcategory", href: "/category/sub" },
      { label: "Details", href: "/category/sub/details" },
      { label: "Final Page" },
    ],
    maxVisible: 3,
  },
};

export const Disabled: Story = {
  args: {
    items: baseItems,
    disabled: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: baseItems,
    separator: <FaArrowRight />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Breadcrumbs items={baseItems} size="xs" />
      <Breadcrumbs items={baseItems} size="small" />
      <Breadcrumbs items={baseItems} size="medium" />
      <Breadcrumbs items={baseItems} size="large" />
      <Breadcrumbs items={baseItems} size="xl" />
    </div>
  ),
};
