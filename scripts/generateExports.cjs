const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const exportsMap = pkg.exports || {};

function addExports(type) {
  const distDir = path.resolve(__dirname, `../dist/${type}`);
  const typesDir = path.resolve(__dirname, `../dist/types/${type}`);
  if (!fs.existsSync(distDir)) return;
  fs.readdirSync(distDir)
    .filter((file) => file.endsWith(".js") && !file.startsWith("index"))
    .forEach((file) => {
      const name = file.replace(/\.js$/, "");
      const key = `./${type}/${name}`;
      exportsMap[key] = {
        import: `./dist/${type}/${name}.js`,
        require: `./dist/${type}/${name}.cjs.js`,
        types: `./dist/types/${type}/${name}.d.ts`,
      };
    });
}

addExports("core");
addExports("next");

pkg.exports = exportsMap;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("Updated package.json exports with per-component entries!");
