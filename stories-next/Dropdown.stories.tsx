import { Meta, StoryObj } from "@storybook/nextjs";
import { Dropdown } from "../src/index.next";
import { FaEllipsisV, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import type { DropdownProps } from "../src/components/Dropdown/Dropdown.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];
const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<DropdownProps> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    theme: "primary",
    align: "right",
  },
  argTypes: {
    theme: {
      description: "Sets the visual theme for the dropdown and menu.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    align: {
      description: "Menu alignment relative to the toggle button.",
      control: { type: "select" },
      options: ["left", "right"],
      table: { category: "Appearance" },
    },
    toggleRounding: {
      description: "Rounding style for the dropdown toggle button.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Toggle" },
    },
    toggleShadow: {
      description: "Shadow style for the dropdown toggle button.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Toggle" },
    },
    triggerIcon: {
      description: "Optional icon for the toggle button.",
      control: false,
      table: { category: "Toggle" },
    },
    items: {
      description: "Dropdown menu items (array of objects).",
      control: false,
      table: { category: "Menu" },
    },
    menuRounding: {
      description: "Rounding style for the dropdown menu.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Menu" },
    },
    menuShadow: {
      description: "Shadow style for the dropdown menu.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Menu" },
    },
    className: {
      description: "Custom CSS class for the dropdown container.",
      control: "text",
      table: { category: "Appearance" },
    },
  },
};

export default meta;

type Story = StoryObj<DropdownProps>;

export const WithActions: Story = {
  args: {
    items: [
      {
        label: "Profile",
        icon: <FaUser />,
        onClick: () => alert("View Profile"),
      },
      {
        label: "Settings",
        icon: <FaCog />,
        onClick: () => alert("Settings clicked"),
      },
      {
        label: "Logout",
        icon: <FaSignOutAlt />,
        onClick: () => alert("Logged out"),
        "data-testid": "logout-button",
      },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      {
        label: "Home",
        href: "/",
        icon: <FaUser />,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: <FaCog />,
      },
    ],
  },
};

export const AlignmentVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <p>Left Aligned</p>
        <Dropdown
          align="left"
          triggerIcon={FaEllipsisV}
          items={[{ label: "Left 1" }, { label: "Left 2" }]}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Right Aligned</p>
        <Dropdown
          align="right"
          triggerIcon={FaEllipsisV}
          items={[{ label: "Right 1" }, { label: "Right 2" }]}
        />
      </div>
    </div>
  ),
};

export const Themed: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {themeOptions.map((theme) => (
          <div key={theme} style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
              {theme}
            </p>
            <Dropdown
              triggerIcon={FaEllipsisV}
              theme={theme}
              items={[{ label: `Item (${theme})`, onClick: () => {} }]}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const stateOptions = ["success", "error", "warning"];

    return (
      <StoryGrid title="State Variants">
        {stateOptions.map((state) => (
          <div key={state} style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
              {state}
            </p>
            <Dropdown
              triggerIcon={FaEllipsisV}
              state={state}
              items={[{ label: `Item (${state})`, onClick: () => {} }]}
            />
          </div>
        ))}
      </StoryGrid>
    );
  },
};

export const MenuRoundingVariants = () => (
  <StoryGrid title="Menu Rounding Variants">
    {roundingOptions.map((rounding) => (
      <div key={rounding} style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
          {rounding}
        </p>
        <Dropdown
          key={rounding}
          menuRounding={rounding}
          triggerIcon={FaEllipsisV}
          items={[{ label: `Item (${rounding})`, onClick: () => {} }]}
        />
      </div>
    ))}
  </StoryGrid>
);

export const MenuShadowVariants = () => (
  <StoryGrid title="Menu Shadow Variants">
    {shadowOptions.map((shadow) => (
      <div key={shadow} style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
          {shadow}
        </p>
        <Dropdown
          key={shadow}
          menuShadow={shadow}
          triggerIcon={FaEllipsisV}
          items={[{ label: `Item (${shadow})`, onClick: () => {} }]}
        />
      </div>
    ))}
  </StoryGrid>
);
