#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const COMPONENTS_ROOT = path.join(__dirname, "../src/components");

function getConflictingProps(componentName) {
  const typeFile = path.join(
    COMPONENTS_ROOT,
    componentName,
    `${componentName}.types.ts`
  );
  if (!fs.existsSync(typeFile)) return [];

  const typeSource = fs.readFileSync(typeFile, "utf-8");
  const conflicts = [];

  // Common HTML attributes + known event handlers to omit if found in component types
  const htmlAttributes = [
    "id",
    "name",
    "type",
    "disabled",
    "className",
    "onClick",
    "onChange",
    "onSubmit",
    "onFocus",
    "onBlur",
    "onToggle",
    "onKeyDown",
    "onKeyUp",
    "onMouseEnter",
    "onMouseLeave",
    "onInput",
    "onDragStart",
    "onDrop",
    "onScroll",
  ];

  htmlAttributes.forEach((attr) => {
    const regex = new RegExp(`\\b${attr}\\s*[:?]`, "g");
    if (regex.test(typeSource)) {
      conflicts.push(attr);
    }
  });

  return conflicts;
}

const baseTemplate = (name, omitted = []) => {
  const omitString = omitted.length
    ? omitted.map((o) => `"${o}"`).join(" | ")
    : "never";

  return `// ${name}Base.tsx
import React, { ReactNode, HTMLAttributes } from "react";
import { ${name}Props } from "./${name}.types";

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, ${omitString}>;

interface ${name}BaseProps extends ${name}Props, DivProps {
  children?: ReactNode;
  classNames: {
    wrapper: string;
    header?: string;
    icon?: string;
    content?: string;
    title?: string;
    [key: string]: string | undefined;
  };
}

const ${name}Base: React.FC<${name}BaseProps> = ({
  classNames,
  children,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames.wrapper}>
      {children}
    </div>
  );
};

export default ${name}Base;
`;
};

function generateBaseComponent(name) {
  const dir = path.join(COMPONENTS_ROOT, name);
  const basePath = path.join(dir, `${name}Base.tsx`);

  if (fs.existsSync(basePath)) {
    console.log(`⚠️  Skipping ${name} — Base already exists.`);
    return;
  }

  const conflicts = getConflictingProps(name);
  const baseCode = baseTemplate(name, conflicts);
  fs.writeFileSync(basePath, baseCode);
  console.log(`✅ Generated ${name}Base.tsx`);
}

function run() {
  const componentDirs = fs.readdirSync(COMPONENTS_ROOT);
  componentDirs.forEach((name) => {
    const fullPath = path.join(COMPONENTS_ROOT, name);
    if (fs.statSync(fullPath).isDirectory()) {
      generateBaseComponent(name);
    }
  });
}

run();
