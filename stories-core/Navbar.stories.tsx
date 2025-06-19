import { useState } from "react";
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

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
] as const;

const roundingOptions = ["full", "none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
    theme: "primary",
    rounding: "full",
    shadow: "light",
  },
};

export default meta;
type Story = StoryObj<NavBarProps>;

// Dynamic interactive theme + state story
export const Themes: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<NavBarProps["theme"]>("primary");
    const [rounding, setRounding] = useState<NavBarProps["rounding"]>("full");
    const [shadow, setShadow] = useState<NavBarProps["shadow"]>("light");

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
          <label style={{ marginRight: "1rem" }}>
            Rounding:
            <select
              value={rounding}
              onChange={(e) => setRounding(e.target.value as typeof rounding)}
              style={{ marginLeft: "0.5rem" }}
            >
              {roundingOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label style={{ marginRight: "1rem" }}>
            Shadow:
            <select
              value={shadow}
              onChange={(e) => setShadow(e.target.value as typeof shadow)}
              style={{ marginLeft: "0.5rem" }}
            >
              {shadowOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Navbar {...args} theme={theme} rounding={rounding} shadow={shadow} />
      </div>
    );
  },
};
