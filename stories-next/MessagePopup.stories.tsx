import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { MessagePopUp } from "@/index.next";
import type { MessagePopupProps } from "@/components/MessagePopUp/MessagePopup.types";

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
