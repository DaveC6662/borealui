import { render, screen, fireEvent } from "@testing-library/react";
import BaseEmptyState from "@/components/EmptyState/EmptyStateBase";
import { FaRegSmile } from "react-icons/fa";

// Dummy button
const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const classNames = {
  wrapper: "emptyWrapper",
  title: "emptyTitle",
  message: "emptyMessage",
  icon: "emptyIcon",
  themeMap: {
    primary: "themePrimary",
    secondary: "themeSecondary",
  },
  sizeMap: {
    small: "sizeSmall",
    medium: "sizeMedium",
    large: "sizeLarge",
  },
  outline: "outline",
};

describe("BaseEmptyState", () => {
  it("renders title, message, and icon with correct roles", () => {
    render(
      <BaseEmptyState
        icon={FaRegSmile}
        title="No Data"
        message="Please add some data to get started."
        Button={DummyButton}
        classNames={classNames}
        data-testid="empty-state"
      />
    );

    const region = screen.getByRole("region", { name: "No Data" });
    expect(region).toBeInTheDocument();
    expect(screen.getByTestId("empty-state-title")).toHaveTextContent(
      "No Data"
    );
    expect(screen.getByTestId("empty-state-message")).toHaveTextContent(
      "Please add some data to get started."
    );
    expect(screen.getByTestId("empty-state-icon")).toBeInTheDocument();
  });

  it("renders and handles action button click", () => {
    const onClick = jest.fn();
    render(
      <BaseEmptyState
        icon={FaRegSmile}
        actionLabel="Try Again"
        onActionClick={onClick}
        Button={DummyButton}
        classNames={classNames}
        data-testid="empty-state"
      />
    );

    const button = screen.getByTestId("empty-state-action");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
