import { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/NavBar/core/NavBar";
import {
  FaHome,
  FaCompactDisc,
  FaImage,
  FaCode,
  FaCommentAlt,
  FaPaintBrush,
} from "react-icons/fa";
import type { NavBarProps } from "@/components/NavBar/NavBar.types";

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
  component: NavBar,
  tags: ["autodocs"],
  decorators: [(Story) => <><div id="nav-root" /><Story /></>],
  args: {
    items: mockItems,
  },
};

export default meta;

type Story = StoryObj<NavBarProps>;

export const Default: Story = {
  render: (args) => {
    window.history.pushState({}, "", "/");
    return <NavBar {...args} />;
  },
};

export const MusicActive: Story = {
  render: (args) => {
    window.history.pushState({}, "", "/Music");
    return <NavBar {...args} />;
  },
};

export const BlogActive: Story = {
  render: (args) => {
    window.history.pushState({}, "", "/Blog");
    return <NavBar {...args} />;
  },
};
