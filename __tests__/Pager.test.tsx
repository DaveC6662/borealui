import { render, screen, fireEvent } from "@testing-library/react";
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

describe("BasePager", () => {
  it("renders correct number of pages", () => {
    render(
      <BasePager
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classNames}
        data-testid="pager"
      />
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`pager-button-${i}`)).toBeInTheDocument();
    }
  });

  it("calls onPageChange when next is clicked", () => {
    const onPageChange = jest.fn();
    render(
      <BasePager
        totalItems={30}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classNames}
      />
    );

    fireEvent.click(screen.getByTestId("pager-next"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables prev button on first page", () => {
    render(
      <BasePager
        totalItems={30}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classNames}
      />
    );

    expect(screen.getByTestId("pager-prev")).toBeDisabled();
  });

  it("sets aria-current on active page", () => {
    render(
      <BasePager
        totalItems={30}
        itemsPerPage={10}
        currentPage={2}
        onPageChange={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classNames}
      />
    );

    expect(screen.getByTestId("pager-button-2")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
