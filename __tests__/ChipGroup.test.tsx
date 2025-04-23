import { render, screen, fireEvent } from "@testing-library/react";
import ChipGroupBase from "@/components/Chip/ChipGroup/ChipGroupBase";

// Dummy chip component
const DummyChip = ({ id, message, onClose, "data-testid": testId }: any) => (
  <div role="status" data-testid={testId}>
    <span>{message}</span>
    <button
      aria-label="Close"
      onClick={() => onClose?.()}
      data-testid="close-button"
    />
  </div>
);

const classMap = {
  container: "chip-container",
  list: "chip-list",
  stackClassPrefix: "chip-",
  positionMap: {
    topCenter: "top-center",
  },
};

describe("ChipGroupBase", () => {
  const chips = [
    { id: "chip1", message: "First chip", "data-testid": "chip-1" },
    { id: "chip2", message: "Second chip", "data-testid": "chip-2" },
  ];

  const classMap = {
    container: "chip-container",
    list: "chip-list",
    stackClassPrefix: "chip-",
  };

  const positionMap = {
    topCenter: "top-center",
    bottomLeft: "bottom-left",
  };

  it("renders chips with correct accessibility", () => {
    render(
      <ChipGroupBase
        chips={chips}
        ChipComponent={DummyChip}
        classMap={classMap}
        positionMap={positionMap}
        onRemove={jest.fn()}
      />
    );

    expect(
      screen.getByRole("region", { name: /notifications/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByTestId("chip-1")).toHaveTextContent("First chip");
    expect(screen.getByTestId("chip-2")).toHaveTextContent("Second chip");
  });

  it("calls onRemove when a chip close button is clicked", () => {
    const onRemove = jest.fn();

    render(
      <ChipGroupBase
        chips={chips}
        ChipComponent={DummyChip}
        classMap={classMap}
        positionMap={positionMap}
        onRemove={onRemove}
      />
    );

    fireEvent.click(screen.getAllByTestId("close-button")[0]);
    expect(onRemove).toHaveBeenCalledWith("chip1");
  });
});
