import { render, fireEvent } from "@testing-library/react";
import ScrollToTopBase from "@/components/ScrollToTop/ScrollToTopBase";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const DummyIcon = (props: any) => <svg {...props} data-testid="scroll-icon" />;
const classMap = {
  wrapper: "wrapper",
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
    expect(getByTestId("scroll-button")).toBeInTheDocument();
    expect(getByTestId("scroll-icon")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    window.pageYOffset = 500;
    const { container } = render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
      />
    );
    fireEvent.scroll(window);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
