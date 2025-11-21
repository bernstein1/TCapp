export interface AppointmentType {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: string;
    category: string;
    color: string;
    calendarIDs: number[];
}

export interface AvailabilityDate {
    date: string;
    slotsAvailable: number;
}

export interface AvailabilityTime {
    time: string;
    slotsAvailable: number;
}

export interface CreateAppointmentParams {
    datetime: string;
    appointmentTypeID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    fields?: { id: number; value: string }[];
}

export interface SchedulingState {
    selectedType: AppointmentType | null;
    selectedDate: Date | null;
    selectedTime: string | null; // ISO string
    contactDetails: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        notes?: string;
    };
}
