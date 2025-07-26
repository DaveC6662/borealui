import { render, screen, fireEvent } from "@testing-library/react";
import { ToolbarBase } from "@/components/Toolbar/ToolbarBase";
import { axe, toHaveNoViolations } from "jest-axe";
import { jest } from "@jest/globals";

expect.extend(toHaveNoViolations);

const AvatarMock = ({ name }: { name: string }) => <div>{name}</div>;

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
};

describe("ToolbarBase", () => {
  it("renders the left, center, and right sections", () => {
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

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Toolbar Title")).toBeInTheDocument();
    expect(screen.getByTestId("toolbar-left")).toHaveTextContent(
      "Left Section"
    );
    expect(screen.getByTestId("toolbar-center")).toHaveTextContent(
      "Center Content"
    );
    expect(screen.getByTestId("toolbar-right")).toHaveTextContent(
      "Right Section"
    );
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
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders avatar and calls onClick", () => {
    const handleClick = jest.fn();

    render(
      <ToolbarBase
        avatar={{ name: "JD", onClick: handleClick }}
        AvatarComponent={({ name, onClick }) => (
          <button onClick={onClick}>{name}</button>
        )}
        classMap={mockStyles}
      />
    );

    const avatarButton = screen.getByRole("button", { name: /jd/i });
    fireEvent.click(avatarButton);
    expect(handleClick).toHaveBeenCalled();
  });

  it("respects headingLevel prop for title", () => {
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
  });

  it("sets correct aria-label for banner", () => {
    render(
      <ToolbarBase
        title="Toolbar"
        ariaLabel="Main toolbar"
        AvatarComponent={AvatarMock}
        classMap={mockStyles}
      />
    );

    expect(
      screen.getByRole("banner", { name: "Main toolbar" })
    ).toBeInTheDocument();
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
