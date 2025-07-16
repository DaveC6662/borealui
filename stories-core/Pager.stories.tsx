import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Pager } from "../src/index.core";
import type { PaginationProps } from "../src/components/Pager/Pager.types";

const meta: Meta<PaginationProps> = {
  title: "Components/Pager",
  component: Pager,
  tags: ["autodocs"],
  args: {
    totalItems: 20,
    itemsPerPage: 2,
    size: "small",
    theme: "primary",
  },
  argTypes: {
    totalItems: {
      control: { type: "number", min: 1 },
      description: "Total number of items in the full data set.",
      table: { category: "Data", defaultValue: { summary: "20" } },
      type: { name: "number", required: true },
    },
    itemsPerPage: {
      control: { type: "number", min: 1 },
      description: "Number of items to display per page.",
      table: { category: "Data", defaultValue: { summary: "2" } },
      type: { name: "number", required: true },
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page number (1-based).",
      table: { category: "State" },
      type: { name: "number", required: true },
    },
    onPageChange: {
      action: "pageChanged",
      description:
        "Callback fired with new page number when user changes page.",
      table: { category: "Actions" },
      type: { name: "function", required: true },
    },
    serverControlled: {
      control: "boolean",
      description:
        "If true, disables client-side page list and only renders prev/next/current. Use for server-side paging.",
      table: { category: "Advanced", defaultValue: { summary: "false" } },
    },
    theme: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant for Pager buttons.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
    },
    state: {
      control: "select",
      options: ["", "success", "error", "warning"],
      description: "Optional state coloring for Pager controls.",
      table: { category: "Appearance", defaultValue: { summary: "" } },
    },
    size: {
      control: "select",
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the Pager buttons and controls.",
      table: { category: "Appearance", defaultValue: { summary: "small" } },
    },
    rounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for Pager buttons.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
    },
    shadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow for Pager buttons.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
    },
    className: {
      control: "text",
      description: "Additional custom class names for the Pager container.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
  },
};

const roundingOptions = ["none", "small", "medium", "large"] as const;
const shadowOptions = ["none", "light", "medium", "strong", "intense"] as const;

export default meta;

type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const start = (currentPage - 1) * args.itemsPerPage;
    const items = Array.from(
      { length: args.totalItems },
      (_, i) => `Item ${i + 1}`
    );
    const pageItems = items.slice(start, start + args.itemsPerPage);

    return (
      <div style={{ display: "grid", gap: "1rem", maxWidth: "500px" }}>
        <div>
          {pageItems.map((item) => (
            <div
              key={item}
              style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}
            >
              {item}
            </div>
          ))}
        </div>
        <Pager
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const WithManyPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(6);
    return (
      <Pager
        {...args}
        totalItems={120}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {sizes.map((size) => {
          const [page, setPage] = useState(1);
          return (
            <Pager
              key={size}
              {...args}
              size={size}
              currentPage={page}
              onPageChange={setPage}
            />
          );
        })}
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    const themes = [
      "primary",
      "secondary",
      "tertiary",
      "quaternary",
      "clear",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {themes.map((theme) => {
          const [page, setPage] = useState(1);
          return (
            <Pager
              key={theme}
              {...args}
              theme={theme}
              currentPage={page}
              onPageChange={setPage}
            />
          );
        })}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    const states = ["success", "error", "warning"];

    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {states.map((state) => {
          const [page, setPage] = useState(1);
          return (
            <Pager
              key={state}
              {...args}
              theme={state}
              currentPage={page}
              onPageChange={setPage}
            />
          );
        })}
      </div>
    );
  },
};

export const RoundingVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {roundingOptions.map((rounding) => {
          const [page, setPage] = useState(1);
          return (
            <Pager
              key={rounding}
              {...args}
              rounding={rounding}
              currentPage={page}
              onPageChange={setPage}
            />
          );
        })}
      </div>
    );
  },
};

export const ShadowVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {shadowOptions.map((shadow) => {
          const [page, setPage] = useState(1);
          return (
            <Pager
              key={shadow}
              {...args}
              shadow={shadow}
              currentPage={page}
              onPageChange={setPage}
            />
          );
        })}
      </div>
    );
  },
};
