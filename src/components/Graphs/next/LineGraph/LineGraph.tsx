"use client";

import React, { useMemo, useRef, useState } from "react";
import GraphBase from "../../GraphBase";
import type { GraphBaseProps } from "../../Graphs.types";
import {
  linearScale,
  bandScale,
  niceDomain,
  ticks,
} from "../../../../utils/scales";
import DataTable from "@/components/DataTable/next/DataTable";
import Skeleton from "@/components/Skeleton/next/Skeleton";
import EmptyState from "@/components/EmptyState/next/EmptyState";

type LineSvgProps<T extends Record<string, unknown>> = Omit<
  GraphBaseProps<T>,
  "children"
> & {
  curve?: "linear";
  strokeWidth?: number;
  dot?: boolean;
  xType?: "auto" | "numeric" | "date" | "categorical";
  formatX?: (v: unknown) => string;
  formatY?: (v: number) => string;
};

function isDateLike(v: unknown) {
  if (v instanceof Date) return true;
  if (typeof v === "string" || typeof v === "number") {
    const d = new Date(v as any);
    return !isNaN(d.getTime());
  }
  return false;
}

export default function LineGraph<T extends Record<string, unknown>>({
  strokeWidth = 2,
  dot = true,
  xType = "auto",
  formatX,
  formatY = (v) => String(v),
  components,
  componentProps,
  ...baseProps
}: LineSvgProps<T>) {
  return (
    <GraphBase
      {...baseProps}
      components={{ DataTable, Skeleton, EmptyState }}
      componentProps={{
        skeleton: { width: "100%", height: 260 },
        emptyState: { actionLabel: undefined },
      }}
    >
      {({ data, xKey, series, theme, dimensions, a11y }) => {
        const { width, height, margin } = dimensions;
        const innerW = Math.max(0, width - margin.left - margin.right);
        const innerH = Math.max(0, height - margin.top - margin.bottom);

        const rawXVals = useMemo(
          () => data.map((d, i) => (d as any)[xKey] ?? i),
          [data, xKey]
        );

        const inferredXType: LineSvgProps<T>["xType"] = useMemo(() => {
          if (xType !== "auto") return xType;
          if (rawXVals.every((v) => typeof v === "number")) return "numeric";
          if (rawXVals.every((v) => isDateLike(v))) return "date";
          return "categorical";
        }, [xType, rawXVals]);

        const yVals = useMemo(
          () =>
            series.flatMap((s) =>
              data
                .map((d) => Number((d as any)[s.yKey]))
                .filter(Number.isFinite)
            ),
          [data, series]
        );

        const yDomain = useMemo(
          () => niceDomain([Math.min(...yVals), Math.max(...yVals)]),
          [yVals]
        );
        const y = useMemo(
          () => linearScale(yDomain, [innerH, 0]),
          [yDomain, innerH]
        );
        const yTicks = useMemo(() => ticks(yDomain, 5), [yDomain]);

        const xNumericVals = useMemo(
          () =>
            rawXVals.map((v, i) => {
              if (inferredXType === "numeric") return Number(v);
              if (inferredXType === "date") return new Date(v as any).getTime();
              return i;
            }),
          [rawXVals, inferredXType]
        );

        const xDomain = useMemo(() => {
          if (inferredXType === "categorical") return null;
          const min = Math.min(...xNumericVals);
          const max = Math.max(...xNumericVals);
          return niceDomain([min, max]);
        }, [xNumericVals, inferredXType]);

        const x = useMemo(() => {
          if (inferredXType === "categorical") {
            const labels = rawXVals.map(String);
            const b = bandScale(labels, [0, innerW], 0.2);
            const fn = (i: number) => b(labels[i]) + (b as any).bandwidth / 2;
            return Object.assign(fn, { bandwidth: (b as any).bandwidth });
          }
          return linearScale(xDomain as [number, number], [0, innerW]);
        }, [rawXVals, xDomain, innerW, inferredXType]);

        const xTicks = useMemo(() => {
          if (inferredXType === "categorical") {
            const labels = rawXVals.map(String);
            const step = Math.ceil(
              labels.length / Math.max(1, Math.min(6, labels.length))
            );
            return labels
              .map((l, i) => (i % step === 0 ? { i, label: l } : null))
              .filter(Boolean) as any[];
          }
          const base = ticks(xDomain as [number, number], 5);
          return base.map((t) => ({ i: xNumericVals.indexOf(t), label: t }));
        }, [rawXVals, inferredXType, xDomain, xNumericVals]);

        const paths = useMemo(() => {
          return series.map((s) => {
            let dStr = "";
            data.forEach((row, i) => {
              const xv =
                inferredXType === "categorical"
                  ? (x as any)(i)
                  : (x as any)(xNumericVals[i]);
              const yv = y(Number((row as any)[s.yKey]));
              if (!Number.isFinite(yv)) return;
              dStr += dStr ? ` L ${xv},${yv}` : `M ${xv},${yv}`;
            });
            return dStr;
          });
        }, [series, data, x, y, xNumericVals, inferredXType]);

        const [tip, setTip] = useState<{
          x: number;
          y: number;
          text: string;
        } | null>(null);
        const overlayRef = useRef<SVGRectElement | null>(null);

        const formatXLabel = (v: unknown) => {
          if (formatX) return formatX(v);
          if (inferredXType === "date")
            return new Date(v as any).toLocaleDateString();
          return String(v);
        };

        const handleMove = (evt: React.MouseEvent<SVGRectElement>) => {
          const pt = overlayRef.current?.ownerSVGElement?.createSVGPoint();
          if (!pt) return;
          const svg = overlayRef.current!.ownerSVGElement!;
          pt.x = evt.clientX;
          pt.y = evt.clientY;
          const loc = pt.matrixTransform(svg.getScreenCTM()?.inverse());
          const localX = loc.x - margin.left;

          let bestI = 0;
          let bestDist = Infinity;
          for (let i = 0; i < data.length; i++) {
            const xVal =
              inferredXType === "categorical"
                ? (x as any)(i)
                : (x as any)(xNumericVals[i]);
            const d = Math.abs(xVal - localX);
            if (d < bestDist) {
              bestDist = d;
              bestI = i;
            }
          }

          const s0 = series[0];
          const vx =
            inferredXType === "categorical" ? rawXVals[bestI] : rawXVals[bestI];
          const vy = Number((data[bestI] as any)[s0.yKey]);
          const cx =
            margin.left +
            (inferredXType === "categorical"
              ? (x as any)(bestI)
              : (x as any)(xNumericVals[bestI]));
          const cy = margin.top + y(vy);
          if (Number.isFinite(vy)) {
            setTip({
              x: cx,
              y: cy,
              text: `${formatXLabel(vx)} — ${s0.label ?? s0.id}: ${formatY(vy)}`,
            });
          }
        };

        const handleLeave = () => setTip(null);

        return (
          <svg
            width={width}
            height={height}
            role="img"
            aria-labelledby={a11y.title ? "svg-title" : undefined}
            aria-describedby={a11y.description ? "svg-desc" : undefined}
          >
            {a11y.title && <title id="svg-title">{a11y.title}</title>}
            {a11y.description && <desc id="svg-desc">{a11y.description}</desc>}

            <g transform={`translate(${margin.left},${margin.top})`}>
              {yTicks.map((t, i) => (
                <line
                  key={`ygrid-${i}`}
                  x1={0}
                  x2={innerW}
                  y1={y(t)}
                  y2={y(t)}
                  stroke={theme.gridColor}
                  strokeDasharray="3 3"
                />
              ))}
              <line
                x1={0}
                x2={innerW}
                y1={innerH}
                y2={innerH}
                stroke={theme.axisColor}
              />
              <line x1={0} x2={0} y1={0} y2={innerH} stroke={theme.axisColor} />
              {xTicks.map((t: any, i: number) => {
                const xv =
                  inferredXType === "categorical"
                    ? (x as any)(t.i)
                    : (x as any)(xNumericVals[t.i] ?? t.label);
                return (
                  <g
                    key={`xtick-${i}`}
                    transform={`translate(${xv},${innerH})`}
                  >
                    <line y2={6} stroke={theme.axisColor} />
                    <text
                      dy="1.2em"
                      fill={theme.axisColor}
                      fontFamily={theme.fontFamily}
                      fontSize={theme.fontSize}
                    >
                      {formatXLabel(t.label)}
                    </text>
                  </g>
                );
              })}
              {yTicks.map((t, i) => (
                <g key={`ytick-${i}`} transform={`translate(0,${y(t)})`}>
                  <line x1={-6} stroke={theme.axisColor} />
                  <text
                    x={-8}
                    dy="0.32em"
                    textAnchor="end"
                    fill={theme.axisColor}
                    fontFamily={theme.fontFamily}
                    fontSize={theme.fontSize}
                  >
                    {formatY(t)}
                  </text>
                </g>
              ))}
              {series.map((s, i) => {
                const color = theme.palette[i % theme.palette.length];
                return (
                  <g key={s.id}>
                    <path
                      d={paths[i]}
                      fill="none"
                      stroke={color}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {dot &&
                      data.map((row, j) => {
                        const xv =
                          inferredXType === "categorical"
                            ? (x as any)(j)
                            : (x as any)(xNumericVals[j]);
                        const yv = y(Number((row as any)[s.yKey]));
                        if (!Number.isFinite(yv)) return null;
                        return (
                          <circle key={j} cx={xv} cy={yv} r={3} fill={color} />
                        );
                      })}
                  </g>
                );
              })}
              <rect
                ref={overlayRef}
                x={0}
                y={0}
                width={innerW}
                height={innerH}
                fill="transparent"
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
              />
            </g>
            {tip && (
              <foreignObject
                x={tip.x + 8}
                y={tip.y - 28}
                width={180}
                height={40}
                pointerEvents="none"
              >
                <div
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 12,
                    fontFamily: theme.fontFamily,
                    lineHeight: 1.2,
                    maxWidth: 180,
                  }}
                >
                  {tip.text}
                </div>
              </foreignObject>
            )}
          </svg>
        );
      }}
    </GraphBase>
  );
}
