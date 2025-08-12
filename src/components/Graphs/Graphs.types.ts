import { SizeType, StateType } from "@/types";
import { DataTableProps } from "../DataTable/DataTable.types";
import { SkeletonProps } from "../Skeleton/Skeleton.types";
import { EmptyStateProps } from "../EmptyState/EmptyState.types";

export type Row = Record<string, unknown>;

export type DataTableComponent = <R extends object>(
  props: DataTableProps<R>
) => React.ReactElement | null;

export type GraphInjectedComponents<T> = {
  DataTable?: DataTableComponent;
  Skeleton?: React.ComponentType<SkeletonProps>;
  EmptyState?: React.ComponentType<EmptyStateProps>;
};

export type GraphComponentProps<T> = {
  dataTable?: Partial<DataTableProps<T>>;
  skeleton?: Partial<SkeletonProps>;
  emptyState?: Partial<EmptyStateProps>;
};

export type SeriesDef = {
  id: string;
  label?: string;
  yKey: string;
};

export type GraphTheme = {
  palette: string[];
  gridColor?: string;
  axisColor?: string;
  fontFamily?: string;
  fontSize?: number;
};

export type GraphA11y = {
  title?: string;
  description?: string;
  tableFallback?: boolean;
};

export type GraphBaseProps<T extends Record<string, unknown>> = {
  data: T[];
  xKey: keyof T;
  series: SeriesDef[];
  width?: number | "auto";
  height?: number | "auto";
  theme?: GraphTheme;
  styles?: Record<string, string>;
  size?: SizeType;
  state?: StateType;
  outline?: boolean;
  components?: GraphInjectedComponents<T>;
  componentProps?: GraphComponentProps<T>;

  children: (ctx: {
    data: T[];
    xKey: string;
    series: SeriesDef[];
    theme: Required<GraphTheme>;
    dimensions: {
      width: number;
      height: number;
      margin: { top: number; right: number; bottom: number; left: number };
    };
    a11y: Required<GraphA11y>;
  }) => React.ReactNode;

  a11y?: GraphA11y;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string;
};
