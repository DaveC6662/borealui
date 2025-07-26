import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseMessagePopup from "@/components/MessagePopUp/MessagePopupBase";

expect.extend(toHaveNoViolations);

const DummyButton = React.forwardRef<HTMLButtonElement, any>(
  ({ children, ...props }, ref) => (
    <button ref={ref} type="button" {...props}>
      {children}
    </button>
  )
);
DummyButton.displayName = "DummyButton";

const DummyIconButton = React.forwardRef<HTMLButtonElement, any>(
  ({ icon: Icon, ...props }, ref) => (
    <button ref={ref} type="button" {...props}>
      {Icon && <Icon aria-hidden="true" />}
    </button>
  )
);
DummyIconButton.displayName = "DummyIconButton";

const classMap = {
  wrapper: "popupWrapper",
  content: "popupContent",
  close: "popupClose",
  message: "popupMessage",
  actions: "popupActions",
  confirm: "popupConfirm",
  cancel: "popupCancel",
};

describe("BaseMessagePopup", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="popup-portal"></div>';
  });

  it("renders message and all buttons", () => {
    render(
      <BaseMessagePopup
        message="Are you sure?"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByTestId("message-popup-confirm")).toBeInTheDocument();
    expect(screen.getByTestId("message-popup-cancel")).toBeInTheDocument();
    expect(screen.getByTestId("message-popup-close")).toBeInTheDocument();
  });

  it("calls onClose when clicking overlay", () => {
    const onClose = jest.fn();

    render(
      <BaseMessagePopup
        message="Overlay test"
        onClose={onClose}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
      />
    );

    fireEvent.click(screen.getByTestId("message-popup"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = jest.fn();

    render(
      <BaseMessagePopup
        message="Escape test"
        onClose={onClose}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
      />
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm and onCancel handlers", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <BaseMessagePopup
        message="Action test"
        onClose={jest.fn()}
        onConfirm={onConfirm}
        onCancel={onCancel}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
      />
    );

    fireEvent.click(screen.getByTestId("message-popup-confirm"));
    fireEvent.click(screen.getByTestId("message-popup-cancel"));

    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it("focuses the confirm button on mount", async () => {
    render(
      <BaseMessagePopup
        message="Focus test"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
      />
    );

    const confirmButton = await screen.findByTestId("message-popup-confirm");
    await waitFor(() => expect(confirmButton).toHaveFocus());
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseMessagePopup
        message="A11y test"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
      />
    );

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
