import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseNotificationCenter from "@/components/NotificationCenter/NotificationCenterBase";

expect.extend(toHaveNoViolations);

jest.mock("@/components/NotificationCenter/NotificationCenter.types", () => ({
  ...jest.requireActual(
    "@/components/NotificationCenter/NotificationCenter.types"
  ),
  themeIcons: {
    success: () => <svg data-testid="icon-success" />,
    error: () => <svg data-testid="icon-error" />,
    info: () => <svg data-testid="icon-info" />,
  },
}));

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props}>{Icon ? <Icon /> : null}</button>
);

const classMap = {
  wrapper: "wrapper",
  header: "header",
  list: "list",
  notification: "notification",
  icon: "icon",
  content: "content",
  message: "message",
  timestamp: "timestamp",
  close: "close",
  clearAll: "clearAll",
  success: "success",
  error: "error",
  info: "info",
  shadowLight: "shadowLight",
  roundMedium: "roundMedium",
};

describe("BaseNotificationCenter", () => {
  const testId = "notification-center";
  const mockNotifications = [
    {
      id: "1",
      message: "Success message",
      type: "success" as const,
      timestamp: new Date("2025-04-20T10:30:00"),
    },
    {
      id: "2",
      message: "Error occurred",
      type: "error" as const,
    },
  ];

  it("renders notifications with proper content and roles", () => {
    render(
      <BaseNotificationCenter
        notifications={mockNotifications}
        onRemove={jest.fn()}
        onClearAll={jest.fn()}
        showClearAll
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
        data-testid={testId}
      />
    );

    expect(
      screen.getByRole("region", { name: /notification center/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();

    expect(screen.getByTestId(`${testId}-item-1-dismiss`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-item-2-dismiss`)).toBeInTheDocument();
  });

  it("triggers onRemove when a dismiss button is clicked", () => {
    const onRemove = jest.fn();
    render(
      <BaseNotificationCenter
        notifications={mockNotifications}
        onRemove={onRemove}
        onClearAll={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
        data-testid={testId}
      />
    );

    fireEvent.click(screen.getByTestId(`${testId}-item-1-dismiss`));
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("triggers onClearAll when 'Clear All' is clicked", () => {
    const onClearAll = jest.fn();
    render(
      <BaseNotificationCenter
        notifications={mockNotifications}
        onRemove={jest.fn()}
        onClearAll={onClearAll}
        showClearAll
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
        data-testid={testId}
      />
    );

    fireEvent.click(screen.getByTestId(`${testId}-clear-all`));
    expect(onClearAll).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseNotificationCenter
        notifications={mockNotifications}
        onRemove={jest.fn()}
        onClearAll={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classMap}
        data-testid={testId}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
