import React, { createContext, useContext, useState, ReactNode } from "react";
import { AppointmentType, SchedulingState } from "../types/scheduling";

interface SchedulingContextType extends SchedulingState {
    setAppointmentType: (type: AppointmentType | null) => void;
    setDate: (date: Date | null) => void;
    setTime: (time: string | null) => void;
    setContactDetails: (details: SchedulingState["contactDetails"]) => void;
    resetScheduling: () => void;
}

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: ReactNode }) {
    const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [contactDetails, setContactDetails] = useState<SchedulingState["contactDetails"]>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const resetScheduling = () => {
        setSelectedType(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setContactDetails({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        });
    };

    return (
        <SchedulingContext.Provider
            value={{
                selectedType,
                selectedDate,
                selectedTime,
                contactDetails,
                setAppointmentType: setSelectedType,
                setDate: setSelectedDate,
                setTime: setSelectedTime,
                setContactDetails,
                resetScheduling,
            }}
        >
            {children}
        </SchedulingContext.Provider>
    );
}

export function useScheduling() {
    const context = useContext(SchedulingContext);
    if (context === undefined) {
        throw new Error("useScheduling must be used within a SchedulingProvider");
    }
    return context;
}
