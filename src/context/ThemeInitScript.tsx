import { Props } from "./ThemeInitScript.types";

export default function ThemeInit({
  storageKeyScheme = "boreal:selectedScheme",
  storageKeyVars = "boreal:cssVars",
  dataAttr = "data-scheme",
  readyAttr = "data-theme-ready",
}: Props) {
  const code = `
  (function(){
    try {
      var docEl = document.documentElement;
      var raw = localStorage.getItem(${JSON.stringify(storageKeyVars)});
      if (raw) {
        try {
          var vars = JSON.parse(raw);
          for (var k in vars) if (Object.prototype.hasOwnProperty.call(vars, k)) {
            docEl.style.setProperty(k, vars[k]);
          }
        } catch(e){}
      }
      var idx = localStorage.getItem(${JSON.stringify(storageKeyScheme)});
      if (idx != null) docEl.setAttribute(${JSON.stringify(dataAttr)}, String(idx));
      docEl.setAttribute(${JSON.stringify(readyAttr)}, "true");
    } catch(e){}
  })();
  `.trim();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}
