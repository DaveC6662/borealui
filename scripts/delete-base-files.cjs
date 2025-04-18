// scripts/delete-base-files.js
const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "../src/components");

function deleteBaseFiles() {
  const components = fs.readdirSync(COMPONENTS_DIR).filter((name) => {
    const compPath = path.join(COMPONENTS_DIR, name);
    return fs.statSync(compPath).isDirectory();
  });

  components.forEach((name) => {
    const baseFile = path.join(COMPONENTS_DIR, name, `${name}Base.tsx`);
    if (fs.existsSync(baseFile)) {
      fs.unlinkSync(baseFile);
      console.log(`🗑️  Deleted ${name}Base.tsx`);
    }
  });

  console.log("✅ Base file cleanup complete.");
}

deleteBaseFiles();
