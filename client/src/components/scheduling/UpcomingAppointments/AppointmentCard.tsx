import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, Calendar, MoreHorizontal, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Appointment {
    id: number;
    datetime: string;
    type: string;
    duration: string;
    calendarID: number;
    firstName: string;
    lastName: string;
    email: string;
}

export function AppointmentCard({ appointment, onReschedule, onCancel }: { appointment: Appointment; onReschedule: (id: number) => void; onCancel: (id: number) => void }) {
    const date = parseISO(appointment.datetime);
    const isVideo = appointment.type.toLowerCase().includes("video");
    const isPhone = appointment.type.toLowerCase().includes("phone");

    return (
        <Card className="mb-4 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className={`${isVideo ? "bg-blue-100 text-blue-800" : isPhone ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}`}>
                        {isVideo ? <Video className="w-3 h-3 mr-1" /> : isPhone ? <Phone className="w-3 h-3 mr-1" /> : <Calendar className="w-3 h-3 mr-1" />}
                        {appointment.type}
                    </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">
                    {appointment.firstName} {appointment.lastName}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{format(date, "EEE, MMM d • h:mm a")}</span>
                </div>

                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-gray-200 hover:border-[#2E4E99] hover:text-[#2E4E99]"
                            onClick={() => onReschedule(appointment.id)}
                        >
                            Reschedule
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-gray-200 hover:border-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => onCancel(appointment.id)}
                        >
                            Cancel
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs border-gray-200 hover:border-[#2E4E99] hover:text-[#2E4E99]"
                        onClick={() => {
                            // Generate .ics logic here
                            alert("Add to calendar functionality coming soon");
                        }}
                    >
                        Add to Calendar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
