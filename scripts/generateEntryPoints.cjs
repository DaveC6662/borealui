const fs = require("fs");
const path = require("path");

function generateEntrypoints(type) {
  const componentsDir = path.resolve(__dirname, `../src/components`);
  const outDir = path.resolve(__dirname, `../src/${type}`);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  fs.readdirSync(componentsDir, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      const component = dirent.name;
      const content = `
export { default } from "../components/${component}/${type}/${component}";
export * from "../components/${component}/${component}.types";
`.trim();
      fs.writeFileSync(path.join(outDir, `${component}.ts`), content);
    }
  });
}

generateEntrypoints("core");
generateEntrypoints("next");
console.log("Generated entrypoint files!");
