import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { MessagePopUp } from "../src/index.core";
import type { MessagePopupProps } from "../src/components/MessagePopUp/MessagePopup.types";
import { RoundingType, ShadowType } from "../src/types/types";

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<MessagePopupProps> = {
  title: "Components/MessagePopup",
  component: MessagePopUp,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <div id="popup-portal" />
        <Story />
      </>
    ),
  ],
  argTypes: {
    message: {
      control: "text",
      description: "The main message to display in the popup.",
      type: { name: "string", required: true },
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    onClose: {
      action: "closed",
      description:
        "Callback when the popup should close (background/cancel/close).",
      type: { name: "function", required: true },
      table: { category: "Actions", type: { summary: "function" } },
    },
    onConfirm: {
      action: "confirmed",
      description: "Callback when the confirm action is clicked.",
      type: { name: "function" },
      table: { category: "Actions", type: { summary: "function" } },
    },
    onCancel: {
      action: "cancelled",
      description: "Callback when the cancel action is clicked.",
      type: { name: "function" },
      table: { category: "Actions", type: { summary: "function" } },
    },
    confirmText: {
      control: "text",
      description: "Custom label for the confirm button.",
      type: { name: "string" },
      table: { category: "Content", defaultValue: { summary: "Confirm" } },
    },
    cancelText: {
      control: "text",
      description: "Custom label for the cancel button.",
      type: { name: "string" },
      table: { category: "Content", defaultValue: { summary: "Cancel" } },
    },
    rounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius of the popup dialog.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "none" } },
    },
    controlsRounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the action buttons.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "none" } },
    },
    shadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the popup dialog.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "none" } },
    },
    className: {
      control: "text",
      description: "Additional custom CSS class names for the popup.",
      type: { name: "string" },
      table: { category: "Style" },
    },
    "data-testid": {
      control: "text",
      description: "Custom test id for querying in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<MessagePopupProps>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Show Popup</button>
        {open && (
          <MessagePopUp
            message="Are you sure you want to delete this item?"
            onClose={() => setOpen(false)}
            onConfirm={() => {
              alert("Confirmed!");
              setOpen(false);
            }}
            onCancel={() => {
              alert("Cancelled!");
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const MessageOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Show Message</button>
        {open && (
          <MessagePopUp
            message="Just letting you know something happened."
            onClose={() => setOpen(false)}
          />
        )}
      </>
    );
  },
};

export const ConfirmOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Show Confirm</button>
        {open && (
          <MessagePopUp
            message="This will confirm an action without cancel."
            onClose={() => setOpen(false)}
            onConfirm={() => {
              alert("Confirmed!");
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const CancelOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Show Cancel</button>
        {open && (
          <MessagePopUp
            message="Cancel-only option"
            onClose={() => setOpen(false)}
            onCancel={() => {
              alert("Cancelled!");
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const RoundingVariants: Story = {
  render: () => {
    const [visibleRounding, setVisibleRounding] = useState<RoundingType | null>(
      null
    );

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {roundingOptions.map((rounding) => (
            <button
              key={rounding}
              onClick={() => setVisibleRounding(rounding as RoundingType)}
              className="p-2 border rounded"
            >
              {rounding}
            </button>
          ))}
        </div>

        {visibleRounding && (
          <MessagePopUp
            message={`Rounding: ${visibleRounding}`}
            rounding={visibleRounding}
            onClose={() => setVisibleRounding(null)}
          />
        )}
      </>
    );
  },
};

export const ShadowVariants: Story = {
  render: () => {
    const [visibleShadow, setVisibleShadow] = useState<ShadowType | null>(null);

    return (
      <>
        <div className="grid grid-cols-6 gap-2">
          {shadowOptions.map((shadow) => (
            <button
              key={shadow}
              onClick={() => setVisibleShadow(shadow as ShadowType)}
              className="p-2 border rounded"
            >
              {shadow}
            </button>
          ))}
        </div>

        {visibleShadow && (
          <MessagePopUp
            message={`Shadow: ${visibleShadow}`}
            shadow={visibleShadow}
            onClose={() => setVisibleShadow(null)}
          />
        )}
      </>
    );
  },
};
