import React from "react";
import { ButtonProps } from "./Button.types";

export const ButtonBase: React.FC<ButtonProps & { className?: string }> = ({ children, className = "", ...rest }) => {
  return <div className={className} {...rest}>{children}</div>;
};
