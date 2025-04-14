/**
 * Generates initials from a full name.
 * If a single name is provided, uses the first two letters.
 * If multiple words, uses the first letter of the first two words.
 *
 * @param name - The full name to convert to initials.
 * @returns The uppercase initials (e.g., "John Doe" → "JD").
 */
export const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/);
    const first = words[0]?.[0] || "";
    const second = words[1]?.[0] || words[0]?.[1] || "";
    return (first + second).toUpperCase() || "?";
  };
  