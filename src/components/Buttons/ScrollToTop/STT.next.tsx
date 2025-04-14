"use client";

import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styles from "./STT.module.scss";

/**
 * A floating button that appears after scrolling down the page.
 * When clicked, it smoothly scrolls the user back to the top of the page.
 *
 * This component is useful for long pages where users may want quick access to the top.
 */
const ScrollToTopButton: React.FC = () => {
  // Tracks the visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState<boolean>(false);

  /**
   * Toggles the visibility of the scroll-to-top button
   * based on the current vertical scroll position.
   */
  const toggleVisibility = (): void => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  /**
   * Smoothly scrolls the page back to the top.
   */
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Sets up the scroll event listener when the component mounts
   * and removes it when the component unmounts.
   */
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={styles.scrollToTop}>
      {isVisible && (
        <div
          onClick={scrollToTop}
          role="button"
          aria-label="Scroll to top"
          className={styles.scrollButton}
        >
          <FaArrowCircleUp className={styles.scrollIcon} />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
