import { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@/index.core";
import type { DataTableProps } from "@/components/DataTable/DataTable.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

type SampleRow = {
  id: number;
  name: string;
  score: number;
  passed: boolean;
};

const sampleData: SampleRow[] = [
  { id: 1, name: "Alice", score: 91, passed: true },
  { id: 2, name: "Bob", score: 75, passed: true },
  { id: 3, name: "Charlie", score: 58, passed: false },
  { id: 4, name: "Dana", score: 84, passed: true },
];

const sampleColumns: DataTableProps<SampleRow>["columns"] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "score",
    label: "Score",
    sortable: true,
  },
  {
    key: "passed",
    label: "Status",
    sortable: false,
    render: (value: any) => (value ? "Pass" : "Fail"),
  },
];

const meta: Meta<DataTableProps<SampleRow>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    data: sampleData,
    columns: sampleColumns,
    theme: "primary",
    striped: true,
  },
};

export default meta;

type Story = StoryObj<DataTableProps<SampleRow>>;

export const Default: Story = {};

export const WithRowClick: Story = {
  args: {
    onRowClick: (row) => alert(`You clicked: ${row.name}`),
  },
};

export const SortedByScore: Story = {
  args: {
    defaultSortKey: "score",
    defaultSortOrder: "desc",
  },
};

export const CustomRowKey: Story = {
  args: {
    rowKey: (row) => `row-${row.id}`,
  },
};

export const NoStripedTheme: Story = {
  args: {
    striped: false,
    theme: "clear",
  },
};

const themes = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "clear",
] as const;

export const ThemeVariants = () => {
  return (
    <StoryGrid title="Theme Variants">
      {themes.map((theme) => (
        <div key={theme}>
          <h4 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
            {theme} Theme
          </h4>
          <DataTable
            data={sampleData}
            columns={sampleColumns}
            theme={theme}
            striped={true}
          />
        </div>
      ))}
    </StoryGrid>
  );
};

export const OutlineVariants = () => (
  <StoryGrid title="Outline Variants">
    {themes.map((theme) => (
      <div key={`outline-${theme}`}>
        <h4 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
          {theme} Outline
        </h4>
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          theme={theme}
          outline
          striped
        />
      </div>
    ))}
  </StoryGrid>
);
