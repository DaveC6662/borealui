import { render, fireEvent, screen } from "@testing-library/react";
import { Dropdown } from "@/index.next";
import "@testing-library/jest-dom";
import { FaEllipsisV, FaUser } from "react-icons/fa";

describe("Dropdown", () => {
  const mockItems = [
    { label: "Profile", onClick: jest.fn(), icon: <FaUser /> },
    { label: "Link", href: "https://example.com" },
  ];

  test("renders trigger icon", () => {
    render(<Dropdown triggerIcon={FaEllipsisV} items={mockItems} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("opens and shows items on click", () => {
    render(<Dropdown triggerIcon={FaEllipsisV} items={mockItems} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
  });

  test("calls onClick and closes menu", () => {
    render(<Dropdown triggerIcon={FaEllipsisV} items={mockItems} />);
    fireEvent.click(screen.getByRole("button"));
    const profileButton = screen.getByText("Profile");
    fireEvent.click(profileButton);
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });

  test("renders anchor tag for href items", () => {
    render(<Dropdown triggerIcon={FaEllipsisV} items={mockItems} />);
    fireEvent.click(screen.getByRole("button"));
    const link = screen.getByText("Link");
    expect(link.closest("a")).toHaveAttribute("href", "https://example.com");
  });
});