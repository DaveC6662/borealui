import { render, screen, fireEvent } from "@testing-library/react";
import ToolbarBase from "@/components/Toolbar/ToolbarBase";
import { axe, toHaveNoViolations } from "jest-axe";
import { jest } from "@jest/globals";

expect.extend(toHaveNoViolations);

const AvatarMock = ({
  name,
  onClick,
}: {
  name?: string;
  onClick?: () => void;
}) => <button onClick={onClick}>{name}</button>;

const mockStyles = {
  toolbar: "toolbar",
  section: "section",
  title: "title",
  avatarWrapper: "avatarWrapper",
  avatarButton: "avatarButton",

  primary: "primary",
  secondary: "secondary",
  success: "success",
  error: "error",
  warning: "warning",
  clear: "clear",

  roundMedium: "roundMedium",
  shadowLight: "shadowLight",
};

describe("ToolbarBase", () => {
  it("renders left, center, and right sections with correct roles", () => {
    render(
      <ToolbarBase
        title="Toolbar Title"
        left={<div>Left Section</div>}
        center={<div>Center Content</div>}
        right={<div>Right Section</div>}
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    const toolbar = screen.getByRole("toolbar", { name: "Toolbar" });
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveAttribute("aria-orientation", "horizontal");

    expect(
      screen.getByRole("group", { name: "Toolbar left section" })
    ).toHaveTextContent("Left Section");
    expect(
      screen.getByRole("group", { name: "Toolbar center section" })
    ).toHaveTextContent("Center Content");
    expect(
      screen.getByRole("group", { name: "Toolbar right section" })
    ).toHaveTextContent("Right Section");

    expect(
      screen.getByRole("heading", { name: "Toolbar Title" })
    ).toBeInTheDocument();
  });

  it("renders avatar when provided", () => {
    render(
      <ToolbarBase
        avatar={{ name: "JD" }}
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    expect(screen.getByTestId("toolbar-avatar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "JD" })).toBeInTheDocument();
  });

  it("invokes avatar onClick handler", () => {
    const handleClick = jest.fn();

    render(
      <ToolbarBase
        avatar={{ name: "JD", onClick: handleClick }}
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "JD" }));
    expect(handleClick).toHaveBeenCalled();
  });

  it("respects headingLevel prop for title element", () => {
    render(
      <ToolbarBase
        title="Custom Heading"
        headingLevel={2}
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    const heading = screen.getByRole("heading", { name: "Custom Heading" });
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("title");
  });

  it("sets correct aria-label for the toolbar container", () => {
    render(
      <ToolbarBase
        title="Toolbar"
        ariaLabel="Main toolbar"
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    expect(
      screen.getByRole("toolbar", { name: "Main toolbar" })
    ).toBeInTheDocument();
  });

  it("applies theme and default round/shadow classes", () => {
    render(
      <ToolbarBase
        title="Styled"
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    const toolbar = screen.getByTestId("toolbar");
    expect(toolbar.className).toContain("roundMedium");
    expect(toolbar.className).toContain("shadowLight");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToolbarBase
        title="Toolbar Title"
        left={<div>Left Section</div>}
        center={<div>Center Content</div>}
        right={<div>Right Section</div>}
        avatar={{ name: "JD" }}
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
