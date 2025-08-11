"use client";

import Script from "next/script";
import { ThemeInitScriptProps } from "./ThemeContext.types";

export default function ThemeInitScript({
  storageKeyScheme = "boreal:selectedScheme",
  storageKeyVars = "boreal:cssVars",
  dataAttr = "data-scheme",
  readyAttr = "data-theme-ready",
}: ThemeInitScriptProps) {
  const code = `
  (function(){
    try {
      var docEl = document.documentElement;
      // 1) Apply CSS vars if we cached them
      var raw = localStorage.getItem(${JSON.stringify(storageKeyVars)});
      if (raw) {
        try {
          var vars = JSON.parse(raw);
          for (var k in vars) {
            if (Object.prototype.hasOwnProperty.call(vars, k)) {
              docEl.style.setProperty(k, vars[k]);
            }
          }
        } catch (e) { /* ignore parse errors */ }
      }
      // 2) Apply selected scheme data-attr for any scheme-driven CSS
      var idx = localStorage.getItem(${JSON.stringify(storageKeyScheme)});
      if (idx != null) {
        docEl.setAttribute(${JSON.stringify(dataAttr)}, String(idx));
      }
      // 3) Mark as ready so you can fade in content if you want
      docEl.setAttribute(${JSON.stringify(readyAttr)}, "true");
    } catch (e) { /* no-op */ }
  })();
  `.trim();

  return (
    <Script id="boreal-theme-init" strategy="beforeInteractive">
      {code}
    </Script>
  );
}
