const fs = require("fs");
const path = require("path");

function generateEntrypoints(type) {
  const componentsDir = path.resolve(__dirname, "../src/components");
  const outDir = path.resolve(__dirname, `../src/${type}`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.readdirSync(componentsDir, { withFileTypes: true }).forEach((dirent) => {
    if (!dirent.isDirectory()) return;

    const component = dirent.name;

    const stylePath =
      type === "core"
        ? path.resolve(componentsDir, component, "core", `${component}.scss`)
        : path.resolve(
            componentsDir,
            component,
            "next",
            `${component}.module.scss`,
          );

    const styleImport = fs.existsSync(stylePath)
      ? type === "core"
        ? `import "../components/${component}/core/${component}.scss";`
        : `import "../components/${component}/next/${component}.module.scss";`
      : "";

    const content =
      `
${styleImport}
export { default } from "../components/${component}/${type}/${component}";
export * from "../components/${component}/${component}.types";
`.trim() + "\n";

    fs.writeFileSync(path.join(outDir, `${component}.ts`), content);
  });
}

generateEntrypoints("core");
generateEntrypoints("next");
console.log("Generated entrypoint files!");
