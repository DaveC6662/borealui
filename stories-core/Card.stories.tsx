import { Meta, StoryObj } from "@storybook/react";
import Card from "@/components/Card/core/Card";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import type { CardProps } from "@/components/Card/Card.types";

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card Title",
    description: "This is a description of the card. You can include additional info here.",
    theme: "primary",
  },
};

export default meta;

type Story = StoryObj<CardProps>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/600x250",
    imageAlt: "Placeholder image",
  },
};

export const WithIcon: Story = {
  args: {
    cardIcon: FaInfoCircle,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithActions: Story = {
  args: {
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
        theme: "error",
        onClick: () => alert("Delete clicked"),
      },
    ],
    useIconButtons: true,
  },
};

export const WithCustomRender: Story = {
  args: {
    renderHeader: () => <h2 style={{ margin: 0 }}>Custom Header 🎉</h2>,
    renderContent: () => <div>This content is rendered via a custom render function.</div>,
    renderFooter: () => <div style={{ fontSize: "0.9rem", color: "#777" }}>Footer text here</div>,
  },
};

export const HorizontalLayout: Story = {
  args: {
    layout: "horizontal",
    imageUrl: "https://via.placeholder.com/300x250",
    imageAlt: "Card image horizontal",
  },
};
