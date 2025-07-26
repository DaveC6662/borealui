import fs from "fs";
import path from "path";

const testDir = path.resolve(__dirname);

function importAllTests(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      importAllTests(fullPath);
    } else if (
      entry.name.endsWith(".test.ts") ||
      entry.name.endsWith(".test.tsx")
    ) {
      require(fullPath);
    }
  }
}

importAllTests(testDir);
