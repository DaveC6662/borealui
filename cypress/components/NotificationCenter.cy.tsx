import BaseNotificationCenter from "@/components/NotificationCenter/NotificationCenterBase";
import { NotificationType } from "@/types/types";

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
  typeMap: {
    success: "success",
    error: "error",
    info: "info",
  },
};

const notifications = [
  {
    id: "1",
    message: "Something went right!",
    type: "success" as NotificationType,
    timestamp: new Date("2025-04-20T10:20:00"),
  },
  {
    id: "2",
    message: "An error occurred.",
    type: "error" as NotificationType,
  },
];

describe("BaseNotificationCenter", () => {
  it("renders and responds to dismiss and clear", () => {
    const onRemove = cy.stub().as("onRemove");
    const onClearAll = cy.stub().as("onClearAll");

    cy.mount(
      <BaseNotificationCenter
        notifications={notifications}
        onRemove={onRemove}
        onClearAll={onClearAll}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
        data-testid="notification-center"
      />
    );

    cy.findByRole("region", { name: /notification center/i }).should("exist");
    cy.findByText("Something went right!").should("exist");
    cy.findByText("An error occurred.").should("exist");

    // Dismiss a notification
    cy.findByTestId("notification-center-item-1-dismiss").click();
    cy.get("@onRemove").should("have.been.calledWith", "1");

    // Clear all
    cy.findByTestId("notification-center-clear-all").click();
    cy.get("@onClearAll").should("have.been.called");
  });
});
