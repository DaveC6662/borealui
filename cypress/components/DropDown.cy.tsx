import BaseDropdown from "@/components/Dropdown/DropdownBase";
import { FaEllipsisV, FaUser } from "react-icons/fa";

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props} aria-label={props.ariaLabel}>
    {Icon && <Icon aria-hidden="true" />}
  </button>
);

const classNames = {
  wrapper: "dropdownWrapper",
  menu: "dropdownMenu",
  item: "dropdownItem",
  icon: "dropdownIcon",
  alignLeft: "alignLeft",
  alignRight: "alignRight",
};

describe("BaseDropdown", () => {
  it("opens on click and closes on outside click", () => {
    cy.mount(
      <div>
        <BaseDropdown
          triggerIcon={FaEllipsisV}
          items={[
            {
              label: "Settings",
              icon: <FaUser />,
              onClick: cy.stub().as("onSettings"),
              "data-testid": "dropdown-settings",
            },
          ]}
          IconButton={DummyIconButton}
          classNames={classNames}
          data-testid="dropdown"
        />
        <button data-testid="outside">Outside</button>
      </div>
    );

    cy.findByTestId("dropdown-trigger").click();
    cy.findByTestId("dropdown-menu").should("exist");
    cy.findByTestId("dropdown-settings").click();

    cy.get("@onSettings").should("have.been.calledOnce");
    cy.findByTestId("dropdown-menu").should("not.exist");

    cy.findByTestId("dropdown-trigger").click();
    cy.findByTestId("dropdown-menu").should("exist");
    cy.findByTestId("outside").click();
    cy.findByTestId("dropdown-menu").should("not.exist");
  });
});
