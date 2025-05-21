import Toolbar from "@/components/Toolbar/core/Toolbar";
import Button from "@/components/Buttons/Button/core/Button";

describe("Toolbar Component", () => {
  const mountToolbar = (props = {}) => {
    cy.mount(
      <Toolbar
        title="Toolbar Title"
        left={<div>Left Section</div>}
        center={<div>Center Content</div>}
        right={<Button>Right Button</Button>}
        avatar={{ name: "JD" }}
        theme="primary"
        {...props}
      />
    );
  };

  it("renders all sections and the title", () => {
    mountToolbar();

    cy.findByRole("banner").should("exist");
    cy.findByRole("heading", { name: /toolbar title/i }).should("exist");
    cy.findByTestId("toolbar-left").should("contain.text", "Left Section");
    cy.findByTestId("toolbar-center").should("contain.text", "Center Content");
    cy.findByTestId("toolbar-right").should("contain.text", "Right Button");
    cy.findByTestId("toolbar-avatar").should("contain.text", "JD");
  });

  it("calls onClick handler when avatar is clicked", () => {
    const onClick = cy.stub().as("avatarClick");

    mountToolbar({
      avatar: { name: "JD", onClick },
    });

    cy.findByTestId("toolbar-avatar").find("button").click();
    cy.get("@avatarClick").should("have.been.calledOnce");
  });

  it("applies the correct theme class", () => {
    mountToolbar({ theme: "success" });

    cy.findByRole("banner").should("have.class", "success");
  });

  it("respects heading level override", () => {
    mountToolbar({ headingLevel: 2, title: "Heading Level 2" });

    cy.findByRole("heading", { name: "Heading Level 2" }).should(
      "have.prop",
      "tagName",
      "H2"
    );
  });

  it("renders without avatar", () => {
    mountToolbar({ avatar: undefined });

    cy.findByTestId("toolbar-avatar").should("not.exist");
  });
});

describe("Toolbar Component - Mobile Responsiveness", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("renders correctly on small screens", () => {
    cy.mount(
      <Toolbar
        title="Mobile Toolbar"
        left={<div>Left</div>}
        center={<div>Center</div>}
        right={<Button>Right</Button>}
        avatar={{ name: "MB" }}
        theme="primary"
      />
    );

    cy.findByRole("banner").should("exist");
    cy.findByTestId("toolbar-left").should("contain.text", "Left");
    cy.findByTestId("toolbar-center").should("contain.text", "Center");
    cy.findByTestId("toolbar-right").should("contain.text", "Right");
    cy.findByTestId("toolbar-avatar").should("contain.text", "MB");
  });

  it("adjusts layout for mobile screen", () => {
    cy.mount(
      <Toolbar
        title="Responsive Toolbar"
        left={<div className="left-test">Left</div>}
        center={<div>Center</div>}
        right={<div>Right</div>}
        theme="primary"
        avatar={{ name: "AV" }}
      />
    );

    cy.get(".left-test").should(($el) => {
      const rect = $el[0].getBoundingClientRect();
      expect(rect.left).to.be.lessThan(100);
    });
  });
});
