import { render, fireEvent, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChipGroup } from "@/index.next";
import { ChipItem } from "@/components/Chip/ChipGroup/ChipGroup";


function setupPortal() {
  const portal = document.createElement("div");
  portal.setAttribute("id", "widget-portal");
  document.body.appendChild(portal);
}

describe("ChipGroup", () => {
  beforeEach(() => {
    setupPortal();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = ""; // clean up
  });

  const defaultChips: ChipItem[] = [
    { id: "1", message: "Chip One", autoClose: false },
    { id: "2", message: "Chip Two", autoClose: false },
  ];

  it("renders all provided chips", () => {
    render(<ChipGroup chips={defaultChips} />);
    expect(screen.getByText("Chip One")).toBeInTheDocument();
    expect(screen.getByText("Chip Two")).toBeInTheDocument();
  });

  it("calls onRemove when a chip is manually closed", () => {
    const onRemove = jest.fn();
    render(<ChipGroup chips={defaultChips} onRemove={onRemove} />);
    const closeButtons = screen.getAllByTestId("chip-close");
    fireEvent.click(closeButtons[0]);

    act(() => {
      jest.advanceTimersByTime(300); // wait for fade-out
    });

    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("auto-closes chips after duration", () => {
    const autoChips: ChipItem[] = [
      { id: "a1", message: "Auto Chip", duration: 2000, autoClose: true },
    ];
    const onRemove = jest.fn();

    render(<ChipGroup chips={autoChips} onRemove={onRemove} />);

    act(() => {
      jest.advanceTimersByTime(2300);
    });

    expect(onRemove).toHaveBeenCalledWith("a1");
  });

  it("applies chip position and stackIndex styles", () => {
    render(<ChipGroup chips={defaultChips} position="bottomLeft" />);
    const chip = screen.getByText("Chip One").parentElement;
    expect(chip?.className).toMatch(/bottomLeft/);
  });
});
