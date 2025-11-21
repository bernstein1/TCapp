import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface PlanFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    toggleArrayField?: (field: keyof FormData, value: string) => void;
}

export function PlanFieldsPage1({
    formData,
    updateField,
    toggleArrayField,
}: PlanFieldsProps) {
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
            <h3 className="font-semibold text-lg">Plan Selection Assistance</h3>

            <div>
                <Label htmlFor="plan-timing">When do you need to select a plan? *</Label>
                <Select value={formData.planSelectionTiming} onValueChange={(value) => updateField("planSelectionTiming", value)}>
                    <SelectTrigger id="plan-timing" className="mt-2">
                        <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open-enrollment">During open enrollment</SelectItem>
                        <SelectItem value="new-hire">New hire enrollment</SelectItem>
                        <SelectItem value="life-event">Life event/qualifying event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>What's most important to you in a health plan? *</Label>
                <p className="text-sm text-muted-foreground mt-1">Select your top priorities</p>
                <div className="space-y-2 mt-2">
                    {[
                        "Lower monthly premiums",
                        "Lower deductible",
                        "Specific doctors/hospitals in network",
                        "Prescription drug coverage",
                        "HSA eligibility",
                        "Lower out-of-pocket maximum",
                    ].map((priority) => (
                        <div key={priority} className="flex items-center space-x-2">
                            <Checkbox
                                id={priority}
                                checked={formData.planPriorities.includes(priority)}
                                onCheckedChange={() => toggleArrayField?.("planPriorities", priority)}
                            />
                            <Label htmlFor={priority} className="font-normal cursor-pointer">
                                {priority}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label>Do you have preferred doctors or facilities you want to keep?</Label>
                <RadioGroup
                    value={formData.hasPreferredProviders}
                    onValueChange={(value) => updateField("hasPreferredProviders", value)}
                    className="mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="providers-yes" />
                        <Label htmlFor="providers-yes" className="font-normal cursor-pointer">
                            Yes
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="providers-no" />
                        <Label htmlFor="providers-no" className="font-normal cursor-pointer">
                            No
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-sure" id="providers-not-sure" />
                        <Label htmlFor="providers-not-sure" className="font-normal cursor-pointer">
                            Not sure
                        </Label>
                    </div>
                </RadioGroup>

                {formData.hasPreferredProviders === "yes" && (
                    <div className="mt-3">
                        <Label htmlFor="preferred-providers">Please list providers/facilities</Label>
                        <Textarea
                            id="preferred-providers"
                            value={formData.preferredProviders}
                            onChange={(e) => updateField("preferredProviders", e.target.value)}
                            rows={3}
                            className="mt-1"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export function PlanFieldsPage2({
    formData,
    updateField,
}: PlanFieldsProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Healthcare Usage</h3>

            <div>
                <Label htmlFor="annual-visits">Estimated number of doctor visits per year (all household members)</Label>
                <Select value={formData.annualVisits} onValueChange={(value) => updateField("annualVisits", value)}>
                    <SelectTrigger id="annual-visits" className="mt-2">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-2">0-2 visits</SelectItem>
                        <SelectItem value="3-5">3-5 visits</SelectItem>
                        <SelectItem value="6-10">6-10 visits</SelectItem>
                        <SelectItem value="10+">More than 10 visits</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="medications">Do you take regular medications?</Label>
                <Select value={formData.takesMedications} onValueChange={(value) => updateField("takesMedications", value)}>
                    <SelectTrigger id="medications" className="mt-2">
                        <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1-2">Yes - 1-2 medications</SelectItem>
                        <SelectItem value="3-5">Yes - 3-5 medications</SelectItem>
                        <SelectItem value="6+">Yes - 6+ medications</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="plan-considerations">Additional considerations</Label>
                <Textarea
                    id="plan-considerations"
                    placeholder="Anything else we should know to help you choose?"
                    value={formData.planConsiderations}
                    onChange={(e) => updateField("planConsiderations", e.target.value)}
                    rows={4}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
