import BaseEmptyState from "@/components/EmptyState/EmptyStateBase";
import { FaRegSmile } from "react-icons/fa";

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const classNames = {
  wrapper: "emptyWrapper",
  title: "emptyTitle",
  message: "emptyMessage",
  icon: "emptyIcon",
  themeMap: {
    primary: "themePrimary",
    secondary: "themeSecondary",
  },
  sizeMap: {
    small: "sizeSmall",
    medium: "sizeMedium",
    large: "sizeLarge",
  },
  outline: "outline",
};

describe("BaseEmptyState", () => {
  it("displays icon, title, and message", () => {
    cy.mount(
      <BaseEmptyState
        icon={FaRegSmile}
        title="Nothing Here"
        message="No results found."
        Button={DummyButton}
        classNames={classNames}
        data-testid="empty-state"
      />
    );

    cy.findByRole("region", { name: /nothing here/i }).should("exist");
    cy.findByTestId("empty-state-icon").should("exist");
    cy.findByTestId("empty-state-title").should("have.text", "Nothing Here");
    cy.findByTestId("empty-state-message").should(
      "have.text",
      "No results found."
    );
  });

  it("invokes action when button is clicked", () => {
    const onClick = cy.stub().as("actionClick");

    cy.mount(
      <BaseEmptyState
        actionLabel="Create One"
        onActionClick={onClick}
        Button={DummyButton}
        classNames={classNames}
        data-testid="empty-state"
      />
    );

    cy.findByTestId("empty-state-action").click();
    cy.get("@actionClick").should("have.been.calledOnce");
  });
});
