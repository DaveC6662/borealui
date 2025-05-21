import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: await import("./webpack.config.cjs").then(
        (m) => m.default
      ),
    },
    supportFile: "cypress/support/component.ts",
    specPattern: "cypress/components/**/*.cy.{ts,tsx}",
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    fixturesFolder: "cypress/fixtures",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
  },
});
