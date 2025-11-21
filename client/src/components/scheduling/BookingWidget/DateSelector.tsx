import React, { useEffect, useState } from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { AvailabilityDate } from "@/types/scheduling";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";
import { format, startOfMonth } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function DateSelector({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const { selectedType, setDate, selectedDate } = useScheduling();
    const [availableDates, setAvailableDates] = useState<AvailabilityDate[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const { toast } = useToast();

    useEffect(() => {
        if (!selectedType) return;

        const fetchDates = async () => {
            setLoading(true);
            try {
                const monthStr = format(currentMonth, "yyyy-MM");
                const response = await fetch(`/api/scheduling/availability/dates?month=${monthStr}&appointmentTypeID=${selectedType.id}`);
                if (!response.ok) throw new Error("Failed to fetch dates");
                const data = await response.json();
                setAvailableDates(data);
            } catch (error) {
                console.error(error);
                toast({
                    title: "Error",
                    description: "Failed to load available dates.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDates();
    }, [selectedType, currentMonth, toast]);

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            setDate(date);
            onNext();
        }
    };

    const isDateDisabled = (date: Date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        return !availableDates.some((d) => d.date === dateStr && d.slotsAvailable > 0);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-[#2E4E99]">Select a Date</h2>
                <p className="text-gray-500 mt-2">
                    Showing availability for <span className="font-semibold">{selectedType?.name}</span>
                </p>
            </div>

            <div className="flex justify-center">
                <div className="p-4 border rounded-xl shadow-sm bg-white">
                    <Calendar
                        mode="single"
                        selected={selectedDate || undefined}
                        onSelect={handleSelect}
                        onMonthChange={setCurrentMonth}
                        disabled={isDateDisabled}
                        className="rounded-md border-0"
                        classNames={{
                            day_selected: "bg-[#2E4E99] text-white hover:bg-[#2E4E99] hover:text-white focus:bg-[#2E4E99] focus:text-white",
                            day_today: "bg-gray-100 text-gray-900",
                        }}
                        footer={
                            loading && (
                                <div className="flex justify-center mt-4">
                                    <Loader2 className="h-4 w-4 animate-spin text-[#2E4E99]" />
                                    <span className="ml-2 text-sm text-gray-500">Checking availability...</span>
                                </div>
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
}
