import type { Preview } from "@storybook/react-vite";
import ThemeProvider from "../src/context/ThemeContext";
import "../src/styles/globals.scss";
import { ThemeSelect } from "../src/index.core";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "var(--background-color)",
          }}
        >
          <Story />
        </div>
        <ThemeSelect />
      </ThemeProvider>
    ),
  ],
};

export default preview;
