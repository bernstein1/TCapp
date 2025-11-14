import { NotificationItem } from "../NotificationItem";

export default function NotificationItemExample() {
  const notifications = [
    {
      id: "1",
      type: "case_update" as const,
      title: "New message in your case",
      message: "Sarah has responded to your question about specialist coverage.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
    },
    {
      id: "2",
      type: "appointment" as const,
      title: "Appointment reminder",
      message: "Your consultation with Dr. Martinez is tomorrow at 2:00 PM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: "3",
      type: "document" as const,
      title: "New document uploaded",
      message: "Your EOB for recent claim has been processed and is now available.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
    },
  ];

  return (
    <div className="p-8 max-w-lg space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={() => console.log('Notification clicked:', notification.id)}
          onMarkRead={() => console.log('Mark as read:', notification.id)}
        />
      ))}
    </div>
  );
}
