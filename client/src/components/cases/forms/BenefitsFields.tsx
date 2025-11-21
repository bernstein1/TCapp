import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "../types";

interface BenefitsFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    toggleArrayField?: (field: keyof FormData, value: string) => void;
}

export function BenefitsFields({
    formData,
    updateField,
    toggleArrayField,
}: BenefitsFieldsProps) {
    return (
        <div className="space-y-4 border-t pt-4">
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
            <h3 className="font-semibold text-lg">Benefits Question</h3>

            <div>
                <Label>What do you need help understanding? *</Label>
                <div className="space-y-2 mt-2">
                    {[
                        "What's covered under my plan",
                        "Deductible and out-of-pocket costs",
                        "Finding in-network providers",
                        "Pre-authorization requirements",
                        "FSA/HSA questions",
                        "Adding/removing dependents",
                        "COBRA or coverage transitions",
                    ].map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                            <Checkbox
                                id={topic}
                                checked={formData.benefitsHelp.includes(topic)}
                                onCheckedChange={() => toggleArrayField?.("benefitsHelp", topic)}
                            />
                            <Label htmlFor={topic} className="font-normal cursor-pointer">
                                {topic}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="benefits-question">Please describe your question or situation *</Label>
                <Textarea
                    id="benefits-question"
                    placeholder="The more detail you provide, the better we can help"
                    value={formData.benefitsQuestion}
                    onChange={(e) => updateField("benefitsQuestion", e.target.value)}
                    rows={4}
                    className="mt-2"
                />
            </div>

            <div>
                <Label>Is this time-sensitive?</Label>
                <RadioGroup
                    value={formData.isTimeSensitive}
                    onValueChange={(value) => updateField("isTimeSensitive", value)}
                    className="mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="font-normal cursor-pointer">
                            Yes - urgent (need answer within 24-48 hours)
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="somewhat" id="somewhat" />
                        <Label htmlFor="somewhat" className="font-normal cursor-pointer">
                            Somewhat urgent (need answer this week)
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-urgent" id="not-urgent" />
                        <Label htmlFor="not-urgent" className="font-normal cursor-pointer">
                            Not urgent
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
}
