import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumbs from "@components/Breadcrumbs/next/Breadcrumbs";
import { FaDotCircle } from "react-icons/fa";

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
      <Breadcrumbs items={baseItems} theme="success" />
      <Breadcrumbs items={baseItems} theme="warning" />
      <Breadcrumbs items={baseItems} theme="error" />
    </div>
  ),
};

export const WithOutline: Story = {
  args: {
    items: baseItems,
    outline: true,
    theme: "primary",
  },
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

export const CustomSeparator: Story = {
  args: {
    items: baseItems,
    separator: <FaDotCircle />,
  },
};
