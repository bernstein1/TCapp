import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// For a full reschedule flow, we'd reuse DateSelector and TimeSelector here
// But since they depend on SchedulingContext, we might need to wrap this modal in a provider or refactor
// For this MVP step, I'll create a simple placeholder that would ideally load the availability

export function RescheduleModal({ isOpen, onClose, appointmentId }: { isOpen: boolean; onClose: () => void; appointmentId: number | null }) {
    const [loading, setLoading] = useState(false);

    const handleReschedule = async () => {
        // Logic to update appointment
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onClose();
            // Trigger refresh
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-gray-500 mb-4">
                        Select a new date and time for your appointment.
                    </p>
                    {/* 
            TODO: reuse DateSelector and TimeSelector here.
            This requires lifting the state up or creating a separate context for the modal.
            For now, showing a placeholder message as per MVP scope.
          */}
                    <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
                        Calendar selection would appear here.
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleReschedule} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Confirm Change
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
