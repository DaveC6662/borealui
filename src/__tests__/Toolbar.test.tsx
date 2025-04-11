import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toolbar from "../components/Toolbar/Toolbar";
import  Button from "../components/Buttons/Button/Button";

describe("Toolbar - Custom Center", () => {
  it("renders title, subtitle (custom center), and right button", () => {
    render(
      <Toolbar
        title="Activity Feed"
        center={<p data-testid="toolbar-subtitle">Showing recent updates</p>}
        right={<Button theme="error">Clear</Button>}
        data-testid="toolbar-center"
      />
    );

    const toolbar = screen.getByTestId("toolbar-center");
    const title = screen.getByText("Activity Feed");
    const subtitle = screen.getByTestId("toolbar-subtitle");
    const button = screen.getByRole("button", { name: /clear/i });

    expect(toolbar).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("Showing recent updates");
    expect(button).toBeInTheDocument();
  });
});
