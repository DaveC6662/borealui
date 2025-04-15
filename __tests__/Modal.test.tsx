import { render, screen, fireEvent, act } from "@testing-library/react";
import { Modal } from "@/index.next";
import "@testing-library/jest-dom";

describe("Modal", () => {
  jest.useFakeTimers();
  const onClose = jest.fn();

  const renderModal = () => {
    render(
      <Modal onClose={onClose} data-testid="modal">
        <div>
          <h2>Modal Heading</h2>
          <p>This is modal content.</p>
          <button>Confirm</button>
        </div>
      </Modal>
    );
  };

  beforeEach(() => {
    onClose.mockClear();
    const portal = document.createElement("div");
    portal.setAttribute("id", "widget-portal");
    document.body.appendChild(portal);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders content inside portal", () => {
    renderModal();
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Modal Heading")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    renderModal();
    const closeBtn = screen.getByTestId("modal-close");
  
    fireEvent.click(closeBtn);
  
    act(() => {
      jest.runAllTimers();
    });
  
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    renderModal();
    const backdrop = screen.getByTestId("modal");
  
    fireEvent.click(backdrop);
  
    act(() => {
      jest.runAllTimers();
    });
  
    expect(onClose).toHaveBeenCalled();
  });

  it("does NOT close when modal content is clicked", () => {
    renderModal();
    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", () => {
    renderModal();
    fireEvent.keyDown(screen.getByTestId("modal"), { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("traps focus within the modal", () => {
    renderModal();
  
    const closeBtn = screen.getByTestId("modal-close");
    const confirmBtn = screen.getByText("Confirm");
  
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);
  
    fireEvent.keyDown(screen.getByTestId("modal"), { key: "Tab" });
    confirmBtn.focus();
    expect(document.activeElement).toBe(confirmBtn);
  
    fireEvent.keyDown(screen.getByTestId("modal"), {
      key: "Tab",
      shiftKey: true,
    });
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);
  });
  
});
