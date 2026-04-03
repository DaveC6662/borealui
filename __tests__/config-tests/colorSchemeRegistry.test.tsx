import {
  registerColorScheme,
  removeColorScheme,
  getAllColorSchemes,
} from "../../src/styles/colorSchemeRegistry";
import { colorSchemes } from "../../src/styles/Themes";

describe("colorSchemeRegistry", () => {
  const originalSchemes = [...colorSchemes];
  const originalWarn = console.warn;

  beforeEach(() => {
    colorSchemes.splice(0, colorSchemes.length, ...originalSchemes);
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = originalWarn;
  });

  it("registers a new color scheme when the name does not already exist", () => {
    const newScheme = {
      name: "Custom Aurora",
      primaryColor: "#111111",
      secondaryColor: "#222222",
      tertiaryColor: "#333333",
      quaternaryColor: "#444444",
      backgroundColor: "#fefefe",
    };

    const before = colorSchemes.length;

    registerColorScheme([newScheme]);

    expect(colorSchemes).toHaveLength(before + 1);
    expect(colorSchemes.find((s) => s.name === "Custom Aurora")).toEqual(
      newScheme,
    );
  });

  it("skips a duplicate color scheme when override is false", () => {
    const existing = colorSchemes[0];
    const replacement = {
      ...existing,
      primaryColor: "#123456",
    };

    const before = colorSchemes.length;

    registerColorScheme([replacement], false);

    expect(colorSchemes).toHaveLength(before);
    expect(colorSchemes[0].primaryColor).toBe(existing.primaryColor);
  });

  it("overrides an existing color scheme when override is true", () => {
    const existing = colorSchemes[0];
    const replacement = {
      ...existing,
      primaryColor: "#123456",
      secondaryColor: "#654321",
    };

    registerColorScheme([replacement], true);

    expect(colorSchemes[0]).toEqual(replacement);
  });

  it("warns in development when trying to register a duplicate without override", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const existing = colorSchemes[0];

    registerColorScheme([existing], false);

    expect(console.warn).toHaveBeenCalledWith(
      `Color scheme "${existing.name}" already exists. Skipping.`,
    );

    process.env.NODE_ENV = originalEnv;
  });

  it("removes a color scheme by name and returns true when found", () => {
    const newScheme = {
      name: "Temp Scheme",
      primaryColor: "#111111",
      secondaryColor: "#222222",
      tertiaryColor: "#333333",
      quaternaryColor: "#444444",
      backgroundColor: "#ffffff",
    };

    registerColorScheme([newScheme]);

    const removed = removeColorScheme("Temp Scheme");

    expect(removed).toBe(true);
    expect(colorSchemes.find((s) => s.name === "Temp Scheme")).toBeUndefined();
  });

  it("returns false when removing a color scheme that does not exist", () => {
    const removed = removeColorScheme("Does Not Exist");

    expect(removed).toBe(false);
  });

  it("returns a copy of all color schemes", () => {
    const result = getAllColorSchemes();

    expect(result).toEqual(colorSchemes);
    expect(result).not.toBe(colorSchemes);
  });

  it("does not mutate the original registry array when the returned copy is changed", () => {
    const result = getAllColorSchemes();
    const originalLength = colorSchemes.length;

    result.push({
      name: "Fake Added To Copy",
      primaryColor: "#000000",
      secondaryColor: "#111111",
      tertiaryColor: "#222222",
      quaternaryColor: "#333333",
      backgroundColor: "#ffffff",
    });

    expect(result).toHaveLength(originalLength + 1);
    expect(colorSchemes).toHaveLength(originalLength);
  });
});
