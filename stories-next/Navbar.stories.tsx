import { Meta, StoryObj } from "@storybook/nextjs";
import { Navbar } from "@/index.next";
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

export const Default: Story = {
  render: (args) => {
    window.history.pushState({}, "", "/");
    return <Navbar {...args} />;
  },
};

export const MusicActive: Story = {
  args: {
    items: mockItems,
    mockPath: "/Music",
  },
  render: (args) => {
    window.history.pushState({}, "", "/Music");
    return <Navbar {...args} />;
  },
};

export const BlogActive: Story = {
  args: {
    items: mockItems,
    mockPath: "/Blog",
  },
  render: (args) => {
    window.history.pushState({}, "", "/Blog");
    return <Navbar {...args} />;
  },
};
