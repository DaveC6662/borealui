import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./STT.scss";

/**
 * A floating button that appears when the user scrolls down the page,
 * allowing them to quickly return to the top.
 *
 * Automatically shows when `window.pageYOffset > 300` and hides otherwise.
 *
 * @returns {JSX.Element} ScrollToTopButton
 *
 * @example
 * ```tsx
 * <ScrollToTopButton />
 * ```
 */
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  /**
   * Toggles visibility based on scroll position.
   */
  const toggleVisibility = (): void => {
    setIsVisible(window.pageYOffset > 300);
  };

  /**
   * Scrolls the window smoothly to the top.
   */
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={"scrollToTop"}>
      {isVisible && (
        <div
          onClick={scrollToTop}
          role="button"
          aria-label="Scroll to top"
          className={"scrollButton"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          <FaArrowCircleUp className={"scrollIcon"} />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
