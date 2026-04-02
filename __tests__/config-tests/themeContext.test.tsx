import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ThemeProvider, { ThemeContext } from "../../src/context/ThemeContext";
import type { ThemeContextType } from "../../src/context/ThemeContext.types";

jest.mock("../../src/styles/colorSchemeRegistry", () => ({
  getAllColorSchemes: jest.fn(),
  registerColorScheme: jest.fn(),
}));

jest.mock("../../src/config/boreal-style-config", () => ({
  getDefaultColorSchemeName: jest.fn(),
}));

jest.mock("../../src/styles/Themes", () => ({
  colorSchemes: [
    {
      name: "Forest Dusk",
      primaryColor: "#336699",
      secondaryColor: "#993366",
      tertiaryColor: "#669933",
      quaternaryColor: "#cc9933",
      backgroundColor: "#ffffff",
    },
    {
      name: "Ocean Breeze",
      primaryColor: "#005577",
      secondaryColor: "#227799",
      tertiaryColor: "#4499bb",
      quaternaryColor: "#66bbdd",
      backgroundColor: "#f4faff",
    },
  ],
}));

import {
  getAllColorSchemes,
  registerColorScheme,
} from "../../src/styles/colorSchemeRegistry";
import { getDefaultColorSchemeName } from "../../src/config/boreal-style-config";

const mockedGetAllColorSchemes = getAllColorSchemes as jest.Mock;
const mockedRegisterColorScheme = registerColorScheme as jest.Mock;
const mockedGetDefaultColorSchemeName = getDefaultColorSchemeName as jest.Mock;

const baseSchemes = [
  {
    name: "Forest Dusk",
    primaryColor: "#336699",
    secondaryColor: "#993366",
    tertiaryColor: "#669933",
    quaternaryColor: "#cc9933",
    backgroundColor: "#ffffff",
  },
  {
    name: "Ocean Breeze",
    primaryColor: "#005577",
    secondaryColor: "#227799",
    tertiaryColor: "#4499bb",
    quaternaryColor: "#66bbdd",
    backgroundColor: "#f4faff",
  },
];

const Consumer = () => {
  const context: ThemeContextType | undefined = React.useContext(ThemeContext);

  if (!context) return <div data-testid="no-context">No context</div>;

  return (
    <div>
      <div data-testid="selected-scheme">{context.selectedScheme}</div>
      <div data-testid="scheme-count">{context.schemes.length}</div>
      <button
        data-testid="set-scheme"
        onClick={() => context.setSelectedScheme(1)}
      >
        Change scheme
      </button>
    </div>
  );
};

