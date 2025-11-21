import React, { useState } from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function ConfirmationStep({ onBack }: { onBack: () => void }) {
    const { selectedType, selectedDate, selectedTime, contactDetails, resetScheduling } = useScheduling();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();

    const handleConfirm = async () => {
        if (!selectedType || !selectedDate || !selectedTime) return;

        setLoading(true);
        try {
            const response = await fetch("/api/scheduling/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    datetime: selectedTime,
                    appointmentTypeID: selectedType.id,
                    firstName: contactDetails.firstName,
                    lastName: contactDetails.lastName,
                    email: contactDetails.email,
                    phone: contactDetails.phone,
                    // Add custom fields if needed, e.g., notes
                }),
            });

            if (!response.ok) throw new Error("Failed to book appointment");

            setSuccess(true);
            toast({
                title: "Success!",
                description: "Your appointment has been successfully booked.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to book appointment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center space-y-6 py-8">
                <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-[#2E4E99]">Appointment Confirmed!</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    We've sent a confirmation email to <strong>{contactDetails.email}</strong>.
                </p>
                <div className="pt-4">
                    <Button onClick={resetScheduling} variant="outline">
                        Book Another Appointment
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-[#2E4E99]">Review & Confirm</h2>
                <p className="text-gray-500 mt-2">Please verify your appointment details.</p>
            </div>

            <Card className="max-w-md mx-auto border-l-4 border-l-[#2E4E99]">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                            <Calendar className="w-5 h-5 text-[#2E4E99]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Service</p>
                            <p className="font-semibold text-gray-900">{selectedType?.name}</p>
                            <p className="text-xs text-gray-500">{selectedType?.duration} minutes</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                            <Clock className="w-5 h-5 text-[#2E4E99]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="font-semibold text-gray-900">
                                {selectedDate && format(selectedDate, "EEEE, MMMM do, yyyy")}
                            </p>
                            <p className="font-semibold text-gray-900">
                                {selectedTime && format(parseISO(selectedTime), "h:mm a")}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4 space-y-3">
                        <div className="flex items-center space-x-3">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{contactDetails.firstName} {contactDetails.lastName}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{contactDetails.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{contactDetails.phone}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between max-w-md mx-auto pt-4">
                <Button variant="outline" onClick={onBack} disabled={loading}>
                    Back
                </Button>
                <Button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="bg-[#2E4E99] hover:bg-[#233b7d] min-w-[140px]"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
}
