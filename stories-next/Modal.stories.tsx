import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Modal, Button } from "../src/index.next"; // adjust path if needed
import type { ModalProps } from "../src/components/Modal/Modal.types";

const meta: Meta<ModalProps> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <div id="widget-portal" />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<ModalProps>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button theme="primary" onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <div style={{ padding: "1rem" }}>
              <h2 style={{ marginTop: 0 }}>Hello from the modal!</h2>
              <p>
                This is a fully accessible, focus-trapped modal component
                rendered via portal.
              </p>
              <Button onClick={() => alert("Action inside modal!")}>
                Action
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button theme="secondary" onClick={() => setIsOpen(true)}>
          Show Scrollable Modal
        </Button>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <div
              style={{ padding: "1rem", maxHeight: "70vh", overflowY: "auto" }}
            >
              <h2>Scrollable Content</h2>
              <p>
                This modal contains a lot of content to test vertical scroll
                behavior.
              </p>
              {[...Array(30)].map((_, i) => (
                <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet...</p>
              ))}
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          </Modal>
        )}
      </>
    );
  },
};
