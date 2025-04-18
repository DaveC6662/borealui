// scripts/utils/rewriteWrapper.js
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function rewriteWrapper({ name, variant, isNext }) {
  const componentPath = path.join(
    __dirname,
    `../../src/components/${name}/${variant}/${name}.tsx`
  );

  const baseImport = `../${name}Base`;
  const classNameHelper = isNext
    ? `import styles from "./${name}.module.scss";`
    : `import "./${name}.scss";`;
  const combinePath = isNext
    ? "@/utils/classNames"
    : "../../../utils/classNames";

  const wrapper = `"${isNext ? "use client" : ""}"

import React, { useMemo, useState } from "react";
import { ${name}Props } from "../${name}.types";
import { combineClassNames } from "${combinePath}";
import ${name}Base from "${baseImport}";
${classNameHelper}

const ${name}: React.FC<${name}Props> = (props) => {
  const {
    className = "",
    theme = "primary",
    size = "medium",
    outline = false,
    ...rest
  } = props;

  const classNames = {
    wrapper: combineClassNames(
      ${isNext ? `styles.${name.toLowerCase()}` : `"${name.toLowerCase()}"`},
      ${isNext ? `styles[theme]` : "theme"},
      ${isNext ? `styles[size]` : "size"},
      outline && ${isNext ? `styles.outline` : `"outline"`},
      className
    )
  };

  return <${name}Base {...rest} theme={theme} size={size} outline={outline} classNames={classNames} />;
};

export default ${name};
`;

  const formatted = prettier.format(wrapper, { parser: "babel-ts" });
  fs.writeFileSync(componentPath, formatted);
  console.log(`✅ Rewrote ${variant}/${name}.tsx using ${name}Base`);
}

module.exports = { rewriteWrapper };
