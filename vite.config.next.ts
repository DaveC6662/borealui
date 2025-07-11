import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const getEntryMap = require("./scripts/buildEntryMap");
import path from "path";

const externals = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "marked",
  "uuid",
];

const nextEntries = getEntryMap("./src/next");
console.log("nextEntries:", nextEntries);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist/next",
    emptyOutDir: true,
    sourcemap: true,
    minify: false,

    lib: {
      entry: nextEntries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        return `${entryName}${format === "es" ? ".js" : ".cjs.js"}`;
      },
    },

    rollupOptions: {
      external: externals,
    },
  },
});
