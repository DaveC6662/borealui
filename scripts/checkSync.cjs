const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "../src/components");

function checkComponentSync(componentName) {
  const corePath = path.join(
    COMPONENTS_DIR,
    componentName,
    "core",
    `${componentName}.core.tsx`
  );
  const nextPath = path.join(
    COMPONENTS_DIR,
    componentName,
    "next",
    `${componentName}.next.tsx`
  );

  if (!fs.existsSync(corePath) || !fs.existsSync(nextPath)) {
    console.warn(`⚠️  Missing files in component: ${componentName}`);
    return false;
  }

  const coreContent = fs.readFileSync(corePath, "utf-8").replace(/\s/g, "");
  const nextContent = fs.readFileSync(nextPath, "utf-8").replace(/\s/g, "");

  if (coreContent === nextContent) {
    console.log(`✅ ${componentName}: core and next versions are in sync.`);
    return true;
  } else {
    console.warn(`❌ ${componentName}: core and next versions differ.`);
    return false;
  }
}

function runCheck() {
  const components = fs.readdirSync(COMPONENTS_DIR);
  let allSynced = true;

  for (const component of components) {
    const result = checkComponentSync(component);
    if (!result) allSynced = false;
  }

  if (!allSynced) {
    process.exitCode = 1;
  } else {
    console.log("✨ All components are synced.");
  }
}

runCheck();
