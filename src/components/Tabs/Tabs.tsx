"use client";

import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Represents a single tab with a label, optional icon, and content.
 */
interface Tab {
  /** The label of the tab. */
  label: string;
  /** An optional icon for the tab. */
  icon?: React.ComponentType;
  /** The content to display when the tab is active. */
  content: React.ReactNode;
}

/**
 * Props for the Tabs component.
 */
interface TabsProps {
  /** Array of tabs to display. */
  tabs: Tab[];
  /** Custom class names to apply to the tabs container. */
  className?: string;
  /** The default active tab index. */
  defaultIndex?: number;
  /** Callback when the active tab changes. */
  onChange?: (index: number) => void;
  /** The theme of the tabs. */
  theme?: ThemeType;
  /** The size of the tabs (e.g., "small", "medium", etc.). */
  size?: SizeType;
  /** Test ID for testing purposes. */
  "data-testid"?: string;
}

/**
 * Tabs component displays a list of tabs that can be selected to display different content.
 * Each tab can have an icon and a label, and the associated content is shown when the tab is active.
 * The active tab is highlighted, and clicking on a tab will change the active tab.
 * 
 * @param {TabsProps} props - The props for the Tabs component.
 * @returns {JSX.Element} The Tabs component.
 */
const Tabs: React.FC<TabsProps> = ({
  tabs,
  className = "",
  defaultIndex = 0,
  onChange,
  theme = "primary",
  size = "medium",
  "data-testid": testId = "tabs",
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  /**
   * Handles the tab click event. It updates the active index and triggers the onChange callback if provided.
   * 
   * @param {number} index - The index of the clicked tab.
   */
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  // Apply combined styles for the tabs container
  const containerClass = combineClassNames(
    styles.tabsContainer,
    styles[theme],
    styles[size],
    className
  );

  return (
    <div className={containerClass} data-testid={testId}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Tabs"
        data-testid={`${testId}-tablist`}
      >
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              className={combineClassNames(styles.tab, isActive && styles.active)}
              onClick={() => handleTabClick(index)}
              role="tab"
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              aria-controls={`${testId}-panel-${index}`}
              id={`${testId}-tab-${index}`}
              data-testid={`${testId}-tab-${index}`}
            >
              {IconComponent && (
                <div className={styles.icon} data-testid={`${testId}-icon-${index}`}>
                  <IconComponent />
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

export default Tabs;
