import React from "react";
import { ButtonBase } from "../shared/ButtonBase";
import "./Button.core.scss";

const ButtonCore: React.FC<any> = (props) => {
  return <ButtonBase {...props} className="button-core" />;
};

export default ButtonCore;
