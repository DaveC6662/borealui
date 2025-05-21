import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const externals = ["react", "react-dom", "marked", "uuid"];

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
      entry: path.resolve(__dirname, "src/index.core.ts"),
      name: "BorealUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.esm.js" : "index.cjs.js"),
    },

    rollupOptions: {
      external: externals,
    },
  },
});
