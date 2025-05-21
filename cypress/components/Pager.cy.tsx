import BasePager from "@/components/Pager/PagerBase";

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props}>
    <Icon />
  </button>
);

const classNames = {
  wrapper: "pagerWrapper",
  controls: "pagerControls",
  controlButton: "pagerControlButton",
  buttonWrapper: "pagerButtonWrapper",
  button: "pagerButton",
  active: "activePage",
};

describe("BasePager Component", () => {
  it("renders 3 pages and navigates properly", () => {
    const onPageChange = cy.stub().as("onPageChange");

    cy.mount(
      <BasePager
        totalItems={30}
        itemsPerPage={10}
        currentPage={2}
        onPageChange={onPageChange}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
        data-testid="pager"
      />
    );

    cy.findByTestId("pager-button-2")
      .should("have.attr", "aria-current", "page")
      .and("be.disabled");

    cy.findByTestId("pager-button-1").click();
    cy.get("@onPageChange").should("have.been.calledWith", 1);

    cy.findByTestId("pager-next").click();
    cy.get("@onPageChange").should("have.been.calledWith", 3);
  });

  it("disables prev button on first page and next on last", () => {
    cy.mount(
      <BasePager
        totalItems={30}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={() => {}}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
        data-testid="pager"
      />
    );

    cy.findByTestId("pager-prev").should("be.disabled");

    cy.mount(
      <BasePager
        totalItems={30}
        itemsPerPage={10}
        currentPage={3}
        onPageChange={() => {}}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
        data-testid="pager"
      />
    );

    cy.findByTestId("pager-next").should("be.disabled");
  });
});
