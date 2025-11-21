import React, { useState } from "react";
import { AppointmentTypeSelector } from "./AppointmentTypeSelector";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
import { ContactForm } from "./ContactForm";
import { ConfirmationStep } from "./ConfirmationStep";
import { useScheduling } from "@/context/SchedulingContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppointmentType } from "@/types/scheduling";

export function BookingWidget() {
    const [step, setStep] = useState(1);
    const { selectedType, selectedDate, selectedTime, resetScheduling, setAppointmentType, setDate, setTime, setContactDetails } = useScheduling();

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const handleTypeSelect = (type: AppointmentType) => {
        setAppointmentType(type);
        nextStep();
    };

    const handleDateSelect = (date: any) => {
        setDate(date);
        nextStep();
    };

    const handleTimeSelect = (time: any) => {
        setTime(time);
        nextStep();
    };

    const handleContactSubmit = (data: any) => {
        setContactDetails(data);
        nextStep();
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8 relative">
                <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#2E4E99] to-[#4B7BFF]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 5) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Service</span>
                    <span>Date</span>
                    <span>Time</span>
                    <span>Details</span>
                    <span>Confirm</span>
                </div>
            </div>

            {/* Main Card */}
            <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative Gradient Blob */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2E4E99]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4B7BFF]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="p-6 md:p-8 relative z-10">
                    {step > 1 && ( // Back button for steps > 1
                        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 pl-0 hover:bg-transparent hover:text-[#2E4E99]">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                    )}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {step === 1 && <AppointmentTypeSelector onSelect={handleTypeSelect} />}
                            {step === 2 && <DateSelector onNext={handleDateSelect} onBack={prevStep} />}
                            {step === 3 && <TimeSelector onNext={handleTimeSelect} onBack={prevStep} />}
                            {step === 4 && <ContactForm onNext={handleContactSubmit} onBack={prevStep} />}
                            {step === 5 && <ConfirmationStep onBack={prevStep} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
