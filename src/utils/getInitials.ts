/**
 * Returns the initials from a given full name string.
 *
 * Extracts the first character from the first word and the first character of the second word (if available).
 * If only one word is provided, it uses the first two characters of that word as a fallback.
 * If no valid characters are found, it returns "?".
 *
 * @param {string} name - The full name to extract initials from.
 * @returns {string} A string of up to two uppercase initials, or "?" if the input is empty or invalid.
 *
 * @example
 * getInitials("John Doe"); // "JD"
 * getInitials("Alice");    // "AL"
 * getInitials("   ");      // "?"
 */
export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] || "";
  const second = words[1]?.[0] || words[0]?.[1] || "";
  return (first + second).toUpperCase() || "?";
};
