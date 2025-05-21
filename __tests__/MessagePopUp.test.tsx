import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BaseMessagePopup from "@/components/MessagePopUp/MessagePopupBase";

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

const classNames = {
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

  it("renders message and buttons", async () => {
    render(
      <BaseMessagePopup
        message="Are you sure?"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirm/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /close popup/i })
    ).toBeInTheDocument();
  });

  it("calls onClose when escape is pressed", async () => {
    const onClose = jest.fn();
    render(
      <BaseMessagePopup
        message="Close test"
        onClose={onClose}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
      />
    );

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("calls onConfirm and onCancel correctly", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <BaseMessagePopup
        message="Click test"
        onClose={jest.fn()}
        onConfirm={onConfirm}
        onCancel={onCancel}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
      />
    );

    fireEvent.click(screen.getByTestId("message-popup-confirm"));
    fireEvent.click(screen.getByTestId("message-popup-cancel"));

    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });
});
