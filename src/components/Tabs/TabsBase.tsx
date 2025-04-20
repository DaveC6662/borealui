import React, { useState } from "react";
import { TabsProps } from "./Tabs.types";

/**
 * TabsBase contains shared logic and structure for all variants.
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

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
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
        data-testid={`${testId}-tablist`}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
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
        data-testid={`${testId}-panel`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default TabsBase;
