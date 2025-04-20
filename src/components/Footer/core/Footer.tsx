import React from "react";
import BaseFooter from "../FooterBase";
import { FooterProps } from "../Footer.types";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import ThemeSelect from "../../Select/ThemeSelect/core/ThemeSelect";
import "./Footer.scss";

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <BaseFooter
      {...props}
      IconButton={IconButton}
      ThemeSelect={ThemeSelect}
      classNames={{
        wrapper: "footerContainer",
        theme: {
          primary: "primary",
          secondary: "secondary",
        },
        content: "footerContent",
        left: "footerLeft",
        links: "footerLinks",
        link: "footerLink",
        social: "footerSocial",
        themeToggle: "themeToggleContainer",
      }}
    />
  );
};

export default Footer;
