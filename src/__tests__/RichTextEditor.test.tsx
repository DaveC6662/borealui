import React from "react";
import { render, screen } from "@testing-library/react";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import "@testing-library/jest-dom";

describe("RichTextEditor", () => {
  it("renders the editor container and toolbar", () => {
    render(<RichTextEditor onChange={() => {}} />);
    
    const editor = screen.getByTestId("rich-text-editor");
    expect(editor).toBeInTheDocument();

    const toolbarButtons = screen.getAllByRole("button");
    expect(toolbarButtons.length).toBeGreaterThan(0);
  });

  it("applies aria-labels for accessibility", () => {
    render(<RichTextEditor onChange={() => {}} />);

    const boldButton = screen.getByLabelText("Bold");
    expect(boldButton).toBeInTheDocument();

    const italicButton = screen.getByLabelText("Italic");
    expect(italicButton).toBeInTheDocument();

    const clearFormatting = screen.getByLabelText("Clear Formatting");
    expect(clearFormatting).toBeInTheDocument();
  });

  it("loads initial content correctly", async () => {
    const initialHtml = `<h2>Hello World</h2><p>This is a test.</p>`;

    const { container } = render(
      <RichTextEditor initialContent={initialHtml} onChange={() => {}} />
    );

    expect(container.querySelector("h2")).toHaveTextContent("Hello World");
    expect(container.querySelector("p")).toHaveTextContent("This is a test.");
  });
});
