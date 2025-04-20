"use client";

import { forwardRef } from "react";
import styles from "./Tooltip.module.scss";
import { TooltipBase } from "../TooltipBase";
import { TooltipProps } from "../Tooltip.types";

/**
 * Tooltip component for Next.js using scoped CSS Modules.
 *
 * This is a framework-specific wrapper around the shared `TooltipBase` logic,
 * passing in module-based styling for scoped visual presentation.
 *
 * @component
 * @example
 * ```tsx
 * <Tooltip content="Helpful info" position="bottom" theme="secondary">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 *
 * @param {TooltipProps} props - Props to configure the tooltip behavior and appearance.
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the tooltip element.
 * @returns {JSX.Element} A styled and accessible tooltip component.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => (
  <TooltipBase {...props} ref={ref} styles={styles} />
));

Tooltip.displayName = "Tooltip";

export default Tooltip;
