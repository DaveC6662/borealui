import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

const externals = ["react", "react-dom", "next", "marked", "uuid"];

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist/next",
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
      entry: path.resolve(__dirname, "src/index.next.ts"),
      name: "BorealUINext",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs.js"),
    },

    rollupOptions: {
      external: externals,
    },
  },
});
