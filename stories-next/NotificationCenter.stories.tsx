import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import NotificationCenter from "@/components/NotificationCenter/next/NotificationCenter";
import type {
  NotificationCenterProps,
  Notification,
} from "@/components/NotificationCenter/NotificationCenter.types";

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
        onRemove={handleRemove}
        onClearAll={() => {}}
      />
    );
  },
};
