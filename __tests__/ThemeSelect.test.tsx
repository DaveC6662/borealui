import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserThemeSettings from "@/components/Select/ThemeSelect/ThemeSelect";
import { ThemeContext } from "@/context/ThemeContext";

describe("UserThemeSettings Component", () => {
  const mockSetSelectedScheme = jest.fn();
  const mockThemeContext = {
    selectedScheme: 1,
    setSelectedScheme: mockSetSelectedScheme,
  };

  beforeEach(() => {
    mockSetSelectedScheme.mockClear();
  });

  test("renders dropdown with color scheme options", () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <UserThemeSettings />
      </ThemeContext.Provider>
    );

    const selectElement = screen.getByRole("combobox", { name: "Select Theme" });
    expect(selectElement).toBeInTheDocument();
  }); 

  test("calls setSelectedScheme when a new theme is selected", () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <UserThemeSettings />
      </ThemeContext.Provider>
    );

    const selectElement = screen.getByRole("combobox", { name: "Select Theme" });

    fireEvent.change(selectElement, { target: { value: "2" } });

    expect(mockSetSelectedScheme).toHaveBeenCalledWith(2);
  }); 

  test("throws an error when used outside ThemeProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<UserThemeSettings />)).toThrow(
      "ThemeContext is undefined. Make sure to wrap this component with ThemeProvider."
    );
  });
});
