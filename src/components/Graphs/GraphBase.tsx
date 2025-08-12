"use client";

import React, { useMemo, useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import type { GraphBaseProps, GraphTheme, Row } from "./Graphs.types";
import { DataTableProps } from "../DataTable/DataTable.types";

const DEFAULT_HEIGHT = 260;

function useMeasure(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, deps);

  return { ref, ...size };
}

const makeTheme = (t?: GraphTheme): Required<GraphTheme> =>
  ({
    palette: t?.palette ?? [
      "var(--primary-color)",
      "var(--primary-color-light)",
      "var(--secondary-color)",
    ],
    gridColor: t?.gridColor ?? "var(--text-color-primary)",
    axisColor: t?.axisColor ?? "var(--text-color-primary)",
    fontFamily: t?.fontFamily ?? "var(--font-family-primary)",
    fontSize: t?.fontSize ?? 12,
  }) as const;

const margin = { top: 12, right: 12, bottom: 28, left: 36 };

function Status({ title, message }: { title: string; message?: string }) {
  return (
    <div role="status" aria-live="polite" className="graph-status">
      <FaExclamationTriangle aria-hidden="true" />
      <h2 className="graph-status__title">{title}</h2>
      {message && <p className="graph-status__msg">{message}</p>}
    </div>
  );
}

export default function GraphBase<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  width = "auto",
  height = DEFAULT_HEIGHT,
  styles = {},
  a11y,
  isLoading,
  isEmpty,
  error,
  theme,
  children,
  componentProps,
  components = {},
}: GraphBaseProps<T>) {
  const resolvedTheme = useMemo(() => makeTheme(theme), [theme]);
  const measure = useMeasure([width, height]);

  const pixelW = typeof width === "number" ? width : Math.max(0, measure.width);
  const pixelH = typeof height === "number" ? height : DEFAULT_HEIGHT;

  const titleId = a11y?.title ? "chart-title" : undefined;
  const descId = a11y?.description ? "chart-desc" : undefined;

  const ctx = useMemo(
    () => ({
      data,
      xKey: String(xKey),
      series,
      theme: resolvedTheme,
      dimensions: { width: pixelW, height: pixelH, margin },
      a11y: {
        title: a11y?.title ?? "",
        description: a11y?.description ?? "",
        tableFallback: a11y?.tableFallback ?? false,
      },
    }),
    [
      data,
      xKey,
      series,
      resolvedTheme,
      pixelW,
      pixelH,
      a11y?.title,
      a11y?.description,
      a11y?.tableFallback,
    ]
  );

  if (error) {
    if (components?.EmptyState) {
      const EmptyState = components.EmptyState;
      return (
        <EmptyState
          title="Unable to load chart"
          message={error}
          size="xs"
          icon={FaExclamationTriangle}
          {...componentProps?.emptyState}
        />
      );
    }
    return <Status title="Unable to load chart" message={error} />;
  }

  if (isLoading) {
    if (components?.Skeleton) {
      const Skeleton = components.Skeleton;
      return (
        <Skeleton
          width={pixelW || undefined}
          height={pixelH}
          {...componentProps?.skeleton}
        />
      );
    }
    return (
      <div role="status" aria-live="polite">
        Loading…
      </div>
    );
  }

  if (isEmpty || !data?.length) {
    if (components?.EmptyState) {
      const EmptyState = components.EmptyState;
      return (
        <EmptyState
          title="No data"
          size="xs"
          icon={FaExclamationTriangle}
          message="There’s nothing to chart yet."
          {...componentProps?.emptyState}
        />
      );
    }
    return <Status title="No data" message="There’s nothing to chart yet." />;
  }

  return (
    <figure
      className={styles.chartContainer}
      aria-labelledby={titleId}
      aria-describedby={descId}
      role="group"
      style={{ width: typeof width === "number" ? width : "100%", margin: 0 }}
    >
      <div ref={measure.ref} style={{ width: "100%" }}>
        {a11y?.title && <figcaption id="chart-title">{a11y.title}</figcaption>}
        {a11y?.description && (
          <div id="chart-desc" className={styles.srOnly}>
            {a11y.description}
          </div>
        )}

        {pixelW > 0 && children(ctx)}
      </div>

      {a11y?.tableFallback &&
        (components?.DataTable ? (
          (() => {
            const DataTable = components.DataTable;

            const columns = [
              { key: String(xKey), header: String(xKey) },
              ...series.map((s) => ({ key: s.yKey, header: s.label ?? s.id })),
            ] as const;

            const rows: Row[] = data.map((row) => {
              const rec: Row = {};
              rec[String(xKey)] = (row as any)[xKey];
              for (const s of series) rec[s.yKey] = (row as any)[s.yKey];
              return rec;
            });

            return (
              <div style={{ marginTop: 12 }}>
                <DataTable
                  columns={columns as any}
                  data={rows as any}
                  ariaLabel={a11y?.title || "Chart data"}
                  {...(componentProps?.dataTable as Partial<
                    DataTableProps<Row>
                  >)}
                />
              </div>
            );
          })()
        ) : (
          <table className={styles.srOnly}>
            <thead>
              <tr>
                <th>{String(xKey)}</th>
                {series.map((s) => (
                  <th key={s.id}>{s.label ?? s.id}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{String((d as any)[xKey])}</td>
                  {series.map((s) => (
                    <td key={s.id}>{String((d as any)[s.yKey])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </figure>
  );
}
