import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { BaseTabsProps } from "./Tabs.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TabsBase: React.FC<BaseTabsProps> = ({
  tabs,
  defaultIndex = 0,
  onChange,
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  className = "",
  theme = getDefaultTheme(),
  state = "",
  size = getDefaultSize(),
  orientation = "horizontal",
  activationMode = "auto",
  "data-testid": testId = "tabs",
  classMap,
}) => {
  const uid = useId();
  const baseId = `${testId}-${uid}`;

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [focusIndex, setFocusIndex] = useState(defaultIndex);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const current = activationMode === "manual" ? focusIndex : activeIndex;
    tabRefs.current.forEach((el, i) => {
      if (!el) return;
      el.setAttribute("tabindex", i === current ? "0" : "-1");
    });
    tabRefs.current[current]?.focus();
  }, [activeIndex, focusIndex, activationMode]);

  const containerClassNames = useMemo(
    () =>
      combineClassNames(
        classMap.container,
        classMap[theme],
        classMap[state],
        classMap[size],
        className
      ),
    [classMap, theme, state, size, className]
  );

  const tabClassNames = useMemo(
    () =>
      combineClassNames(
        classMap.tab,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap, shadow, rounding]
  );

  const activate = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  const isDisabled = (index: number) => !!(tabs[index] as any)?.disabled;

  const nextEnabled = (start: number, dir: 1 | -1) => {
    const len = tabs.length;
    let i = start;
    for (let n = 0; n < len; n++) {
      i = (i + dir + len) % len;
      if (!isDisabled(i)) return i;
    }
    return start;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const horiz = orientation === "horizontal";
    const { key } = event;

    let newFocus = focusIndex;

    if (horiz && key === "ArrowRight") {
      event.preventDefault();
      newFocus = nextEnabled(focusIndex, 1);
    } else if (horiz && key === "ArrowLeft") {
      event.preventDefault();
      newFocus = nextEnabled(focusIndex, -1);
    } else if (!horiz && key === "ArrowDown") {
      event.preventDefault();
      newFocus = nextEnabled(focusIndex, 1);
    } else if (!horiz && key === "ArrowUp") {
      event.preventDefault();
      newFocus = nextEnabled(focusIndex, -1);
    } else if (key === "Home") {
      event.preventDefault();
      newFocus = nextEnabled(-1, 1);
    } else if (key === "End") {
      event.preventDefault();
      newFocus = nextEnabled(0, -1);
    } else if (
      activationMode === "manual" &&
      (key === "Enter" || key === " ")
    ) {
      event.preventDefault();
      if (!isDisabled(focusIndex)) activate(focusIndex);
      return;
    } else {
      return;
    }

    setFocusIndex(newFocus);
    if (activationMode === "auto") activate(newFocus);
  };

  const currentPanelId = `${baseId}-panel-${activeIndex}`;
  const currentTabId = `${baseId}-tab-${activeIndex}`;

  return (
    <div className={containerClassNames} data-testid={testId}>
      <div
        className={classMap.tabs}
        role="tablist"
        aria-label="Tabs"
        aria-orientation={orientation}
        onKeyDown={onKeyDown}
        data-testid={`${testId}-tablist`}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === activeIndex;
          const disabled = isDisabled(index);
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={combineClassNames(
                tabClassNames,
                isActive && classMap.active,
                disabled && classMap.disabled
              )}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              id={tabId}
              aria-disabled={disabled || undefined}
              onClick={() => {
                if (disabled) return;
                setFocusIndex(index);
                activate(index);
              }}
              data-testid={`${testId}-tab-${index}`}
            >
              {Icon && (
                <div
                  className={classMap.icon}
                  aria-hidden="true"
                  data-testid={`${testId}-icon-${index}`}
                >
                  <Icon />
                </div>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className={classMap.content}
        role="tabpanel"
        id={currentPanelId}
        aria-labelledby={currentTabId}
        tabIndex={0}
        data-testid={`${testId}-panel`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

TabsBase.displayName = "TabsBase";
export default TabsBase;
