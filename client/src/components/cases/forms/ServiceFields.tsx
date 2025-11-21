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

interface ServiceFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
}

export function ServiceFieldsPage1({
    formData,
    updateField,
}: ServiceFieldsProps) {
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
            <h3 className="font-semibold text-lg">Service/Procedure Details</h3>

            <div>
                <Label htmlFor="service-name">What service or procedure do you need? *</Label>
                <Input
                    id="service-name"
                    placeholder="Example: MRI, surgery, physical therapy, lab work"
                    value={formData.serviceName}
                    onChange={(e) => updateField("serviceName", e.target.value)}
                    className="mt-2"
                />
            </div>

            <div>
                <Label htmlFor="service-desc">Please describe the service in more detail</Label>
                <Textarea
                    id="service-desc"
                    placeholder="What is it for? Any specific requirements from your doctor?"
                    value={formData.serviceDescription}
                    onChange={(e) => updateField("serviceDescription", e.target.value)}
                    rows={3}
                    className="mt-2"
                />
            </div>

            <div>
                <Label>Has your doctor recommended a specific facility?</Label>
                <RadioGroup
                    value={formData.hasRecommendedFacility}
                    onValueChange={(value) => updateField("hasRecommendedFacility", value)}
                    className="mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="facility-yes" />
                        <Label htmlFor="facility-yes" className="font-normal cursor-pointer">
                            Yes
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="facility-no" />
                        <Label htmlFor="facility-no" className="font-normal cursor-pointer">
                            No
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="facility-flexible" />
                        <Label htmlFor="facility-flexible" className="font-normal cursor-pointer">
                            I have flexibility
                        </Label>
                    </div>
                </RadioGroup>

                {formData.hasRecommendedFacility === "yes" && (
                    <div className="mt-3">
                        <Label htmlFor="facility-name">Facility name and location</Label>
                        <Input
                            id="facility-name"
                            value={formData.facilityName}
                            onChange={(e) => updateField("facilityName", e.target.value)}
                            className="mt-1"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export function ServiceFieldsPage2({
    formData,
    updateField,
}: ServiceFieldsProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Service Timing & Authorization</h3>

            <div>
                <Label htmlFor="service-urgency">When do you need this service? *</Label>
                <Select value={formData.serviceUrgency} onValueChange={(value) => updateField("serviceUrgency", value)}>
                    <SelectTrigger id="service-urgency" className="mt-2">
                        <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="urgent">Urgent (ASAP/within days)</SelectItem>
                        <SelectItem value="soon">Soon (within 2-4 weeks)</SelectItem>
                        <SelectItem value="planned">Planned (1-3 months)</SelectItem>
                        <SelectItem value="not-scheduled">Not yet scheduled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Do you have a referral or prior authorization?</Label>
                <RadioGroup value={formData.hasReferral} onValueChange={(value) => updateField("hasReferral", value)} className="mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="referral-yes" />
                        <Label htmlFor="referral-yes" className="font-normal cursor-pointer">
                            Yes, I have it
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-progress" id="referral-progress" />
                        <Label htmlFor="referral-progress" className="font-normal cursor-pointer">
                            In progress
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-yet" id="referral-not-yet" />
                        <Label htmlFor="referral-not-yet" className="font-normal cursor-pointer">
                            Not yet
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-sure" id="referral-not-sure" />
                        <Label htmlFor="referral-not-sure" className="font-normal cursor-pointer">
                            Not sure if I need one
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label htmlFor="service-additional">Additional information</Label>
                <Textarea
                    id="service-additional"
                    placeholder="Anything else that would help us assist you"
                    value={formData.serviceAdditionalInfo}
                    onChange={(e) => updateField("serviceAdditionalInfo", e.target.value)}
                    rows={3}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
