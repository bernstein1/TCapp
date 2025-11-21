import React, { useEffect, useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { CancelModal } from "../Modals/CancelModal";
import { RescheduleModal } from "../Modals/RescheduleModal";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AppointmentList() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const { toast } = useToast();

    // In a real app, we'd get the user's email from context/auth
    const userEmail = "john@example.com";

    const mockAppointments = [
        {
            id: 1,
            datetime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            type: "Benefits Consultation (Video)",
            duration: "30",
            calendarID: 1,
            firstName: "Alex",
            lastName: "Bernstein",
            email: userEmail
        },
        {
            id: 2,
            datetime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
            type: "Phone Consultation",
            duration: "15",
            calendarID: 1,
            firstName: "Alex",
            lastName: "Bernstein",
            email: userEmail
        }
    ];

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/scheduling/appointments?email=${encodeURIComponent(userEmail)}`);
            if (!response.ok) throw new Error("Failed to fetch appointments");
            const data = await response.json();
            // Combine real data with mock data for testing
            setAppointments([...data, ...mockAppointments]);
        } catch (error) {
            console.error(error);
            // Fallback to mock data on error
            setAppointments(mockAppointments);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 60000);
        return () => clearInterval(interval);
    }, []);

    const openReschedule = (id: number) => {
        setSelectedAppointmentId(id);
        setRescheduleModalOpen(true);
    };

    const openCancel = (id: number) => {
        setSelectedAppointmentId(id);
        setCancelModalOpen(true);
    };

    const handleCancelConfirm = async () => {
        if (!selectedAppointmentId) return;

        setActionLoading(true);
        try {
            const response = await fetch(`/api/scheduling/appointments/${selectedAppointmentId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to cancel");

            toast({
                title: "Cancelled",
                description: "Appointment has been cancelled.",
            });

            setCancelModalOpen(false);
            fetchAppointments(); // Refresh list
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to cancel appointment.",
                variant: "destructive",
            });
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && appointments.length === 0) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 h-full border border-white/20 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#2E4E99] rounded-full"></span>
                Upcoming Appointments
            </h2>

            {appointments.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white/40 rounded-xl border border-dashed border-gray-200">
                    <p>No upcoming appointments.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <AppointmentCard
                            key={apt.id}
                            appointment={apt}
                            onReschedule={openReschedule}
                            onCancel={openCancel}
                        />
                    ))}
                </div>
            )}

            <CancelModal
                isOpen={cancelModalOpen}
                onClose={() => setCancelModalOpen(false)}
                onConfirm={handleCancelConfirm}
                loading={actionLoading}
            />

            <RescheduleModal
                isOpen={rescheduleModalOpen}
                onClose={() => setRescheduleModalOpen(false)}
                appointmentId={selectedAppointmentId}
            />
        </div>
    );
}
