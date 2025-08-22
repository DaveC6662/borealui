import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import { combineClassNames } from "../../utils/classNames";
import { TooltipProps } from "./Tooltip.types";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TooltipBase = forwardRef<
  HTMLDivElement,
  TooltipProps & { classMap: Record<string, string> }
>(function TooltipBase(
  {
    content,
    position = "top",
    theme = getDefaultTheme(),
    rounding = getDefaultRounding(),
    shadow = getDefaultShadow(),
    state = "",
    children,
    className = "",
    "data-testid": testId = "tooltip",
    classMap,
    ...rest
  },
  ref
) {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  const toolTipClassName = useMemo(
    () =>
      combineClassNames(
        classMap.tooltip,
        classMap[position],
        classMap[theme],
        classMap[state],
        visible && classMap.visible,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap, position, theme, state, visible, shadow, rounding]
  );

  const triggerProps = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    "aria-describedby": visible ? tooltipId : undefined,
    "data-testid": `${testId}-trigger`,
  } as const;

  let trigger: React.ReactNode;

  if (isValidElement(children)) {
    const isNaturallyFocusable =
      typeof (children as any).type === "string" &&
      ["a", "button", "input", "textarea", "select"].includes(
        (children as any).type
      );

    const existingTabIndex = (children.props as any).tabIndex;
    const maybeTabIndex =
      isNaturallyFocusable || existingTabIndex !== undefined
        ? {}
        : { tabIndex: 0 };

    trigger = cloneElement(children as React.ReactElement, {
      ...triggerProps,
      ...maybeTabIndex,
    });
  } else {
    trigger = (
      <span tabIndex={0} {...triggerProps} className={classMap.triggerWrapper}>
        {children}
      </span>
    );
  }

  return (
    <div
      className={combineClassNames(classMap.container, className)}
      data-testid={`${testId}-container`}
    >
      {trigger}

      <div
        ref={ref}
        id={tooltipId}
        className={toolTipClassName}
        role="tooltip"
        aria-hidden={!visible}
        data-testid={testId}
        {...rest}
      >
        {content}
      </div>
    </div>
  );
});

TooltipBase.displayName = "TooltipBase";
export default TooltipBase;
