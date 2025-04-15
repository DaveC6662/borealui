import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { TagInput } from "@/index.next";

describe("TagInput", () => {
  it("renders initial tags", () => {
    render(<TagInput tags={["tag1", "tag2"]} data-testid="tag-input" />);
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("adds a new tag on Enter", () => {
    const handleChange = jest.fn();
    render(<TagInput tags={[]} onChange={handleChange} data-testid="tag-input" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "newtag" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(["newtag"]);
  });

  it("adds a new tag on comma", () => {
    const handleChange = jest.fn();
    render(<TagInput tags={[]} onChange={handleChange} data-testid="tag-input" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "commaTag" } });
    fireEvent.keyDown(input, { key: "," });

    expect(handleChange).toHaveBeenCalledWith(["commaTag"]);
  });

  it("removes a tag on remove button click", () => {
    const handleChange = jest.fn();
    render(<TagInput tags={["toRemove"]} onChange={handleChange} data-testid="tag-input" />);

    const removeButton = screen.getByTitle("remove");
    fireEvent.click(removeButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("does not add duplicate tags", () => {
    const handleChange = jest.fn();
    render(<TagInput tags={["duplicate"]} onChange={handleChange} data-testid="tag-input" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "duplicate" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
