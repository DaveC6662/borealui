import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import preserveDirectives from "rollup-plugin-preserve-directives";
import getEntryMap from "./scripts/buildEntryMap.js";
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
nextEntries["index"] = path.resolve(__dirname, "./src/index.next.ts");

export default defineConfig({
  plugins: [react(), libInjectCss()],

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
    cssCodeSplit: true,

    lib: {
      entry: nextEntries,
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },

    rollupOptions: {
      external: externals,
      plugins: [preserveDirectives()],
      output: {
        preserveModules: true,
      },
    },
  },
});
