import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import getEntryMap from "./scripts/buildEntryMap.js";
import path from "path";
import copy from "rollup-plugin-copy";

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
console.log("nextEntries:", nextEntries);

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: "src/styles/style.css", dest: "dist/next" },
        { src: "src/styles/style.css", dest: "next" },
      ],
      hook: "writeBundle",
    }),
  ],

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
