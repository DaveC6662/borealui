/**
 * Capitalizes the first letter of a given string.
 *
 * Returns the string with its first character converted to uppercase,
 * leaving the rest of the string unchanged.
 *
 * @param {string} s - The input string to capitalize.
 * @returns {string} The capitalized string.
 *
 * @example
 * capitalize("hello"); // "Hello"
 * capitalize("world"); // "World"
 */
export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
