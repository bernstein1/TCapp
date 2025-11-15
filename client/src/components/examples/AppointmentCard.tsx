import { AppointmentCard } from "../AppointmentCard";

export default function AppointmentCardExample() {
  const appointment = {
    id: "1",
    type: "Benefits Consultation",
    dateTime: new Date(Date.now() + 1000 * 60 * 60 * 3),
    duration: 30,
    consultantName: "Dr. Emily Martinez",
    format: "video" as const,
    joinUrl: "https://meet.touchcare.com/abc123",
  };

  return (
    <div className="p-8 max-w-md">
      <AppointmentCard
        appointment={appointment}
        onReschedule={() => {}}
        onCancel={() => {}}
        onJoin={() => {}}
      />
    </div>
  );
}
