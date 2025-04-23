import { render, fireEvent } from "@testing-library/react";
import ScrollToTopBase from "@/components/Buttons/ScrollToTop/ScrollToTopBase";

const DummyIcon = () => <svg data-testid="icon" />;

const classMap = {
  container: "container",
  button: "scroll-button",
  icon: "icon",
};

describe("ScrollToTopBase", () => {
  beforeEach(() => {
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it("does not render the button initially", () => {
    const { queryByTestId } = render(
      <ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />
    );
    expect(queryByTestId("scroll-button")).not.toBeInTheDocument();
  });

  it("shows button after scrolling past offset", () => {
    window.pageYOffset = 500;
    const { getByTestId } = render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
      />
    );
    fireEvent.scroll(window);
    expect(getByTestId("scroll-announcement")).toHaveTextContent(
      "Scroll to top button is now visible"
    );
  });
});
