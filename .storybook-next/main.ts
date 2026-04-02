import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  logLevel: "error",
  stories: ["../stories-next/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
};
export default config;
