import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import getEntryMap from "./scripts/buildEntryMap";
import path from "path";

const externals = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "next",
  "marked",
  "uuid",
];

const coreEntries = getEntryMap("./src/core");
console.log("nextEntries:", coreEntries);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist/core",
    emptyOutDir: true,
    sourcemap: true,
    minify: false,

    lib: {
      entry: coreEntries,
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
