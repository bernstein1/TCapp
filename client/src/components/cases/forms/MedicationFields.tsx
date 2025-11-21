import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormData } from "../types";

interface MedicationFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    toggleArrayField?: (field: keyof FormData, value: string) => void;
}

export function MedicationFieldsPage1({
    formData,
    updateField,
}: MedicationFieldsProps) {
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
            <h3 className="font-semibold text-lg">Medication Details</h3>

            <div>
                <Label htmlFor="med-name">Medication Name *</Label>
                <Input
                    id="med-name"
                    placeholder="Enter medication name"
                    value={formData.medicationName}
                    onChange={(e) => updateField("medicationName", e.target.value)}
                    className="mt-2"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Label htmlFor="dosage">Strength/Dosage *</Label>
                    <Input
                        id="dosage"
                        placeholder="10mg, 500mg, etc."
                        value={formData.dosage}
                        onChange={(e) => updateField("dosage", e.target.value)}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="form">Form *</Label>
                    <Select value={formData.form} onValueChange={(value) => updateField("form", value)}>
                        <SelectTrigger id="form" className="mt-2">
                            <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="capsule">Capsule</SelectItem>
                            <SelectItem value="liquid">Liquid</SelectItem>
                            <SelectItem value="injection">Injection</SelectItem>
                            <SelectItem value="inhaler">Inhaler</SelectItem>
                            <SelectItem value="cream">Cream/Ointment</SelectItem>
                            <SelectItem value="patch">Patch</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Label htmlFor="quantity">Quantity per fill</Label>
                <Input
                    id="quantity"
                    placeholder="30 tablets, 90-day supply, etc."
                    value={formData.quantity}
                    onChange={(e) => updateField("quantity", e.target.value)}
                    className="mt-2"
                />
            </div>
        </div>
    );
}

export function MedicationFieldsPage2({
    formData,
    updateField,
    toggleArrayField,
}: MedicationFieldsProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Medication Info</h3>

            <div>
                <Label htmlFor="purpose">What is this medication for?</Label>
                <Input
                    id="purpose"
                    placeholder="Condition or purpose - helps us find alternatives"
                    value={formData.purpose}
                    onChange={(e) => updateField("purpose", e.target.value)}
                    className="mt-2"
                />
            </div>

            <div>
                <Label>Is this a new prescription or existing? *</Label>
                <RadioGroup
                    value={formData.prescriptionType}
                    onValueChange={(value) => updateField("prescriptionType", value)}
                    className="mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new-rx" />
                        <Label htmlFor="new-rx" className="font-normal cursor-pointer">
                            New prescription (not filled yet)
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="existing" id="existing-rx" />
                        <Label htmlFor="existing-rx" className="font-normal cursor-pointer">
                            Existing prescription (currently taking)
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label>Are you open to:</Label>
                <div className="space-y-2 mt-2">
                    {["Generic alternatives", "Mail-order/90-day supply", "Different pharmacies", "Patient assistance programs"].map(
                        (option) => (
                            <div key={option} className="flex items-center space-x-2">
                                <Checkbox
                                    id={option}
                                    checked={formData.openTo.includes(option)}
                                    onCheckedChange={() => toggleArrayField?.("openTo", option)}
                                />
                                <Label htmlFor={option} className="font-normal cursor-pointer">
                                    {option}
                                </Label>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
