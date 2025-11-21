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

interface QuestionFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
}

export function QuestionFields({
    formData,
    updateField,
}: QuestionFieldsProps) {
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
            <h3 className="font-semibold text-lg">Your Question</h3>

            <div>
                <Label htmlFor="quick-question">What is your question?</Label>
                <Textarea
                    id="quick-question"
                    placeholder="Please provide as much detail as possible"
                    value={formData.quickQuestion}
                    onChange={(e) => updateField("quickQuestion", e.target.value)}
                    rows={6}
                    className="mt-2"
                />
            </div>

            <div>
                <Label htmlFor="question-category">Category (optional)</Label>
                <Select value={formData.questionCategory} onValueChange={(value) => updateField("questionCategory", value)}>
                    <SelectTrigger id="question-category" className="mt-2">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="benefits">Benefits coverage</SelectItem>
                        <SelectItem value="claims">Claims</SelectItem>
                        <SelectItem value="providers">Providers</SelectItem>
                        <SelectItem value="medications">Medications</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="plan">Plan selection</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
