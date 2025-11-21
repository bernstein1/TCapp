import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormData } from "../types";

interface ProviderFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    toggleArrayField?: (field: keyof FormData, value: string) => void;
}

export function ProviderFieldsPage1({
    formData,
    updateField,
    toggleArrayField,
}: ProviderFieldsProps) {
    return (
        <div className="space-y-4">
            {/* Service Location */}
            <div>
                <Label htmlFor="location" className="text-base font-semibold">
                    Service location
                </Label>
                <Input
                    id="location"
                    value={formData.useCustomLocation ? formData.customLocation : formData.location}
                    onChange={(e) =>
                        updateField(formData.useCustomLocation ? "customLocation" : "location", e.target.value)
                    }
                    className="mt-2"
                />
                <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                        id="custom-location"
                        checked={formData.useCustomLocation}
                        onCheckedChange={(checked) => updateField("useCustomLocation", checked)}
                    />
                    <Label htmlFor="custom-location" className="font-normal cursor-pointer text-sm">
                        Use different address
                    </Label>
                </div>
            </div>
            <h3 className="font-semibold text-lg">Provider Search Details</h3>

            <div>
                <Label htmlFor="care-type">What type of care do you need?</Label>
                <Textarea
                    id="care-type"
                    placeholder="Example: annual physical, specialist consultation, urgent care"
                    value={formData.careType}
                    onChange={(e) => updateField("careType", e.target.value)}
                    rows={3}
                    className="mt-2"
                />
            </div>

            <div>
                <Label htmlFor="specialty">What specialty or type of provider?</Label>
                <Input
                    id="specialty"
                    placeholder="Primary Care, Cardiologist, Dermatologist, etc."
                    value={formData.specialty}
                    onChange={(e) => updateField("specialty", e.target.value)}
                    className="mt-2"
                />
            </div>

            <div>
                <Label>Care Format Preference</Label>
                <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="in-person"
                            checked={formData.careFormat.includes("in-person")}
                            onCheckedChange={() => toggleArrayField?.("careFormat", "in-person")}
                        />
                        <Label htmlFor="in-person" className="font-normal cursor-pointer">
                            In-person visits
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="telehealth"
                            checked={formData.careFormat.includes("telehealth")}
                            onCheckedChange={() => toggleArrayField?.("careFormat", "telehealth")}
                        />
                        <Label htmlFor="telehealth" className="font-normal cursor-pointer">
                            Virtual/telehealth visits
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="no-preference"
                            checked={formData.careFormat.includes("no-preference")}
                            onCheckedChange={() => toggleArrayField?.("careFormat", "no-preference")}
                        />
                        <Label htmlFor="no-preference" className="font-normal cursor-pointer">
                            No preference
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProviderFieldsPage2({
    formData,
    updateField,
}: ProviderFieldsProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Preferences</h3>

            <div>
                <Label htmlFor="care-urgency">How soon do you need care? *</Label>
                <Select value={formData.careUrgency} onValueChange={(value) => updateField("careUrgency", value)}>
                    <SelectTrigger id="care-urgency" className="mt-2">
                        <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="urgent">Urgent (within 1-3 days)</SelectItem>
                        <SelectItem value="soon">Soon (within 1-2 weeks)</SelectItem>
                        <SelectItem value="routine">Routine (within a month)</SelectItem>
                        <SelectItem value="flexible">Flexible timing</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="other-prefs">Other Preferences</Label>
                <Textarea
                    id="other-prefs"
                    placeholder="Gender preference, languages spoken, office hours, accessibility needs, etc."
                    value={formData.otherPreferences}
                    onChange={(e) => updateField("otherPreferences", e.target.value)}
                    rows={4}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
