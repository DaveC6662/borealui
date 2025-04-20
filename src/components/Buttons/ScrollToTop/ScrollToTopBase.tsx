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
    <div className={classMap.container}>
      {isVisible && (
        <div
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
          className={classMap.button}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          <IconComponent className={classMap.icon} />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopBase;
