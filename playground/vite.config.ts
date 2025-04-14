import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        boreal: path.resolve(__dirname, "../src"),
        "@": path.resolve(__dirname, "../src"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@context": path.resolve(__dirname, "../src/context"),
        "@styles": path.resolve(__dirname, "../src/styles"),
        "@types": path.resolve(__dirname, "../src/types"),
        "@utils": path.resolve(__dirname, "../src/utils"),
      }
  }
});
