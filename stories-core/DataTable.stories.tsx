import { Meta, StoryObj } from "@storybook/nextjs";
import { DataTable } from "../src/index.core";
import type { DataTableProps } from "../src/components/DataTable/DataTable.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

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
    theme: "primary",
  },
};

export const ThemeVariants = () => {
  return (
    <StoryGrid title="Theme Variants">
      {themeOptions.map((theme) => (
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

export const StateVariants = () => {
  return (
    <StoryGrid title="State Variants">
      {stateOptions.map((state) => (
        <div key={state}>
          <h4 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
            {state} state
          </h4>
          <DataTable
            data={sampleData}
            columns={sampleColumns}
            state={state}
            striped={true}
          />
        </div>
      ))}
    </StoryGrid>
  );
};

export const OutlineVariants = () => (
  <StoryGrid title="Outline Variants">
    {themeOptions.map((theme) => (
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
    {stateOptions.map((state) => (
      <div key={state}>
        <h4 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
          {state} Outline
        </h4>
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          state={state}
          outline
          striped={true}
        />
      </div>
    ))}
  </StoryGrid>
);
