import { useCallback, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { NotificationCenter } from "../src/index.next";
import type {
  NotificationCenterProps,
  Notification,
} from "../src/components/NotificationCenter/NotificationCenter.types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "You have a new follower.",
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "success",
    message: "Profile updated successfully.",
    timestamp: new Date(),
    duration: 5000,
  },
  {
    id: "3",
    type: "warning",
    message: "Storage space running low.",
    timestamp: new Date(),
  },
  {
    id: "4",
    type: "error",
    message: "Failed to load image.",
    timestamp: new Date(),
  },
];

const meta: Meta<NotificationCenterProps> = {
  title: "Components/NotificationCenter",
  component: NotificationCenter,
  tags: ["autodocs"],
  argTypes: {
    notifications: {
      control: false,
      description:
        "Array of notifications to show. Each notification should have an `id`, `type`, `message`, `timestamp`, and optionally `duration` (ms).",
      type: { name: "string", required: true },
      table: {
        type: {
          summary:
            'Notification[] (e.g. [{ id: string, type: "info" | "success" | "warning" | "error", message: string, timestamp: Date, duration?: number }])',
        },
        category: "Content",
      },
    },
    setNotifications: {
      control: false,
      description:
        "Setter function for updating notifications (typically via useState).",
      type: { name: "function", required: false },
      table: { disable: true },
    },
    onRemove: {
      action: "removed",
      description:
        "Callback fired with the notification id when a notification is dismissed.",
      type: { name: "function", required: false },
      table: { category: "Actions" },
    },
    onClearAll: {
      action: "clearAll",
      description: "Callback fired when all notifications are dismissed.",
      type: { name: "function", required: false },
      table: { category: "Actions" },
    },
    showClearAll: {
      control: "boolean",
      description: "Whether to display the 'Clear All' button.",
      table: { category: "Controls", defaultValue: { summary: "true" } },
    },
    maxNotifications: {
      control: { type: "number", min: 1 },
      description: "Maximum number of notifications displayed at once.",
      table: { category: "Limits", defaultValue: { summary: "10" } },
    },
    clearOldOnOverflow: {
      control: "boolean",
      description:
        "Automatically remove oldest notifications when maxNotifications is reached.",
      table: { category: "Limits", defaultValue: { summary: "true" } },
    },
    fetchNotifications: {
      control: false,
      description:
        "Optional async function for polling new notifications. Should return a Promise<Notification[]>.",
      type: { name: "function", required: false },
      table: { category: "Polling" },
    },
    pollInterval: {
      control: { type: "number", min: 1000, step: 500 },
      description:
        "Polling interval in milliseconds for fetchNotifications. Default: 5000.",
      table: { category: "Polling", defaultValue: { summary: "5000" } },
    },
    notificationRounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for notification items.",
      table: { category: "Style", defaultValue: { summary: "medium" } },
    },
    notificationShadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow for notification items.",
      table: { category: "Style", defaultValue: { summary: "medium" } },
    },
    controlRounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for notification center controls.",
      table: { category: "Style", defaultValue: { summary: "medium" } },
    },
    controlShadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow for notification center controls.",
      table: { category: "Style", defaultValue: { summary: "medium" } },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<NotificationCenterProps>;

export const Default: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    const handleRemove = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleClearAll = () => {
      setNotifications([]);
    };

    return (
      <NotificationCenter
        notifications={notifications}
        setNotifications={setNotifications}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
      />
    );
  },
};

export const WithoutClearAll: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([mockNotifications[0]]);

    const handleRemove = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
      <NotificationCenter
        notifications={notifications}
        setNotifications={setNotifications}
        onRemove={handleRemove}
        showClearAll={false}
      />
    );
  },
};

export const AutoDismissOnly: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      {
        id: "auto-1",
        type: "success",
        message: "Auto-dismiss in 3 seconds.",
        duration: 3000,
        timestamp: new Date(),
      } as Notification,
    ]);

    const handleRemove = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
      <NotificationCenter
        notifications={notifications}
        setNotifications={setNotifications}
        onRemove={handleRemove}
        onClearAll={() => {}}
      />
    );
  },
};

export const WithPolling: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const counterRef = useRef(1);

    const handleRemove = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleClearAll = () => {
      setNotifications([]);
    };

    const fetchNotifications = useCallback(async (): Promise<
      Notification[]
    > => {
      const newId = `poll-${counterRef.current}`;
      const newNotification: Notification = {
        id: newId,
        type: "info",
        message: `Polled notification #${counterRef.current}`,
        timestamp: new Date(),
      };

      counterRef.current += 1;

      setNotifications((prev) => {
        if (prev.some((n) => n.id === newNotification.id)) return prev;
        return [...prev, newNotification];
      });

      return [newNotification];
    }, []);

    return (
      <NotificationCenter
        notifications={notifications}
        setNotifications={setNotifications}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
        fetchNotifications={fetchNotifications}
        pollInterval={3000}
        maxNotifications={5}
      />
    );
  },
};
