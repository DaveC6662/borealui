// src/stories/ScrollToTopButton.stories.tsx

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ScrollToTop } from "../src/index.next"; // adjust path if needed

const meta: Meta = {
  title: "Components/ScrollToTopButton",
  component: ScrollToTop,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div
      style={{
        height: "200vh",
        padding: "2rem",
      }}
    >
      <p style={{ maxWidth: 600 }}>
        Scroll down the page to make the ScrollToTopButton appear. This demo
        uses a tall container to simulate a real scroll environment.
      </p>
      <ScrollToTop />
    </div>
  ),
};
