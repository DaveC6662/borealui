// vite.config.next.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.next.ts"),
      name: "BorealUINext",
      fileName: (format) => `boreal-ui.next.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "next",
        "react-icons",
        "@tiptap/react",
        "@tiptap/starter-kit",
        "@tiptap/extension-heading",
        "@tiptap/extension-paragraph",
        "dompurify",
        "marked",
        "uuid",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    outDir: "dist/next",
    emptyOutDir: false,
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
});
