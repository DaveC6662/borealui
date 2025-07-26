import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseEmptyState from "@/components/EmptyState/EmptyStateBase";
import { FaRegSmile } from "react-icons/fa";

expect.extend(toHaveNoViolations);

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const classNames = {
  wrapper: "emptyWrapper",
  title: "emptyTitle",
  message: "emptyMessage",
  icon: "emptyIcon",
  primary: "themePrimary",
  secondary: "themeSecondary",
  small: "sizeSmall",
  medium: "sizeMedium",
  large: "sizeLarge",
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
        classMap={classNames}
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
        classMap={classNames}
        data-testid="empty-state"
      />
    );

    const button = screen.getByTestId("empty-state-action");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseEmptyState
        icon={FaRegSmile}
        title="No Data"
        message="Please add some data to get started."
        actionLabel="Try Again"
        onActionClick={() => {}}
        Button={DummyButton}
        classMap={classNames}
        data-testid="empty-state"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
