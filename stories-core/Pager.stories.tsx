import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Pager } from "@/index.core";
import type { PaginationProps } from "@/components/Pager/Pager.types";

const meta: Meta<PaginationProps> = {
  title: "Components/Pager",
  component: Pager,
  tags: ["autodocs"],
  args: {
    totalItems: 50,
    itemsPerPage: 10,
    size: "small",
    theme: "primary",
  },
};

export default meta;

type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pager
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
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
      "success",
      "warning",
      "error",
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

export const FirstPageDisabled: Story = {
  render: (args) => {
    return (
      <Pager
        {...args}
        currentPage={1}
        onPageChange={() => {
          /* disabled */
        }}
      />
    );
  },
};

export const LastPageDisabled: Story = {
  render: (args) => {
    const totalItems = 50;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <Pager
        {...args}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={totalPages}
        onPageChange={() => {
          /* disabled */
        }}
      />
    );
  },
};
