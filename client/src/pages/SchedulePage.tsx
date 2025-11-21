import React from "react";
import { BookingWidget } from "@/components/scheduling/BookingWidget/BookingWidget";
import { AppointmentList } from "@/components/scheduling/UpcomingAppointments/AppointmentList";
import { SchedulingProvider } from "@/context/SchedulingContext";

export default function SchedulePage() {
  return (
    <SchedulingProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule a Consultation</h1>
          <p className="text-gray-600 mt-2">
            Book a time with our benefits experts or manage your upcoming appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Booking Widget (Wider) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <BookingWidget />
          </div>

          {/* Right Panel: Upcoming Appointments (Narrower) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <AppointmentList />
          </div>
        </div>
      </div>
    </SchedulingProvider>
  );
}
