import { render, screen, fireEvent } from "@testing-library/react";
import BaseDropdown from "@/components/Dropdown/DropdownBase";
import { FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props} aria-label={props.ariaLabel}>
    {Icon && <Icon aria-hidden="true" />}
  </button>
);

const classNames = {
  wrapper: "dropdownWrapper",
  menu: "dropdownMenu",
  item: "dropdownItem",
  icon: "dropdownIcon",
  alignLeft: "alignLeft",
  alignRight: "alignRight",
};

const items = [
  {
    label: "Profile",
    icon: <FaUser />,
    onClick: jest.fn(),
    "data-testid": "dropdown-profile",
  },
  {
    label: "Logout",
    icon: <FaSignOutAlt />,
    onClick: jest.fn(),
    "data-testid": "dropdown-logout",
  },
];

describe("BaseDropdown", () => {
  it("renders trigger button with aria attributes", () => {
    render(
      <BaseDropdown
        triggerIcon={FaEllipsisV}
        items={items}
        IconButton={DummyIconButton}
        classMap={classNames}
        data-testid="dropdown"
        ariaLabel="More options"
      />
    );

    const trigger = screen.getByTestId("dropdown-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
  });

  it("triggers menu item click and closes menu", () => {
    render(
      <BaseDropdown
        triggerIcon={FaEllipsisV}
        items={items}
        IconButton={DummyIconButton}
        classMap={classNames}
        data-testid="dropdown"
      />
    );

    fireEvent.click(screen.getByTestId("dropdown-trigger"));
    fireEvent.click(screen.getByTestId("dropdown-profile"));

    expect(items[0].onClick).toHaveBeenCalled();
    expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation", () => {
    render(
      <BaseDropdown
        triggerIcon={FaEllipsisV}
        items={items}
        IconButton={DummyIconButton}
        classMap={classNames}
        data-testid="dropdown"
      />
    );

    const trigger = screen.getByTestId("dropdown-trigger");
    fireEvent.click(trigger);

    const wrapper = screen.getByTestId("dropdown");
    fireEvent.keyDown(wrapper, { key: "ArrowDown" });
    fireEvent.keyDown(wrapper, { key: "Enter" });

    expect(items[0].onClick).toHaveBeenCalled();
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <BaseDropdown
        triggerIcon={FaEllipsisV}
        items={items}
        IconButton={DummyIconButton}
        classMap={classNames}
        data-testid="dropdown"
        ariaLabel="More options"
      />
    );

    fireEvent.click(screen.getByTestId("dropdown-trigger"));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
