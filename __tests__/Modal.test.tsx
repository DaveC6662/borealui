import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BaseModal from "@/components/Modal/ModalBase";

const DummyIconButton = React.forwardRef<HTMLButtonElement, any>(
  ({ icon: Icon, ...props }, ref) => (
    <button ref={ref} {...props}>
      {Icon && <Icon aria-hidden="true" />}
    </button>
  )
);
DummyIconButton.displayName = "DummyIconButton";

const classNames = {
  overlay: "modalOverlay",
  visible: "modalVisible",
  hidden: "modalHidden",
  content: "modalContent",
  closeButton: "closeButton",
};

describe("BaseModal", () => {
  const portal = document.createElement("div");
  portal.setAttribute("id", "widget-portal");
  document.body.appendChild(portal);

  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders modal and traps focus", () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classNames}
      >
        <p>Modal content</p>
      </BaseModal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("aria-labelledby");
    expect(modal).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classNames}
      >
        <p>Close me</p>
      </BaseModal>
    );

    const closeBtn = screen.getByTestId("modal-close");
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("closes on Escape key", () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classNames}
      >
        <p>Press Escape</p>
      </BaseModal>
    );

    fireEvent.keyDown(screen.getByTestId("modal"), { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("focuses modal on mount", async () => {
    jest.useFakeTimers();

    render(
      <BaseModal
        onClose={jest.fn()}
        IconButton={DummyIconButton}
        classMap={classNames}
      >
        <button>Focusable Button</button>
      </BaseModal>
    );

    // Simulate animation frame and timeout
    act(() => {
      jest.runAllTimers();
    });

    const modal = screen.getByTestId("modal");

    await waitFor(() => {
      expect(modal).toHaveFocus();
    });

    jest.useRealTimers();
  });
});
