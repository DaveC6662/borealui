/**
 * Combines multiple class names into a single space-separated string.
 *
 * Filters out falsy values such as `false`, `null`, `undefined`, and empty strings.
 * Useful for conditionally applying classes in JSX.
 *
 * @param {...(string | false | null | undefined)[]} classes - An array of class names or falsy values.
 * @returns {string} A single string of space-separated class names.
 *
 * @example
 * combineClassNames("btn", isActive && "btn--active", isDisabled && "btn--disabled");
 * // "btn btn--active" (if isActive is true and isDisabled is false)
 */
export function combineClassNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
