#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const COMPONENTS_ROOT = path.join(__dirname, "../src/components");

const baseTemplate = (name) => `// ${name}Base.tsx
import React from "react";
import { ${name}Props } from "./${name}.types";

interface ${name}BaseProps extends ${name}Props {
  id: string;
  isExpanded: boolean;
  toggle: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  classNames: {
    wrapper: string;
    header: string;
    icon: string;
    content: string;
    title: string;
  };
}

export const ${name}Base: React.FC<${name}BaseProps> = ({
  title,
  id,
  children,
  disabled,
  isExpanded,
  toggle,
  handleKeyDown,
  customCollapsedIcon,
  customExpandedIcon,
  classNames,
  ...rest
}) => {
  const renderedIcon = isExpanded
    ? customExpandedIcon ?? "-"
    : customCollapsedIcon ?? "+";

  return (
    <div {...rest} className={classNames.wrapper}>
      <button
        className={classNames.header}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={id}
        disabled={disabled}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        data-testid="${name.toLowerCase()}-toggle"
      >
        <span className={classNames.title}>{title}</span>
        <span className={classNames.icon} aria-hidden="true">
          {renderedIcon}
        </span>
      </button>
      <div
        id={id}
        className={classNames.content}
        role="region"
        data-state={isExpanded ? "open" : "collapsed"}
        data-testid="${name.toLowerCase()}-content"
      >
        {children}
      </div>
    </div>
  );
};
`;

function generateBaseComponent(name) {
  const dir = path.join(COMPONENTS_ROOT, name);
  const basePath = path.join(dir, `${name}Base.tsx`);

  if (fs.existsSync(basePath)) {
    console.log(`⚠️  Skipping ${name} — Base already exists.`);
    return;
  }

  fs.writeFileSync(basePath, baseTemplate(name));
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
