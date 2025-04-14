import { render, screen } from "@testing-library/react";
import ProgressBar from "@/components/ProgressBar/Progressbar";
import "@testing-library/jest-dom";
import { ThemeType, SizeType } from "@/types/types";

describe("ProgressBar", () => {
  it("renders with correct progress and ARIA attributes", () => {
    render(<ProgressBar progress={75} data-testid="test-progressbar" />);
    const bar = screen.getByTestId("test-progressbar");

    expect(bar).toHaveAttribute("role", "progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow", "75");
  });

  it("renders indeterminate bar without aria-valuenow", () => {
    render(<ProgressBar indeterminate data-testid="test-progressbar" />);
    const bar = screen.getByTestId("test-progressbar");

    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("applies animation class when animated is true", () => {
    render(<ProgressBar progress={40} animated data-testid="test-progressbar" />);
    const fill = screen.getByTestId("test-progressbar-bar");
    expect(fill.className).toMatch(/animated/);
  });

  it("renders all themes correctly", () => {
    const themes: ThemeType[] = [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "clear",
    ];

    themes.forEach((theme) => {
      render(
        <ProgressBar
          key={theme}
          progress={50}
          theme={theme}
          data-testid={`test-progressbar-${theme}`}
        />
      );
      const bar = screen.getByTestId(`test-progressbar-${theme}-bar`);
      expect(bar.className).toMatch(new RegExp(theme));
    });
  });

  it("renders all sizes correctly", () => {
    const sizes: SizeType[] = ["xs", "small", "medium", "large", "xl"];

    sizes.forEach((size) => {
      render(
        <ProgressBar
          key={size}
          progress={50}
          size={size}
          data-testid={`test-progressbar-${size}`}
        />
      );
      const container = screen.getByTestId(`test-progressbar-${size}`);
      expect(container.className).toMatch(new RegExp(size));
    });
  });
});
