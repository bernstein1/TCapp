import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormData } from "../types";

interface UniversalFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    errors?: Record<string, string>;
}

export function UniversalFields({
    formData,
    updateField,
    errors,
}: UniversalFieldsProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="brief-description" className="text-base font-semibold">
                    Briefly describe your request *
                </Label>
                <Input
                    id="brief-description"
                    placeholder="E.g., I need a new primary care doctor"
                    value={formData.briefDescription}
                    onChange={(e) => updateField("briefDescription", e.target.value)}
                    className={`mt-2 ${errors?.briefDescription ? "border-red-500" : ""}`}
                    required
                    aria-required="true"
                    aria-describedby={errors?.briefDescription ? "brief-description-error" : undefined}
                    aria-invalid={!!errors?.briefDescription}
                />
                {errors?.briefDescription && (
                    <p id="brief-description-error" className="text-sm text-red-500 mt-1" role="alert">
                        {errors.briefDescription}
                    </p>
                )}
            </div>

            <div>
                <Label className="text-base font-semibold">This request is for: *</Label>
                <RadioGroup
                    value={formData.requestFor}
                    onValueChange={(value) => updateField("requestFor", value as "self" | "dependent")}
                    className="mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self" id="self" />
                        <Label htmlFor="self" className="font-normal cursor-pointer">
                            Myself
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dependent" id="dependent" />
                        <Label htmlFor="dependent" className="font-normal cursor-pointer">
                            My dependent/family member
                        </Label>
                    </div>
                </RadioGroup>
                {formData.requestFor === "dependent" && (
                    <div className="mt-3">
                        <Label htmlFor="dependent-select">Select dependent *</Label>
                        <Select
                            value={formData.dependentName}
                            onValueChange={(value) => updateField("dependentName", value)}
                        >
                            <SelectTrigger id="dependent-select" className="mt-1">
                                <SelectValue placeholder="Choose dependent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="jane-doe">Jane Doe (Spouse)</SelectItem>
                                <SelectItem value="emily-doe">Emily Doe (Child)</SelectItem>
                                <SelectItem value="add-new">+ Add new dependent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
        </div>
    );
}
