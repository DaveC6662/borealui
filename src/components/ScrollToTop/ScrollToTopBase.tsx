import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";
import { RoundingType, ShadowType } from "../../types/types";
import { capitalize } from "../../utils/capitalize";
import { combineClassNames } from "../../utils/classNames";
import React, { useEffect, useState } from "react";

export interface ScrollToTopBaseProps {
  classMap: Record<string, string>;
  rounding?: RoundingType;
  shadow?: ShadowType;
  IconComponent: React.ElementType;
  offset?: number;
  "data-testid"?: string;
}

const ScrollToTopBase: React.FC<ScrollToTopBaseProps> = ({
  classMap,
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  IconComponent,
  offset = 300,
  "data-testid": testId = "scroll",
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

  const iconClass = combineClassNames(
    classMap.icon,
    shadow && classMap[`shadow${capitalize(shadow)}`],
    rounding && classMap[`round${capitalize(rounding)}`]
  );

  return (
    <div className={classMap.wrapper}>
      <div
        aria-live="polite"
        className="sr_only"
        role="status"
        data-testid={`${testId}-announcement`}
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
          data-testid={`${testId}-button`}
        >
          <IconComponent className={iconClass} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopBase;
