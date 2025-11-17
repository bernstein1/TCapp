import { format, formatDistanceToNow, isBefore, isToday, isTomorrow } from "date-fns";
import { Calendar, Clock, Video, Phone, User, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type AppointmentFormat = "phone" | "video";

export type Appointment = {
  id: string;
  type: string;
  dateTime: Date;
  duration: number;
  consultantName: string;
  format: AppointmentFormat;
  joinUrl?: string;
  phoneNumber?: string;
};

type AppointmentCardProps = {
  appointment: Appointment;
  onReschedule?: () => void;
  onCancel?: () => void;
  onJoin?: () => void;
  onAddToCalendar?: () => void;
};

export function AppointmentCard({
  appointment,
  onReschedule,
  onCancel,
  onJoin,
  onAddToCalendar
}: AppointmentCardProps) {
  const now = new Date();
  const appointmentDate = appointment.dateTime;
  const timeUntil = appointmentDate.getTime() - now.getTime();
  const hoursUntil = timeUntil / (1000 * 60 * 60);
  const canJoin = hoursUntil < 0.25 && hoursUntil > -1;
  const isUpcoming = isBefore(now, appointmentDate);

  const getDateLabel = () => {
    if (isToday(appointmentDate)) return "Today";
    if (isTomorrow(appointmentDate)) return "Tomorrow";
    return format(appointmentDate, "EEEE, MMMM d");
  };

  return (
    <Card 
      className="hover-elevate"
      data-testid={`card-appointment-${appointment.id}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{appointment.type}</h4>
              <Badge variant={appointment.format === "video" ? "default" : "secondary"}>
                {appointment.format === "video" ? (
                  <><Video className="h-3 w-3 mr-1" /> Video</>
                ) : (
                  <><Phone className="h-3 w-3 mr-1" /> Phone</>
                )}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <User className="h-4 w-4" />
              <span>{appointment.consultantName}</span>
            </div>
          </div>

          {isUpcoming && hoursUntil < 24 && (
            <Badge variant="outline" className="bg-primary/10">
              {formatDistanceToNow(appointmentDate, { addSuffix: true })}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{getDateLabel()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{format(appointmentDate, "h:mm a")}</span>
          </div>
        </div>

        {/* Add to Calendar Button */}
        {isUpcoming && onAddToCalendar && (
          <Button
            variant="outline"
            className="w-full mb-3"
            onClick={onAddToCalendar}
            data-testid={`button-add-to-calendar-${appointment.id}`}
          >
            <CalendarPlus className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
        )}

        <div className="flex gap-2">
          {canJoin && appointment.format === "video" && (
            <Button 
              className="flex-1"
              onClick={onJoin}
              data-testid={`button-join-${appointment.id}`}
            >
              <Video className="h-4 w-4 mr-2" />
              Join Call
            </Button>
          )}
          {canJoin && appointment.format === "phone" && (
            <Button 
              className="flex-1"
              onClick={onJoin}
              data-testid={`button-call-${appointment.id}`}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          )}
          {isUpcoming && !canJoin && (
            <>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onReschedule}
                data-testid={`button-reschedule-${appointment.id}`}
              >
                Reschedule
              </Button>
              <Button 
                variant="ghost"
                onClick={onCancel}
                data-testid={`button-cancel-${appointment.id}`}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
