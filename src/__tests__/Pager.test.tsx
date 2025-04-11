import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pager from "../components/Pager/Pager";
import "@testing-library/jest-dom";
import { SizeType, ThemeType } from "../../types/component_props";

describe("Pager", () => {
  const setup = (props = {}) => {
    const onPageChange = jest.fn();
    render(
      <Pager
        totalItems={20}
        itemsPerPage={5}
        currentPage={2}
        onPageChange={onPageChange}
        size="small"
        theme="primary"
        data-testid="test-pager"
        {...props}
      />
    );
    return { onPageChange };
  };

  it("renders pagination buttons based on totalItems and itemsPerPage", () => {
    setup();
    expect(screen.getByTestId("test-pager")).toBeInTheDocument();
    expect(screen.getByTestId("test-pager-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("test-pager-button-4")).toBeInTheDocument();
  });

  it("calls onPageChange when a page number is clicked", () => {
    const { onPageChange } = setup();
    const page3Btn = screen.getByTestId("test-pager-button-3");
    fireEvent.click(page3Btn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables the previous button on first page", () => {
    setup({ currentPage: 1 });
    const prevBtn = screen.getByTestId("test-pager-prev");
    expect(prevBtn).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    setup({ currentPage: 4 });
    const nextBtn = screen.getByTestId("test-pager-next");
    expect(nextBtn).toBeDisabled();
  });

  it("calls onPageChange when next and previous are clicked", () => {
    const { onPageChange } = setup({ currentPage: 2 });

    fireEvent.click(screen.getByTestId("test-pager-prev"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByTestId("test-pager-next"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("applies aria-current='page' to the active button", () => {
    setup({ currentPage: 2 });
    const activeBtn = screen.getByTestId("test-pager-button-2");
    expect(activeBtn).toHaveAttribute("aria-current", "page");
  });

  it("renders with all sizes and themes", () => {
    const sizes: SizeType[] = ["xs", "small", "medium", "large", "xl"];
    const themes: ThemeType[] = ["primary", "secondary", "success", "error", "warning", "clear"];

    sizes.forEach((size) => {
      themes.forEach((theme) => {
        render(
          <Pager
            totalItems={15}
            itemsPerPage={5}
            currentPage={1}
            onPageChange={jest.fn()}
            size={size}
            theme={theme}
            data-testid={`pager-${size}-${theme}`}
          />
        );
        expect(screen.getByTestId(`pager-${size}-${theme}`)).toBeInTheDocument();
      });
    });
  });
});
