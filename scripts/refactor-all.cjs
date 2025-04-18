// scripts/refactor-all.js
const fs = require("fs");
const path = require("path");
const { extractSharedLogic } = require("./extractSharedLogic.cjs");
const generateBaseTemplate = require("./generate-base-component.cjs");
const { rewriteWrapper } = require("./rewriteWrapper.cjs");

const COMPONENTS_DIR = path.join(__dirname, "../src/components");

async function runRefactorAll() {
  const components = fs.readdirSync(COMPONENTS_DIR).filter((name) => {
    const compPath = path.join(COMPONENTS_DIR, name);
    return fs.statSync(compPath).isDirectory();
  });

  components.forEach(async (name) => {
    const corePath = path.join(COMPONENTS_DIR, name, "core", `${name}.tsx`);
    const nextPath = path.join(COMPONENTS_DIR, name, "next", `${name}.tsx`);
    const basePath = path.join(COMPONENTS_DIR, name, `${name}Base.tsx`);

    if (!fs.existsSync(corePath) || !fs.existsSync(nextPath)) {
      console.warn(`⚠️  Skipping ${name} — missing core/next files.`);
      return;
    }

    const baseCode = await extractSharedLogic({ name, corePath, nextPath });
    if (!baseCode) return;

    fs.writeFileSync(basePath, baseCode);
    console.log(`✅ Generated ${name}Base.tsx`);

    rewriteWrapper({ name, variant: "core", isNext: false });
    rewriteWrapper({ name, variant: "next", isNext: true });
  });

  console.log("🎉 Refactoring complete.");
}

(async () => {
  await runRefactorAll();
})();
