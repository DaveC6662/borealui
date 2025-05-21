import { render, screen, fireEvent } from "@testing-library/react";
import BaseNotificationCenter from "@/components/NotificationCenter/NotificationCenterBase";

// Mock themeIcons
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

const classNames = {
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
};

describe("BaseNotificationCenter", () => {
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
        classMap={classNames}
      />
    );

    expect(
      screen.getByRole("region", { name: /notification center/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Dismiss notification 1")).toBeInTheDocument();
  });

  it("triggers onRemove when dismiss button is clicked", () => {
    const onRemove = jest.fn();
    render(
      <BaseNotificationCenter
        notifications={mockNotifications}
        onRemove={onRemove}
        onClearAll={jest.fn()}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classNames}
      />
    );

    fireEvent.click(screen.getByTestId("notification-center-item-1-dismiss"));
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("triggers onClearAll when clear all is clicked", () => {
    const onClearAll = jest.fn();
    render(
      <BaseNotificationCenter
        notifications={mockNotifications}
        onRemove={jest.fn()}
        onClearAll={onClearAll}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classMap={classNames}
      />
    );

    fireEvent.click(screen.getByTestId("notification-center-clear-all"));
    expect(onClearAll).toHaveBeenCalled();
  });
});
