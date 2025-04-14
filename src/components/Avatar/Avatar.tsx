/**
 * Avatar component that conditionally loads either the Next.js-optimized or React-compatible version.
 * 
 * - If `./Avatar.next` is available, it will be loaded (optimized for Next.js using `next/image`, `next/link`).
 * - Otherwise, it falls back to `./Avatar.core`, which uses base React and standard HTML elements.
 *
 * @module Avatar
 * @see {@link AvatarProps} for props reference
 */

let Avatar: React.FC<any>;

if (process.env.NEXT_RUNTIME || typeof window !== "undefined") {
  Avatar = require("./Avatar.next").default;
} else {
  Avatar = require("./Avatar.core").default;
}

export default Avatar;
