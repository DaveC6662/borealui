import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "@/index";
import ThemeProvider from "@/context/ThemeContext";
import { FaFacebook, FaTwitter } from "react-icons/fa";

// Mock Firebase Analytics
jest.mock("../../../firebaseConfig", () => ({
  getAnalyticsInstance: jest.fn().mockResolvedValue({
    logEvent: jest.fn(),
  }),
}));
jest.mock("firebase/analytics", () => ({
  logEvent: jest.fn(),
}));

describe("Footer", () => {
  const defaultProps = {
    copyright: "© 2025 My Company",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    socialLinks: [
      { title: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
      { title: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    ],
    showThemeSelect: true,
    "data-testid": "custom-footer",
  };

  it("renders all main sections", () => {
    render(<ThemeProvider><Footer {...defaultProps} /></ThemeProvider>);

    expect(screen.getByTestId("custom-footer")).toBeInTheDocument();
    expect(screen.getByTestId("custom-footer-copyright")).toHaveTextContent("© 2025 My Company");
    expect(screen.getByTestId("custom-footer-nav")).toBeInTheDocument();
    expect(screen.getByTestId("custom-footer-theme-select")).toBeInTheDocument();
    expect(screen.getByTestId("custom-footer-social")).toBeInTheDocument();
  });

  it("renders footer links correctly", () => {
    render(<ThemeProvider><Footer {...defaultProps} /></ThemeProvider>);
    expect(screen.getByTestId("custom-footer-link-privacy-policy")).toHaveTextContent("Privacy Policy");
    expect(screen.getByTestId("custom-footer-link-terms-of-service")).toHaveTextContent("Terms of Service");
  });

  it("renders social icons and triggers click handler", async () => {
    render(<ThemeProvider><Footer {...defaultProps} /></ThemeProvider>);

    const fbButton = screen.getByTestId("custom-footer-social-facebook");
    expect(fbButton).toBeInTheDocument();

    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

    await fireEvent.click(fbButton);
    expect(openSpy).toHaveBeenCalledWith("https://facebook.com", "_blank", "noopener,noreferrer");

    openSpy.mockRestore();
  });

  it("does not render theme select if showThemeSelect is false", () => {
    render(<Footer {...defaultProps} showThemeSelect={false} />);
    expect(screen.queryByTestId("custom-footer-theme-select")).not.toBeInTheDocument();
  });
});
