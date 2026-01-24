// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../stories-core/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        "@": path.resolve(__dirname, "../src"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@styles": path.resolve(__dirname, "../src/styles"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@types": path.resolve(__dirname, "../src/types"),
        "@context": path.resolve(__dirname, "../src/context"),
      },
    };
    return config;
  },
};
export default config;
