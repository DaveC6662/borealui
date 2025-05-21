import { mount } from "cypress/react";
import "@testing-library/cypress/add-commands";
import "cypress-real-events/support";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);