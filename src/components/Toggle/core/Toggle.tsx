import React from "react";
import "./Toggle.scss";
import ToggleBase from "../ToggleBase";
import { ToggleProps } from "../Toggle.types";
import { combineClassNames } from "../../../utils/classNames";

/**
 * Core version of the Toggle component using global SCSS styles.
 */
const Toggle: React.FC<ToggleProps> = (props) => {
  const {
    theme = "primary",
    size = "medium",
    disabled = false,
    className = "",
  } = props;

  const styles = {
    toggleContainer: "toggleContainer",
    toggle: "toggle",
    active: "active",
    slider: "slider",
    label: "label",
    [theme]: theme,
    [size]: size,
    disabled: "disabled",
  };

  return (
    <ToggleBase
      {...props}
      className={combineClassNames(className)}
      styles={styles}
    />
  );
};

export default Toggle;
