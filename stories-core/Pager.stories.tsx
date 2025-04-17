// src/stories/Pager.stories.tsx

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Pager from "@/components/Pager/core/Pager";
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

export const MediumSize: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(2);
    return (
      <Pager
        {...args}
        size="medium"
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const SecondaryTheme: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pager
        {...args}
        theme="secondary"
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const FirstPageDisabled: Story = {
  render: (args) => {
    const [currentPage] = useState(1);
    return (
      <Pager
        {...args}
        currentPage={currentPage}
        onPageChange={() => {}}
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
        onPageChange={() => {}}
      />
    );
  },
};
