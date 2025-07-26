import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BaseModal from "@/components/Modal/ModalBase";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const DummyIconButton = React.forwardRef<HTMLButtonElement, any>(
  ({ icon: Icon, ...props }, ref) => (
    <button ref={ref} {...props}>
      {Icon && <Icon aria-hidden="true" />}
    </button>
  )
);
DummyIconButton.displayName = "DummyIconButton";

const classMap = {
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

  it("renders modal with aria attributes and content", () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classMap}
      >
        <p>Modal content</p>
      </BaseModal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("aria-labelledby");
    expect(modal).toHaveAttribute("aria-describedby");

    const label = screen.getByText("Modal Dialog");
    expect(label).toHaveClass("sr-only");

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classMap}
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

  it("calls onClose when Escape key is pressed", () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classMap}
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
        onClose={() => {}}
        IconButton={DummyIconButton}
        classMap={classMap}
      >
        <button>Focusable</button>
      </BaseModal>
    );

    act(() => {
      jest.runAllTimers();
    });

    const modal = screen.getByTestId("modal");
    await waitFor(() => expect(modal).toHaveFocus());

    jest.useRealTimers();
  });

  it("calls onClose when clicking outside the modal", async () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classMap}
      >
        <p>Outside Click Test</p>
      </BaseModal>
    );

    const overlay = screen.getByTestId("modal");
    fireEvent.click(overlay);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("does not call onClose when clicking inside the modal content", () => {
    render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classMap}
      >
        <p>Inside</p>
      </BaseModal>
    );

    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classMap={classMap}
      >
        <p>Accessible Modal Content</p>
      </BaseModal>
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
