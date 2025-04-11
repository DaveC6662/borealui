"use client";

import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styles from "./STT.module.scss";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
