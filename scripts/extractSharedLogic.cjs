// scripts/utils/extractSharedLogic.js
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

/**
 * Extracts JSX from core and next versions of a component,
 * verifies if they match, and generates a safe Base component.
 */
async function extractSharedLogic({ name, corePath, nextPath }) {
  const coreCode = fs.readFileSync(corePath, "utf-8");
  const nextCode = fs.readFileSync(nextPath, "utf-8");

  const coreMatch = coreCode.match(/return\s*\(([\s\S]*?)\)[;\n]/);
  const coreJSX = coreMatch?.[1];

  const nextMatch = nextCode.match(/return\s*\(([\s\S]*?)\)[;\n]/);
  const nextJSX = nextMatch?.[1];

  if (!coreJSX || !nextJSX) {
    console.warn(`⚠️  ${name}: Could not extract JSX body.`);
    return null;
  }

  const jsxMatch = coreJSX.replace(/\s/g, "") === nextJSX.replace(/\s/g, "");

  if (!jsxMatch) {
    console.warn(`⚠️  ${name}: core/next JSX mismatch — skipping.`);
    return null;
  }

  const baseSource = `import React from 'react';

import { ${name}Props } from './${name}.types';

interface ${name}BaseProps extends ${name}Props {
  classNames: {
    wrapper: string;
    [key: string]: string;
  };
}

const ${name}Base: React.FC<${name}BaseProps> = ({ classNames, children, ...props }) => {
  return (
    ${coreJSX.trim()}
  );
};

export default ${name}Base;`;

  try {
    const formatted = await prettier.format(baseSource, { parser: "babel" });
    return formatted;
  } catch (err) {
    console.error(`❌ Failed to format ${name}Base.tsx:`, err.message);
    return baseSource; // fallback: unformatted
  }
}

module.exports = { extractSharedLogic };
