export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const m = (r1 - r0) / (d1 - d0 || 1);
  return (x: number) => r0 + (x - d0) * m;
}

export function bandScale(
  domain: string[],
  range: [number, number],
  padding = 0.1
) {
  const [r0, r1] = range;
  const n = Math.max(1, domain.length);
  const totalPad = (n + 1) * padding;
  const step = (r1 - r0) / (n + totalPad);
  const bandwidth = step * (1 - padding);
  const map = new Map(
    domain.map((d, i) => [d, r0 + step * (i + 1) + i * bandwidth])
  );
  return Object.assign((x: string) => map.get(x) ?? 0, { bandwidth });
}

export function niceDomain([min, max]: [number, number]) {
  if (!isFinite(min) || !isFinite(max)) return [0, 1] as [number, number];
  if (min === max) return [min - 1, max + 1] as [number, number];
  const span = Math.abs(max - min);
  const pow10 = Math.pow(10, Math.floor(Math.log10(span)));
  const step = pow10;
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  return [niceMin, niceMax] as [number, number];
}

export function ticks([min, max]: [number, number], count = 5) {
  const step = (max - min) / Math.max(1, count);
  return Array.from({ length: count + 1 }, (_, i) => min + i * step);
}
