/// <reference types="cypress" />
import React from "react";
import CardBase from "@/components/Card/CardBase";

const DummySkeleton = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => <div data-testid="skeleton" style={{ width, height }} />;

const DummyImage = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} data-testid="card-image" />
);

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props}>{Icon && <Icon data-testid="card-icon" />}</button>
);

const classMap = {
  card: "card",
  solid: "solid",
  primary: "primary",
  cardLoading: "loading",
  cardContent: "card-content",
  fadeIn: "fade-in",
  vertical: "vertical",
  cardImage: "card-img",
  cardHeader: "card-header",
  cardTitle: "card-title",
  cardIcon: "card-icon",
  cardBody: "card-body",
  cardDescription: "card-desc",
  cardChildren: "card-children",
  cardFooter: "card-footer",
  cardActions: "card-actions",
  actionButton: "action-btn",
};

describe("CardBase (Cypress)", () => {
  it("renders card with title and button", () => {
    cy.mount(
      <CardBase
        title="Hello World"
        description="A nice card"
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        actionButtons={[
          {
            label: "Learn more",
            onClick: cy.stub().as("onClick"),
            buttonComponent: DummyButton,
            iconButtonComponent: DummyIconButton,
          },
        ]}
      />
    );

    cy.findByRole("region").should("exist");
    cy.findByRole("heading", { name: "Hello World" }).should("exist");
    cy.findByText("A nice card").should("exist");
    cy.findByRole("button", { name: "Learn more" }).click();
    cy.get("@onClick").should("have.been.calledOnce");
  });

  it("shows loading skeleton when loading is true", () => {
    cy.mount(
      <CardBase
        loading
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        actionButtons={[]}
      />
    );

    cy.findByTestId("skeleton").should("exist");
  });
});
