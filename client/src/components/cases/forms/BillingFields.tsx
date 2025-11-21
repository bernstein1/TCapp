import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { FormData } from "../types";

interface BillingFieldsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: any) => void;
    toggleArrayField?: (field: keyof FormData, value: string) => void;
}

export function BillingFieldsPage1({
    formData,
    updateField,
    toggleArrayField,
}: BillingFieldsProps) {
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
            <h3 className="font-semibold text-lg">Billing Details</h3>

            <div>
                <Label>Do you have a copy of the bill or EOB? *</Label>
                <RadioGroup value={formData.hasBill} onValueChange={(value) => updateField("hasBill", value)} className="mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes-upload" id="yes-upload" />
                        <Label htmlFor="yes-upload" className="font-normal cursor-pointer">
                            Yes - I'll upload it now
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes-later" id="yes-later" />
                        <Label htmlFor="yes-later" className="font-normal cursor-pointer">
                            Yes - I'll upload it later
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no-not-received" id="no-not-received" />
                        <Label htmlFor="no-not-received" className="font-normal cursor-pointer">
                            No - I haven't received it yet
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-sure" id="not-sure" />
                        <Label htmlFor="not-sure" className="font-normal cursor-pointer">
                            Not sure what that is
                        </Label>
                    </div>
                </RadioGroup>

                {formData.hasBill === "yes-upload" && (
                    <div className="mt-3">
                        <Label htmlFor="bill-upload">Upload Bill/EOB</Label>
                        <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 10MB)</p>
                            <Input
                                id="bill-upload"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="mt-3"
                                onChange={(e) => updateField("billFile", e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>
                )}

                {formData.hasBill === "no-not-received" && (
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                            <strong>Important:</strong> We'll need the actual bill (not just the EOB) to help with your case. Please
                            upload it through the portal once received, and we'll assist you then.
                        </p>
                    </div>
                )}
            </div>

            <div>
                <Label>What's your main concern with this bill? *</Label>
                <div className="space-y-2 mt-2">
                    {[
                        "Amount seems incorrect",
                        "Insurance didn't process/cover it",
                        "Already paid but still receiving bills",
                        "Don't understand the charges",
                        "Need payment plan assistance",
                        "Want to appeal a denial",
                    ].map((concern) => (
                        <div key={concern} className="flex items-center space-x-2">
                            <Checkbox
                                id={concern}
                                checked={formData.billingConcerns.includes(concern)}
                                onCheckedChange={() => toggleArrayField?.("billingConcerns", concern)}
                            />
                            <Label htmlFor={concern} className="font-normal cursor-pointer">
                                {concern}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BillingFieldsPage2({
    formData,
    updateField,
}: BillingFieldsProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payment Information</h3>

            <div>
                <Label>Have you made any payments on this bill?</Label>
                <RadioGroup
                    value={formData.madePayments}
                    onValueChange={(value) => updateField("madePayments", value)}
                    className="mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="payments-yes" />
                        <Label htmlFor="payments-yes" className="font-normal cursor-pointer">
                            Yes
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="payments-no" />
                        <Label htmlFor="payments-no" className="font-normal cursor-pointer">
                            No
                        </Label>
                    </div>
                </RadioGroup>

                {formData.madePayments === "yes" && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                            <Label htmlFor="payment-amount">Amount paid</Label>
                            <Input
                                id="payment-amount"
                                type="number"
                                placeholder="$0.00"
                                value={formData.paymentAmount}
                                onChange={(e) => updateField("paymentAmount", e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="payment-date">Date of payment</Label>
                            <Input
                                id="payment-date"
                                type="date"
                                value={formData.paymentDate}
                                onChange={(e) => updateField("paymentDate", e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div>
                <Label htmlFor="billing-context">Additional Context</Label>
                <Textarea
                    id="billing-context"
                    placeholder="Any relevant details: workers' comp claim, previous billing issues, urgent deadlines, etc."
                    value={formData.billingContext}
                    onChange={(e) => updateField("billingContext", e.target.value)}
                    rows={4}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
