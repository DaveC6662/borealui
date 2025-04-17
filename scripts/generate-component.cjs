#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const COMPONENTS_ROOT = path.join(__dirname, "../src/components");
const TESTS_ROOT = path.join(__dirname, "../__tests__");
const STORYBOOK_CORE_ROOT = path.join(__dirname, "../stories-core");
const STORYBOOK_NEXT_ROOT = path.join(__dirname, "../stories-next");

const rawName = process.argv[2];

if (!rawName) {
  console.error("❌ Please provide a component name.");
  process.exit(1);
}

const pascalCase = (str) =>
  str.replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());

const componentName = pascalCase(rawName);
const componentDir = path.join(COMPONENTS_ROOT, componentName);
const testFile = path.join(TESTS_ROOT, `${componentName}.test.tsx`);
const storyCoreFile = path.join(
  STORYBOOK_CORE_ROOT,
  `${componentName}.stories.tsx`
);
const storyNextFile = path.join(
  STORYBOOK_NEXT_ROOT,
  `${componentName}.stories.tsx`
);

if (fs.existsSync(componentDir)) {
  console.error(`❌ Component "${componentName}" already exists.`);
  process.exit(1);
}

// Step 1: Create folders
["shared", "core", "next"].forEach((sub) =>
  fs.mkdirSync(path.join(componentDir, sub), { recursive: true })
);

fs.mkdirSync(TESTS_ROOT, { recursive: true });
fs.mkdirSync(STORYBOOK_CORE_ROOT, { recursive: true });
fs.mkdirSync(STORYBOOK_NEXT_ROOT, { recursive: true });

// Step 2: Shared files
fs.writeFileSync(
  path.join(componentDir, "shared", `${componentName}.types.ts`),
  `export interface ${componentName}Props {\n  children?: React.ReactNode;\n}\n`
);

fs.writeFileSync(
  path.join(componentDir, "shared", `${componentName}Base.tsx`),
  `import React from "react";\nimport { ${componentName}Props } from "./${componentName}.types";\n\nexport const ${componentName}Base: React.FC<${componentName}Props & { className?: string }> = ({ children, className = "", ...rest }) => {\n  return <div className={className} {...rest}>{children}</div>;\n};\n`
);

fs.writeFileSync(
  path.join(componentDir, "shared", `${componentName}.styles.scss`),
  `// Shared ${componentName} styles\n`
);

// Step 3: Core files
fs.writeFileSync(
  path.join(componentDir, "core", `${componentName}.core.tsx`),
  `import React from "react";\nimport { ${componentName}Base } from "../shared/${componentName}Base";\nimport "./${componentName}.core.scss";\n\nconst ${componentName}Core: React.FC<any> = (props) => {\n  return <${componentName}Base {...props} className="${componentName.toLowerCase()}-core" />;\n};\n\nexport default ${componentName}Core;\n`
);

fs.writeFileSync(
  path.join(componentDir, "core", `${componentName}.core.scss`),
  `.${componentName.toLowerCase()}-core {\n  // Core styles here\n}\n`
);

// Step 4: Next files
fs.writeFileSync(
  path.join(componentDir, "next", `${componentName}.next.tsx`),
  `"use client";\nimport React from "react";\nimport { ${componentName}Base } from "../shared/${componentName}Base";\nimport styles from "./${componentName}.module.scss";\n\nconst ${componentName}Next: React.FC<any> = (props) => {\n  return <${componentName}Base {...props} className={styles.component} />;\n};\n\nexport default ${componentName}Next;\n`
);

fs.writeFileSync(
  path.join(componentDir, "next", `${componentName}.module.scss`),
  `.component {\n  // Next styles here\n}\n`
);

// Step 5: Jest test
fs.writeFileSync(
  testFile,
  `import React from "react";\nimport { render, screen } from "@testing-library/react";\nimport ${componentName}Core from "@/components/${componentName}/core/${componentName}.core";\n\ndescribe("${componentName}", () => {\n  it("renders without crashing", () => {\n    render(<${componentName}Core>Test</${componentName}Core>);\n    expect(screen.getByText("Test")).toBeInTheDocument();\n  });\n});\n`
);

// Step 6: Storybook stories
fs.writeFileSync(
  storyCoreFile,
  `import React from "react";\nimport type { Meta, StoryObj } from "@storybook/react";\nimport ${componentName}Core from "@/components/${componentName}/core/${componentName}.core";\n\nconst meta: Meta<typeof ${componentName}Core> = {\n  title: "Core/${componentName}",\n  component: ${componentName}Core,\n};\n\nexport default meta;\n\nexport const Default: StoryObj<typeof ${componentName}Core> = {\n  render: () => <${componentName}Core>Hello</${componentName}Core>,\n};\n`
);

fs.writeFileSync(
  storyNextFile,
  `import React from "react";\nimport type { Meta, StoryObj } from "@storybook/react";\nimport ${componentName}Next from "@/components/${componentName}/next/${componentName}.next";\n\nconst meta: Meta<typeof ${componentName}Next> = {\n  title: "Next/${componentName}",\n  component: ${componentName}Next,\n};\n\nexport default meta;\n\nexport const Default: StoryObj<typeof ${componentName}Next> = {\n  render: () => <${componentName}Next>Hello</${componentName}Next>,\n};\n`
);

console.log(
  `✅ Component "${componentName}" scaffolded with test and stories.`
);
