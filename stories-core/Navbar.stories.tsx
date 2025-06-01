import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "../src/index.core";
import {
  FaHome,
  FaCompactDisc,
  FaImage,
  FaCode,
  FaCommentAlt,
  FaPaintBrush,
} from "react-icons/fa";
import type { NavBarProps } from "../src/components/NavBar/NavBar.types";

// Theme and state options
const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
] as const;

const stateOptions = ["success", "error", "warning"] as const;

const mockItems: NavBarProps["items"] = [
  { icon: <FaHome />, label: "Home", path: "/" },
  { icon: <FaCompactDisc />, label: "Music", path: "/Music" },
  { icon: <FaImage />, label: "Images", path: "/Photography" },
  { icon: <FaCode />, label: "Code", path: "/Code" },
  { icon: <FaCommentAlt />, label: "Blog", path: "/Blog" },
  { icon: <FaPaintBrush />, label: "Design", path: "/Design" },
];

const meta: Meta<NavBarProps> = {
  title: "Components/NavBar",
  component: Navbar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <div id="nav-root" />
        <Story />
      </>
    ),
  ],
  args: {
    items: mockItems,
  },
};

export default meta;
type Story = StoryObj<NavBarProps>;

// Dynamic interactive theme + state story
export const Themes: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<NavBarProps["theme"]>("primary");

    window.history.pushState({}, "", "/"); // Ensure routing for active state

    return (
      <div style={{ paddingTop: "5rem", textAlign: "center" }}>
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ marginRight: "1rem" }}>
            Theme:
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as typeof theme)}
              style={{ marginLeft: "0.5rem" }}
            >
              {themeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Navbar {...args} theme={theme}/>
      </div>
    );
  },
};
