import React, { useState, useRef, useEffect } from "react";
import { TabsProps } from "./Tabs.types";

/**
 * Accessible and keyboard-navigable tab component base.
 */
const TabsBase: React.FC<TabsProps & { styles: Record<string, string> }> = ({
  tabs,
  defaultIndex = 0,
  onChange,
  className = "",
  theme = "primary",
  size = "medium",
  "data-testid": testId = "tabs",
  styles,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    tabRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;

    const lastIndex = tabs.length - 1;
    let newIndex = activeIndex;

    if (key === "ArrowRight") {
      newIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    } else if (key === "ArrowLeft") {
      newIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    } else if (key === "Home") {
      newIndex = 0;
    } else if (key === "End") {
      newIndex = lastIndex;
    }

    if (newIndex !== activeIndex) {
      event.preventDefault();
      setActiveIndex(newIndex);
      onChange?.(newIndex);
    }
  };

  return (
    <div
      className={`${styles.tabsContainer} ${styles[theme]} ${styles[size]} ${className}`}
      data-testid={testId}
    >
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Tabs"
        onKeyDown={handleKeyDown}
        data-testid={`${testId}-tablist`}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              ref={(el): void => {
                tabRefs.current[index] = el;
              }}
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
              onClick={() => handleTabClick(index)}
              role="tab"
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              aria-controls={`${testId}-panel-${index}`}
              id={`${testId}-tab-${index}`}
              data-testid={`${testId}-tab-${index}`}
            >
              {Icon && (
                <div
                  className={styles.icon}
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
        className={styles.content}
        role="tabpanel"
        id={`${testId}-panel-${activeIndex}`}
        aria-labelledby={`${testId}-tab-${activeIndex}`}
        tabIndex={0}
        data-testid={`${testId}-panel`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default TabsBase;
