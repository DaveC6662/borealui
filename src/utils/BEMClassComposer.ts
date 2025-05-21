type Modifiers = Record<string, boolean | string | number | undefined | null>;

export function combineBEMClassNames(
  base: string,
  modifiers?: Modifiers,
  additional?: (string | false | null | undefined)[]
): string {
  const modClasses = Object.entries(modifiers || {})
    .filter(([_, value]) => value !== false && value != null)
    .map(([key, value]) =>
      typeof value === "boolean"
        ? `${base}--${key}`
        : `${base}--${key}-${value}`
    );

  const cleanAdditional = (additional || []).filter(Boolean);

  return [base, ...modClasses, ...cleanAdditional].join(" ");
}
