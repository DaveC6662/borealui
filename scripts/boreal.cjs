#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";

const componentName = process.argv[3];

if (!componentName) {
  console.error(
    "❌ Please provide a component name. Usage: npm run boreal new [ComponentName]"
  );
  process.exit(1);
}

const pascal = componentName;
const kebab = pascal.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const folder = `src/components/${pascal}`;

const createFile = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log(`✔ Created: ${filePath}`);
};

// --- Paths ---
const basePath = `${folder}/${pascal}Base.tsx`;
const baseTypesPath = `${folder}/${pascal}.types.ts`;
const corePath = `${folder}/core/${pascal}.tsx`;
const coreScssPath = `${folder}/core/${pascal}.scss`;
const nextPath = `${folder}/next/${pascal}.tsx`;
const nextScssModulePath = `${folder}/next/${pascal}.module.scss`;
const testPath = `__tests__/${pascal}.test.tsx`;
const storyCorePath = `stories-core/${pascal}.stories.tsx`;
const storyNextPath = `stories-next/${pascal}.stories.tsx`;

// --- Templates ---
const baseTemplate = `import React from "react";
import {${pascal}Props} from "./${pascal}.types";

const ${pascal}Base: React.FC<${pascal}Props> = (({children, classMap, ...rest}) => {
  return <div className={classMap.root}>{/* Base logic here */}</div>;
});

${pascal}Base.displayName = "${pascal}Base";

export default ${pascal}Base;
`;

const typesTemplate = `export interface ${pascal}Props {
  children?: React.ReactNode;
  classMap: Record<string, string>;
}
`;

const coreTemplate = `import React from "react";
import ${pascal}Base from "../${pascal}Base";
import "./${pascal}.scss";

const classes = {
  root: "${kebab}",
};

const ${pascal}: React.FC = (props) => (
  <${pascal}Base {...props} classMap={classes} />
);

export default ${pascal};
`;

const nextTemplate = `"use client";
import React from "react";
import ${pascal}Base from "../${pascal}Base";
import styles from "./${pascal}.module.scss";

const ${pascal}: React.FC = (props) => (
  <${pascal}Base {...props} classMap={styles}/>
);

export default ${pascal};
`;

const coreScssTemplate = `
`;

const nextScssModuleTemplate = `
`;

const testTemplate = `import { render } from "@testing-library/react";
import ${pascal}Base from "../src/components/${pascal}/${pascal}Base";

const classMap = {};

describe("${pascal}Base", () => {
  it("renders without crashing", () => {
    render(<${pascal}Base classMap={classMap} />);
  });
});
`;

const storyTemplate = (
  importPath
) => `import { Meta, StoryObj } from "@storybook/react";
import { ${pascal} } from "${importPath}";
import { ${pascal}Props } from "../src/components/${pascal}/${pascal}.types";

const meta: Meta<${pascal}Props> = {
  title: "Components/${pascal}",
  component: ${pascal},
  tags: ["autodocs"],
  args: {
    children: "${pascal} Text",
  },
};

export default meta;
type Story = StoryObj<${pascal}Props>;

export const Default: Story = {};
`;

// --- Create Files ---
createFile(basePath, baseTemplate);
createFile(baseTypesPath, typesTemplate);
createFile(corePath, coreTemplate);
createFile(coreScssPath, coreScssTemplate);
createFile(nextPath, nextTemplate);
createFile(nextScssModulePath, nextScssModuleTemplate);
createFile(testPath, testTemplate);
createFile(storyCorePath, storyTemplate("../src/index.core"));
createFile(storyNextPath, storyTemplate("../src/index.next"));