describe("ThemeProvider", () => {
  const originalWarn = console.warn;
  const originalError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document.documentElement.removeAttribute("style");

    mockedGetDefaultColorSchemeName.mockReturnValue("Forest Dusk");
    mockedGetAllColorSchemes.mockReturnValue(baseSchemes);

    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.warn = originalWarn;
    console.error = originalError;
  });

  it("uses getAllColorSchemes to initialize schemes", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(mockedGetAllColorSchemes).toHaveBeenCalled();
    expect(screen.getByTestId("scheme-count")).toHaveTextContent("2");
  });

  it("uses the default color scheme index when nothing is saved", async () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("selected-scheme")).toHaveTextContent("0");

    await waitFor(() => {
      expect(localStorage.getItem("boreal:selectedScheme")).toBe("0");
    });
  });

  it("loads the saved theme index from localStorage", async () => {
    localStorage.setItem("boreal:selectedScheme", "1");

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("selected-scheme")).toHaveTextContent("1");

    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue("--primary-color"),
      ).toBe("#005577");
    });
  });

  it("prefers initialScheme over the saved localStorage value", async () => {
    localStorage.setItem("boreal:selectedScheme", "0");

    render(
      <ThemeProvider initialScheme={1}>
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("selected-scheme")).toHaveTextContent("1");

    await waitFor(() => {
      expect(localStorage.getItem("boreal:selectedScheme")).toBe("1");
    });
  });

  it("calls registerColorScheme when custom schemes are provided", async () => {
    const customSchemes = [
      {
        name: "Custom Aurora",
        primaryColor: "#111111",
        secondaryColor: "#222222",
        tertiaryColor: "#333333",
        quaternaryColor: "#444444",
        backgroundColor: "#fefefe",
      },
    ];

    render(
      <ThemeProvider customSchemes={customSchemes}>
        <Consumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(mockedRegisterColorScheme).toHaveBeenCalledWith(customSchemes);
    });
  });

  it("refreshes schemes after registering custom schemes by calling getAllColorSchemes again", async () => {
    const customSchemes = [
      {
        name: "Custom Aurora",
        primaryColor: "#111111",
        secondaryColor: "#222222",
        tertiaryColor: "#333333",
        quaternaryColor: "#444444",
        backgroundColor: "#fefefe",
      },
    ];

    let availableSchemes = [...baseSchemes];

    mockedGetAllColorSchemes.mockImplementation(() => availableSchemes);

    mockedRegisterColorScheme.mockImplementation((schemes) => {
      availableSchemes = [...baseSchemes, ...schemes];
    });

    render(
      <ThemeProvider customSchemes={customSchemes}>
        <Consumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("scheme-count")).toHaveTextContent("3");
    });

    expect(mockedRegisterColorScheme).toHaveBeenCalledWith(customSchemes);
    expect(mockedGetAllColorSchemes).toHaveBeenCalled();
  });

  it("does not call registerColorScheme when customSchemes is empty", async () => {
    render(
      <ThemeProvider customSchemes={[]}>
        <Consumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("scheme-count")).toHaveTextContent("2");
    });

    expect(mockedRegisterColorScheme).not.toHaveBeenCalled();
  });

  it("applies CSS variables to the root element", async () => {
    render(
      <ThemeProvider initialScheme={0}>
        <Consumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue("--primary-color"),
      ).toBe("#336699");
      expect(
        document.documentElement.style.getPropertyValue("--secondary-color"),
      ).toBe("#993366");
      expect(
        document.documentElement.style.getPropertyValue("--background-color"),
      ).toBe("#ffffff");
      expect(
        document.documentElement.style.getPropertyValue("--border-color"),
      ).not.toBe("");
      expect(
        document.documentElement.style.getPropertyValue("--divider-color"),
      ).not.toBe("");
    });
  });

  it("updates selectedScheme through context and saves it", async () => {
    render(
      <ThemeProvider initialScheme={0}>
        <Consumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByTestId("set-scheme"));

    await waitFor(() => {
      expect(screen.getByTestId("selected-scheme")).toHaveTextContent("1");
      expect(localStorage.getItem("boreal:selectedScheme")).toBe("1");
      expect(
        document.documentElement.style.getPropertyValue("--primary-color"),
      ).toBe("#005577");
    });
  });

  it("falls back to index 0 when the configured default scheme is not found", async () => {
    mockedGetDefaultColorSchemeName.mockReturnValue("Missing Scheme");

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("selected-scheme")).toHaveTextContent("0");

    await waitFor(() => {
      expect(localStorage.getItem("boreal:selectedScheme")).toBe("0");
    });
  });

  it("warns in development when the default color scheme is not found", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    mockedGetDefaultColorSchemeName.mockReturnValue("Missing Scheme");

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      'Default color scheme "Missing Scheme" not found. Falling back to index 0.',
    );

    process.env.NODE_ENV = originalEnv;
  });

  it("logs an error if reading localStorage fails", () => {
    const getItemSpy = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementationOnce(() => {
        throw new Error("read failed");
      });

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(console.error).toHaveBeenCalledWith(
      "Failed to load saved theme index",
    );

    getItemSpy.mockRestore();
  });

  it("logs an error if writing localStorage fails", async () => {
    const setItemSpy = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementationOnce(() => {
        throw new Error("write failed");
      });

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to save theme index");
    });

    setItemSpy.mockRestore();
  });

  it("logs an error if custom schemes cannot be parsed", async () => {
    const stringifySpy = jest
      .spyOn(JSON, "stringify")
      .mockReturnValueOnce("not-json");
    const parseSpy = jest.spyOn(JSON, "parse").mockImplementationOnce(() => {
      throw new Error("bad json");
    });

    render(
      <ThemeProvider customSchemes={[baseSchemes[0]]}>
        <Consumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Failed to parse custom schemes",
      );
    });

    stringifySpy.mockRestore();
    parseSpy.mockRestore();
  });
});
