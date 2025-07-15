import React from "react";
import FooterBase from "../FooterBase";
import { FooterProps } from "../Footer.types";
import IconButton from "../../IconButton/core/IconButton";
import ThemeSelect from "../../Select/ThemeSelect/core/ThemeSelect";
import "./Footer.scss";

const classes = {
  footer: "footer",

  primary: "footer_primary",
  secondary: "footer_secondary",
  tertiary: "footer_tertiary",
  quaternary: "footer_quaternary",
  clear: "footer_clear",

  shadowNone: "footer_shadow-None",
  shadowLight: "footer_shadow-Light",
  shadowMedium: "footer_shadow-Medium",
  shadowStrong: "footer_shadow-Strong",
  shadowIntense: "footer_shadow-Intense",

  roundNone: "footer_round-None",
  roundSmall: "footer_round-Small",
  roundMedium: "footer_round-Medium",
  roundLarge: "footer_round-Large",

  attachmentStatic: "footer_attachment-static",
  attachmentFixed: "footer_attachment-fixed",
  attachmentSticky: "footer_attachment-sticky",

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
      classMap={classes}
    />
  );
};

export default Footer;
