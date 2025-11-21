import React, { useEffect, useState } from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { AvailabilityTime } from "@/types/scheduling";
import { Button } from "@/components/ui/button";
import { Loader2, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function TimeSelector({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const { selectedType, selectedDate, setTime, selectedTime } = useScheduling();
    const [availableTimes, setAvailableTimes] = useState<AvailabilityTime[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!selectedType || !selectedDate) return;

        const fetchTimes = async () => {
            setLoading(true);
            try {
                const dateStr = format(selectedDate, "yyyy-MM-dd");
                const response = await fetch(`/api/scheduling/availability/times?date=${dateStr}&appointmentTypeID=${selectedType.id}`);
                if (!response.ok) throw new Error("Failed to fetch times");
                const data = await response.json();
                setAvailableTimes(data);
            } catch (error) {
                console.error(error);
                toast({
                    title: "Error",
                    description: "Failed to load available times.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTimes();
    }, [selectedType, selectedDate, toast]);

    const handleSelect = (time: string) => {
        setTime(time);
        onNext();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-[#2E4E99]">Select a Time</h2>
                <p className="text-gray-500 mt-2">
                    {selectedDate && format(selectedDate, "EEEE, MMMM do, yyyy")}
                </p>
            </div>

            {availableTimes.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No available times for this date.</p>
                    <Button variant="outline" onClick={onBack} className="mt-4">
                        Choose another date
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableTimes.map((slot) => (
                        <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            className={`w-full justify-center ${selectedTime === slot.time ? "bg-[#2E4E99] hover:bg-[#233b7d]" : "hover:border-[#2E4E99] hover:text-[#2E4E99]"}`}
                            onClick={() => handleSelect(slot.time)}
                        >
                            <Clock className="w-4 h-4 mr-2" />
                            {format(parseISO(slot.time), "h:mm a")}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
