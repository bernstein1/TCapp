import { Card } from "@/components/ui/card";
import { AppointmentCard, type Appointment } from "@/components/AppointmentCard";
import { Calendar } from "lucide-react";

export default function SchedulePage() {
  //todo: remove mock functionality
  const mockAppointments: Appointment[] = [
    {
      id: "1",
      type: "Benefits Consultation",
      dateTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
      duration: 30,
      consultantName: "Dr. Emily Martinez",
      format: "video",
      joinUrl: "https://meet.touchcare.com/abc123",
    },
    {
      id: "2",
      type: "Claim Review",
      dateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      duration: 45,
      consultantName: "James Wilson",
      format: "phone",
      phoneNumber: "1-800-CARE-NOW",
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-schedule-title">
            Schedule
          </h1>
          <p className="text-muted-foreground">
            Book and manage your TouchCare consultations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-xl mb-4">Book a Consultation</h2>
            <Card className="p-6">
              <div className="flex items-center justify-center h-96 bg-accent/30 rounded-lg">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">
                    Scheduling widget would be embedded here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    (touchcare.as.me/schedule iframe)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onReschedule={() => console.log('Reschedule:', appointment.id)}
                  onCancel={() => console.log('Cancel:', appointment.id)}
                  onJoin={() => console.log('Join:', appointment.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
