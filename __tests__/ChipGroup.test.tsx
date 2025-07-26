import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ChipGroupBase from "@/components/Chip/ChipGroup/ChipGroupBase";

expect.extend(toHaveNoViolations);

const DummyChip = ({ id, message, onClose, "data-testid": testId }: any) => (
  <div role="status" data-testid={testId}>
    <span>{message}</span>
    <button
      aria-label="Close"
      onClick={() => onClose?.()}
      data-testid={`close-button-${id}`}
    />
  </div>
);

describe("ChipGroupBase", () => {
  const chips = [
    {
      id: "chip1",
      message: "First chip",
      "data-testid": "chip-1",
      visible: true,
    },
    {
      id: "chip2",
      message: "Second chip",
      "data-testid": "chip-2",
      visible: true,
    },
  ];

  const classMap = {
    container: "chip-container",
    list: "chip-list",
    chip: "chip",
    topCenter: "chip-topCenter",
  };

  it("renders chips with correct accessibility", () => {
    render(
      <ChipGroupBase
        chips={chips}
        ChipComponent={DummyChip}
        classMap={classMap}
        onRemove={jest.fn()}
      />
    );

    const region = screen.getByRole("region", { name: /notifications/i });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-live", "polite");

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
        onRemove={onRemove}
      />
    );

    fireEvent.click(screen.getByTestId("close-button-chip1"));
    expect(onRemove).toHaveBeenCalledWith("chip1");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ChipGroupBase
        chips={chips}
        ChipComponent={DummyChip}
        classMap={classMap}
        onRemove={jest.fn()}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
