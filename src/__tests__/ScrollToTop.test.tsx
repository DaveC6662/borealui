import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollToTopButton from "../components/Buttons/ScrollToTop/STT";
import React from "react";

describe("ScrollToTopButton Component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      value: 0,
    });
  });

  test("does not render button initially", () => {
    render(<ScrollToTopButton />);
    expect(screen.queryByRole("button", { name: "Scroll to top" })).not.toBeInTheDocument();
  });

  test("shows button when scrolled down", async () => {
    render(<ScrollToTopButton />);

    act(() => {
      Object.defineProperty(window, "pageYOffset", {
        writable: true,
        value: 400, // Simulating scroll beyond 300px
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(await screen.findByRole("button", { name: "Scroll to top" })).toBeInTheDocument();
  });

  test("hides button when scrolled back to top", async () => {
    render(<ScrollToTopButton />);

    act(() => {
      Object.defineProperty(window, "pageYOffset", { writable: true, value: 400 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(await screen.findByRole("button", { name: "Scroll to top" })).toBeInTheDocument();

    act(() => {
      Object.defineProperty(window, "pageYOffset", { writable: true, value: 0 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.queryByRole("button", { name: "Scroll to top" })).not.toBeInTheDocument();
  });

  test("scrolls to top when clicked", async () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation();

    render(<ScrollToTopButton />);

    act(() => {
      Object.defineProperty(window, "pageYOffset", { writable: true, value: 400 });
      window.dispatchEvent(new Event("scroll"));
    });

    const button = await screen.findByRole("button", { name: "Scroll to top" });

    await userEvent.click(button);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    scrollToMock.mockRestore();
  });
});
