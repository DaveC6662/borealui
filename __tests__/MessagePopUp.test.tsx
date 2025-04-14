import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MessagePopup from "@/components/MessagePopUp/MessagePopUp";

describe("MessagePopup", () => {
  beforeEach(() => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "popup-portal");
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    const portalRoot = document.getElementById("popup-portal");
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it("renders the message and close button", () => {
    render(<MessagePopup message="Test message" onClose={() => {}} />);

    expect(screen.getByTestId("message-popup-message")).toHaveTextContent("Test message");
    expect(screen.getByTestId("message-popup-close")).toBeInTheDocument();
  });

  it("calls onClose when clicking outside the popup", () => {
    const handleClose = jest.fn();
    render(<MessagePopup message="Outside click test" onClose={handleClose} />);

    fireEvent.click(screen.getByTestId("message-popup"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking the close button", () => {
    const handleClose = jest.fn();
    render(<MessagePopup message="Dismiss" onClose={handleClose} />);

    fireEvent.click(screen.getByTestId("message-popup-close"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls onConfirm and onCancel callbacks", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <MessagePopup
        message="Confirm or Cancel?"
        onClose={() => {}}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText="Yes"
        cancelText="No"
      />
    );

    fireEvent.click(screen.getByTestId("message-popup-confirm"));
    fireEvent.click(screen.getByTestId("message-popup-cancel"));

    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });
});
