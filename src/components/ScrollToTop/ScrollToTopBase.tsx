import React, { useEffect, useState } from "react";

export interface ScrollToTopBaseProps {
  classMap: Record<string, string>;
  IconComponent: React.ElementType;
  offset?: number;
}

const ScrollToTopBase: React.FC<ScrollToTopBaseProps> = ({
  classMap,
  IconComponent,
  offset = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > offset);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [offset]);

  return (
    <div className={classMap.wrapper}>
      <div
        aria-live="polite"
        className="sr_only"
        role="status"
        data-testid="scroll-announcement"
      >
        {isVisible ? "Scroll to top button is now visible" : ""}
      </div>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className={classMap.button}
          title="Scroll to top"
          type="button"
          aria-label="Scroll to top"
          data-testid="scroll-button"
        >
          <IconComponent className={classMap.icon} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopBase;
