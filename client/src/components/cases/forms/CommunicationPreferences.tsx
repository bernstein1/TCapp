import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, MessageSquare, Clock } from "lucide-react";
import { FormData } from "../types";

interface CommunicationPreferencesProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    toggleArrayField: (field: keyof FormData, value: string) => void;
    errors?: Record<string, string>;
}

export function CommunicationPreferences({
    formData,
    updateField,
    toggleArrayField,
    errors,
}: CommunicationPreferencesProps) {
    return (
        <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-lg">Communication Preferences</h3>

            <fieldset>
                <legend className="text-base font-medium mb-2">How would you prefer we contact you? *</legend>
                <div className="space-y-2 mt-2" aria-describedby={errors?.contactMethod ? "contact-method-error" : undefined}>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="phone"
                            checked={formData.contactMethod.includes("phone")}
                            onCheckedChange={() => toggleArrayField("contactMethod", "phone")}
                            aria-invalid={!!errors?.contactMethod}
                        />
                        <Label htmlFor="phone" className="font-normal cursor-pointer flex items-center gap-2">
                            <Phone className="h-4 w-4" aria-hidden="true" />
                            Phone call (555-123-4567)
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="portal"
                            checked={formData.contactMethod.includes("portal")}
                            onCheckedChange={() => toggleArrayField("contactMethod", "portal")}
                            aria-invalid={!!errors?.contactMethod}
                        />
                        <Label htmlFor="portal" className="font-normal cursor-pointer flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" aria-hidden="true" />
                            TouchCare portal message
                        </Label>
                    </div>

                    {formData.contactMethod.includes("phone") && (
                        <div className="ml-6 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="voicemail"
                                    checked={formData.leaveVoicemail}
                                    onCheckedChange={(checked) => updateField("leaveVoicemail", checked)}
                                />
                                <Label htmlFor="voicemail" className="font-normal cursor-pointer  text-sm">
                                    Okay to leave detailed voicemail
                                </Label>
                            </div>
                        </div>
                    )}
                </div>
                {errors?.contactMethod && (
                    <p id="contact-method-error" className="text-sm text-red-500 mt-1" role="alert">
                        {errors.contactMethod}
                    </p>
                )}
            </fieldset>

            <div>
                <Label>Best time to reach you (optional)</Label>
                <div className="space-y-2 mt-2">
                    {["Morning (8am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)", "Anytime"].map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                            <Checkbox
                                id={time}
                                checked={formData.bestTime.includes(time)}
                                onCheckedChange={() => toggleArrayField("bestTime", time)}
                            />
                            <Label htmlFor={time} className="font-normal cursor-pointer flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {time}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="additional-notes">Additional notes or requests (optional)</Label>
                <Textarea
                    id="additional-notes"
                    placeholder="Any other information that would help us assist you"
                    value={formData.additionalNotes}
                    onChange={(e) => updateField("additionalNotes", e.target.value)}
                    rows={3}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
