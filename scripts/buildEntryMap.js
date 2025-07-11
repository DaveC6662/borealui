import fs from "fs";
import path from "path";

export default function getEntryMap(dir) {
  const entryDir = path.resolve(process.cwd(), dir);
  const entries = {};
  fs.readdirSync(entryDir).forEach((file) => {
    if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      const name = file.replace(/\.(ts|tsx)$/, "");
      entries[name] = path.resolve(entryDir, file);
    }
  });
  return entries;
}
