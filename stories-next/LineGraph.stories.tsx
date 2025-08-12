import type { Meta, StoryObj } from "@storybook/react";
import { LineGraph } from "../src/index.next";

type D = { day: string; uv: number; pv: number; amt: number };

const meta: Meta<typeof LineGraph<D>> = {
  title: "Graphs/LineGraph",
  component: LineGraph<D>,
  parameters: { layout: "padded" },
  args: {
    data: [
      { day: "Mon", uv: 400, pv: 240, amt: 240 },
      { day: "Tue", uv: 300, pv: 456, amt: 221 },
      { day: "Wed", uv: 200, pv: 139, amt: 229 },
      { day: "Thu", uv: 278, pv: 390, amt: 200 },
      { day: "Fri", uv: 189, pv: 480, amt: 218 },
    ],
    xKey: "day",
    series: [
      { id: "uv", label: "UV", yKey: "uv" },
      { id: "pv", label: "PV", yKey: "pv" },
    ],
    curve: "linear",
    dot: true,
    strokeWidth: 2,
    a11y: { title: "Weekly trends", tableFallback: true },
    height: 260,
  },
};
export default meta;

export const Default: StoryObj<typeof LineGraph<D>> = {};

export const Loading: StoryObj<typeof LineGraph<D>> = {
  args: {
    isLoading: true,
  },
};

export const ErrorState: StoryObj<typeof LineGraph<D>> = {
  args: {
    error: "Network error: failed to fetch",
  },
};

export const EmptyFlag: StoryObj<typeof LineGraph<D>> = {
  args: {
    isEmpty: true,
  },
};

export const EmptyNoData: StoryObj<typeof LineGraph<D>> = {
  args: {
    data: [],
  },
};
