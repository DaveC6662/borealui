import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ScrollToTopBase from "@/components/ScrollToTop/ScrollToTopBase";
import { axe, toHaveNoViolations } from "jest-axe";
import { DummyIcon } from "../test-utils/dummyComponents";

expect.extend(toHaveNoViolations);

const classMap = {
  wrapper: "wrapper",
  button: "scroll-button",
  icon: "icon",
  shadowSmall: "shadowSmall",
  shadowMedium: "shadowMedium",
  shadowLarge: "shadowLarge",
  roundSmall: "roundSmall",
  roundMedium: "roundMedium",
  roundLarge: "roundLarge",
};

describe("ScrollToTopBase", () => {
  const originalScrollTo = window.scrollTo;
  const originalMatchMedia = window.matchMedia;
  const originalRequestAnimationFrame = window.requestAnimationFrame;

  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    window.scrollTo = jest.fn();

    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    window.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
    window.matchMedia = originalMatchMedia;
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });

  it("renders the wrapper with default test id", () => {
    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    expect(screen.getByTestId("scroll")).toBeInTheDocument();
    expect(screen.getByTestId("scroll")).toHaveClass("wrapper");
  });

  it("does not render the button initially when below the default offset", () => {
    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    expect(screen.queryByTestId("scroll-button")).not.toBeInTheDocument();
  });

  it("renders the button immediately when initial scroll position is above the offset", async () => {
    window.scrollY = 500;

    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
      />,
    );

    expect(await screen.findByTestId("scroll-button")).toBeInTheDocument();
  });

  it("shows the button after scrolling past the provided offset", async () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
      />,
    );

    expect(screen.queryByTestId("scroll-button")).not.toBeInTheDocument();

    window.scrollY = 500;
    fireEvent.scroll(window);

    expect(await screen.findByTestId("scroll-button")).toBeInTheDocument();
  });

  it("does not show the button when scroll position is equal to the offset", async () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
      />,
    );

    window.scrollY = 300;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.queryByTestId("scroll-button")).not.toBeInTheDocument();
    });
  });

  it("hides the button again when scrolling back above the threshold", async () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
      />,
    );

    window.scrollY = 500;
    fireEvent.scroll(window);
    expect(await screen.findByTestId("scroll-button")).toBeInTheDocument();

    window.scrollY = 100;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.queryByTestId("scroll-button")).not.toBeInTheDocument();
    });
  });

  it("uses the provided custom test id for wrapper and button", async () => {
    window.scrollY = 500;

    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        data-testid="back-to-top"
      />,
    );

    expect(screen.getByTestId("back-to-top")).toBeInTheDocument();
    expect(await screen.findByTestId("back-to-top-button")).toBeInTheDocument();
  });

  it("applies custom className to the wrapper", () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        className="custom-wrapper"
      />,
    );

    expect(screen.getByTestId("scroll")).toHaveClass("wrapper");
    expect(screen.getByTestId("scroll")).toHaveClass("custom-wrapper");
  });

  it("applies rounding and shadow classes to the button", async () => {
    window.scrollY = 500;

    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        rounding="large"
        shadow="medium"
      />,
    );

    const button = await screen.findByTestId("scroll-button");
    expect(button).toHaveClass("scroll-button");
    expect(button).toHaveClass("roundLarge");
    expect(button).toHaveClass("shadowMedium");
  });

  it("renders the icon with decorative accessibility attributes", async () => {
    window.scrollY = 500;

    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    await screen.findByTestId("scroll-button");

    const icon = screen.getByTestId("dummy-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("focusable", "false");
  });

  it("renders the button with the default accessible name and title", async () => {
    window.scrollY = 500;

    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    const button = await screen.findByRole("button", { name: "Scroll to top" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("title", "Scroll to top");
  });

  it("applies a custom aria-label to the button", async () => {
    window.scrollY = 500;

    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        aria-label="Back to page start"
      />,
    );

    const button = await screen.findByRole("button", {
      name: "Back to page start",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Back to page start");
    expect(button).toHaveAttribute("title", "Back to page start");
  });

  it("applies a custom title when provided", async () => {
    window.scrollY = 500;

    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        aria-label="Back to page start"
        title="Return to top"
      />,
    );

    const button = await screen.findByRole("button", {
      name: "Back to page start",
    });

    expect(button).toHaveAttribute("title", "Return to top");
  });

  it("applies aria-describedby to the button", async () => {
    window.scrollY = 500;

    render(
      <>
        <p id="scroll-description">Returns you to the top of the page.</p>
        <ScrollToTopBase
          classMap={classMap}
          IconComponent={DummyIcon}
          aria-describedby="scroll-description"
        />
      </>,
    );

    const button = await screen.findByTestId("scroll-button");
    expect(button).toHaveAttribute("aria-describedby", "scroll-description");
  });

  it("uses aria-labelledby when provided", async () => {
    window.scrollY = 500;

    render(
      <>
        <span id="scroll-label">Go to top</span>
        <ScrollToTopBase
          classMap={classMap}
          IconComponent={DummyIcon}
          aria-labelledby="scroll-label"
        />
      </>,
    );

    const button = await screen.findByRole("button", { name: "Go to top" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-labelledby", "scroll-label");
    expect(button).not.toHaveAttribute("aria-label");
  });

  it("prefers aria-labelledby over aria-label when both are provided", async () => {
    window.scrollY = 500;

    render(
      <>
        <span id="external-label">External Scroll Label</span>
        <ScrollToTopBase
          classMap={classMap}
          IconComponent={DummyIcon}
          aria-label="Hidden Label"
          aria-labelledby="external-label"
        />
      </>,
    );

    const button = await screen.findByRole("button", {
      name: "External Scroll Label",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-labelledby", "external-label");
    expect(button).not.toHaveAttribute("aria-label");
  });

  it("applies id to the wrapper", () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        id="scroll-wrapper"
      />,
    );

    expect(screen.getByTestId("scroll")).toHaveAttribute(
      "id",
      "scroll-wrapper",
    );
  });

  it("applies wrapper role and wrapper aria-label when provided", () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        role="region"
        wrapperAriaLabel="Scroll controls"
      />,
    );

    const wrapper = screen.getByRole("region", { name: "Scroll controls" });
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute("data-testid", "scroll");
  });

  it("does not apply wrapper aria-label when no role is provided", () => {
    render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        wrapperAriaLabel="Unused label"
      />,
    );

    expect(screen.getByTestId("scroll")).not.toHaveAttribute("aria-label");
  });

  it("scrolls to the top with smooth behavior when reduced motion is not preferred", async () => {
    window.scrollY = 500;

    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    const button = await screen.findByTestId("scroll-button");
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("scrolls to the top with auto behavior when reduced motion is preferred", async () => {
    window.scrollY = 500;

    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    const button = await screen.findByTestId("scroll-button");
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "auto",
    });
  });

  it("updates visibility after scrolling past the offset", async () => {
    render(<ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />);

    expect(screen.queryByTestId("scroll-button")).not.toBeInTheDocument();

    window.scrollY = 500;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByTestId("scroll-button")).toBeInTheDocument();
    });
  });

  it("has no accessibility violations when the button is visible", async () => {
    window.scrollY = 500;

    const { container } = render(
      <ScrollToTopBase
        classMap={classMap}
        IconComponent={DummyIcon}
        offset={300}
        role="region"
        wrapperAriaLabel="Scroll to top control"
      />,
    );

    await screen.findByTestId("scroll-button");

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when the button is hidden", async () => {
    const { container } = render(
      <ScrollToTopBase classMap={classMap} IconComponent={DummyIcon} />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
