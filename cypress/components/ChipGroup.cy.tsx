/// <reference types="cypress" />
import ChipGroupBase from "@/components/Chip/ChipGroup/ChipGroupBase";

const DummyChip = ({
  message,
  visible,
  onClose,
  "data-testid": testId,
}: {
  message: string;
  visible: boolean;
  onClose: () => void;
  "data-testid": string;
}) => {
  if (!visible) return null;
  return (
    <div role="status" data-testid={testId}>
      <span>{message}</span>
      <button onClick={onClose} data-testid={`${testId}-close`}>
        Close
      </button>
    </div>
  );
};

describe("ChipGroupBase (Cypress)", () => {
  const chips = [
    { id: "1", message: "Chip 1", "data-testid": "chip-1" },
    { id: "2", message: "Chip 2", "data-testid": "chip-2" },
  ];

  const classMap = {
    container: "chip-container",
    stackClassPrefix: "chip-",
  };

  const positionMap = {
    topCenter: "top-center-class",
  };

  it("renders chips and verifies accessibility roles", () => {
    cy.mount(
      <ChipGroupBase
        chips={chips}
        ChipComponent={DummyChip}
        classMap={classMap}
        position="topCenter"
        positionMap={positionMap}
        onRemove={() => {}}
      />
    );

    cy.findByTestId("chip-1").should("exist");
    cy.findByTestId("chip-2").should("exist");
    cy.findAllByRole("status").eq(0).should("contain.text", "Chip 1");
    cy.findAllByRole("status").eq(1).should("contain.text", "Chip 2");
  });

  it("calls onRemove when close is clicked", () => {
    const onRemoveStub = cy.stub().as("onRemoveStub");

    cy.mount(
      <ChipGroupBase
        chips={[
          { id: "1", message: "Close me", "data-testid": "chip-close-test" },
        ]}
        ChipComponent={DummyChip}
        position="topCenter"
        classMap={classMap}
        positionMap={positionMap}
        onRemove={onRemoveStub}
      />
    );

    cy.findByTestId("chip-close-test-close").click();
    cy.get("@onRemoveStub").should("have.been.calledOnceWith", "1");
  });
});
