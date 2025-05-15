import React from "react";
import FooterBase from "../FooterBase";
import { FooterProps } from "../Footer.types";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import ThemeSelect from "../../Select/ThemeSelect/core/ThemeSelect";
import "./Footer.scss";

const styles = {
  footer: "footer",
  primary: "footer_primary",
  secondary: "footer_secondary",
  content: "footer_content",
  logo: "footer_logo",
  left: "footer_left",
  links: "footer_links",
  link: "footer_link",
  social: "footer_social",
  themeToggle: "footer_theme_toggle",
};

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <FooterBase
      {...props}
      IconButton={IconButton}
      ThemeSelect={ThemeSelect}
      classNames={styles}
    />
  );
};

export default Footer;
