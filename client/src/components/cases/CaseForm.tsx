import React, { useState } from "react";
import { useLocation } from "wouter";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { FormData, CaseCategory } from "./types";
import { UniversalFields } from "./forms/UniversalFields";
import { CommunicationPreferences } from "./forms/CommunicationPreferences";
import { ProviderFieldsPage1, ProviderFieldsPage2 } from "./forms/ProviderFields";
import { BillingFieldsPage1, BillingFieldsPage2 } from "./forms/BillingFields";
import { MedicationFieldsPage1, MedicationFieldsPage2 } from "./forms/MedicationFields";
import { ServiceFieldsPage1, ServiceFieldsPage2 } from "./forms/ServiceFields";
import { PlanFieldsPage1, PlanFieldsPage2 } from "./forms/PlanFields";
import { BenefitsFields } from "./forms/BenefitsFields";
import { QuestionFields } from "./forms/QuestionFields";

type FormStep = "details" | "review" | "confirmation";

interface CaseFormProps {
    category: CaseCategory;
    categoryLabel: string;
    onBackToCategory: () => void;
    onClose: () => void;
}

const initialFormData: FormData = {
    category: "",
    requestFor: "self",
    dependentName: "",
    briefDescription: "",
    location: "123 Main St, New York, NY 10001",
    useCustomLocation: false,
    customLocation: "",
    careType: "",
    specialty: "",
    locationPreference: "home",
    openToNearbyCities: "",
    nearbyCities: "",
    careFormat: [],
    otherPreferences: "",
    careUrgency: "",
    hasBill: "",
    billFile: null,
    billingConcerns: [],
    insuranceType: "",
    otherInsurance: [],
    madePayments: "",
    paymentAmount: "",
    paymentDate: "",
    desiredOutcome: [],
    billingContext: "",
    medicationName: "",
    dosage: "",
    form: "",
    quantity: "",
    purpose: "",
    prescriptionType: "",
    currentPharmacy: "",
    openTo: [],
    serviceName: "",
    serviceDescription: "",
    hasRecommendedFacility: "",
    facilityName: "",
    serviceUrgency: "",
    hasReferral: "",
    serviceAdditionalInfo: "",
    benefitsHelp: [],
    benefitsQuestion: "",
    isTimeSensitive: "",
    planSelectionTiming: "",
    planPriorities: [],
    preferredProviders: "",
    hasPreferredProviders: "",
    ongoingNeeds: "",
    hasOngoingNeeds: "",
    annualVisits: "",
    takesMedications: "",
    planConsiderations: "",
    quickQuestion: "",
    questionCategory: "",
    contactMethod: [],
    leaveVoicemail: false,
    bestTime: [],
    additionalNotes: "",
};

export function CaseForm({ category, categoryLabel, onBackToCategory, onClose }: CaseFormProps) {
    const [, setLocation] = useLocation();
    const [step, setStep] = useState<FormStep>("details");
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        ...initialFormData,
        category,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Get total pages for current category
    const getTotalPages = () => {
        switch (category) {
            case "provider":
                return 4; // Universal + 2 provider pages + Communication
            case "billing":
                return 4; // Universal + 2 billing pages + Communication
            case "medication":
                return 4; // Universal + 2 medication pages + Communication
            case "service":
                return 4; // Universal + 2 service pages + Communication
            case "benefits":
                return 3; // Universal + Benefits + Communication
            case "plan":
                return 4; // Universal + 2 plan pages + Communication
            case "question":
                return 3; // Universal + Question + Communication
            default:
                return 1;
        }
    };

    const handleBack = () => {
        if (step === "details" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if (step === "details" && currentPage === 0) {
            onBackToCategory();
        } else if (step === "review") {
            setStep("details");
            setCurrentPage(getTotalPages() - 1);
        }
        setErrors({});
    };

    const handleNext = () => {
        const totalPages = getTotalPages();

        // Validate brief description on first page
        if (step === "details" && currentPage === 0) {
            if (!formData.briefDescription.trim()) {
                setErrors({ briefDescription: "Please briefly describe your request" });
                return;
            }
        }

        if (step === "details" && currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            setErrors({});
        } else if (step === "details" && currentPage === totalPages - 1) {
            setStep("review");
        }
    };

    const validateContactMethod = () => {
        if (formData.contactMethod.length === 0) {
            setErrors({ contactMethod: "Please select at least one contact method" });
            return false;
        }
        return true;
    };

    const handleSkip = () => {
        handleNext(); // Skip works the same as next for now
    };

    const handleSubmit = () => {
        if (!validateContactMethod()) {
            return;
        }

        // Simulate case creation
        const newCaseId = `case-${Date.now()}`;
        setStep("confirmation");

        // Navigate to case after 2 seconds
        setTimeout(() => {
            onClose();
            setLocation(`/cases/${newCaseId}`);
        }, 2000);
    };

    const updateField = (field: keyof FormData, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const toggleArrayField = (field: keyof FormData, value: string) => {
        const currentArray = formData[field] as string[];
        const newArray = currentArray.includes(value)
            ? currentArray.filter((v) => v !== value)
            : [...currentArray, value];
        setFormData({ ...formData, [field]: newArray });
    };

    // Render the current page content
    const renderCurrentPage = () => {
        const totalPages = getTotalPages();
        const isLastPage = currentPage === totalPages - 1;

        // Page 0 is always universal fields
        if (currentPage === 0) {
            return (
                <UniversalFields
                    formData={formData}
                    updateField={updateField}
                    errors={errors}
                />
            );
        }

        // Last page is always communication preferences
        if (isLastPage) {
            return (
                <CommunicationPreferences
                    formData={formData}
                    updateField={updateField}
                    toggleArrayField={toggleArrayField}
                    errors={errors}
                />
            );
        }

        // Category-specific pages
        switch (category) {
            case "provider":
                return currentPage === 1 ? (
                    <ProviderFieldsPage1 formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
                ) : (
                    <ProviderFieldsPage2 formData={formData} updateField={updateField} />
                );
            case "billing":
                return currentPage === 1 ? (
                    <BillingFieldsPage1 formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
                ) : (
                    <BillingFieldsPage2 formData={formData} updateField={updateField} />
                );
            case "medication":
                return currentPage === 1 ? (
                    <MedicationFieldsPage1 formData={formData} updateField={updateField} />
                ) : (
                    <MedicationFieldsPage2 formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
                );
            case "service":
                return currentPage === 1 ? (
                    <ServiceFieldsPage1 formData={formData} updateField={updateField} />
                ) : (
                    <ServiceFieldsPage2 formData={formData} updateField={updateField} />
                );
            case "benefits":
                return (
                    <BenefitsFields formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
                );
            case "plan":
                return currentPage === 1 ? (
                    <PlanFieldsPage1 formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
                ) : (
                    <PlanFieldsPage2 formData={formData} updateField={updateField} />
                );
            case "question":
                return (
                    <QuestionFields formData={formData} updateField={updateField} />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Details Form */}
            {step === "details" && (
                <>
                    <DialogHeader>
                        <DialogTitle>
                            {categoryLabel}
                        </DialogTitle>
                        <DialogDescription>
                            Page {currentPage + 1} of {getTotalPages()} - Please provide details so we can assist you better
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="max-h-[55vh] pr-4">
                        <div className="space-y-6 py-4">
                            {renderCurrentPage()}
                        </div>
                    </ScrollArea>

                    <DialogFooter className="flex justify-between sm:justify-between">
                        <Button variant="outline" onClick={handleBack}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            {currentPage === 0 ? "Category" : "Back"}
                        </Button>
                        <div className="flex gap-2">
                            {currentPage < getTotalPages() - 1 && (
                                <Button variant="ghost" onClick={handleSkip}>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext}>
                                {currentPage === getTotalPages() - 1 ? "Review" : "Next"}
                                {currentPage < getTotalPages() - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                    </DialogFooter>
                </>
            )}

            {/* Review Screen */}
            {step === "review" && (
                <>
                    <DialogHeader>
                        <DialogTitle>Review Your Request</DialogTitle>
                        <DialogDescription>
                            Please verify your information before submitting
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="max-h-[55vh] pr-4">
                        <div className="space-y-4 py-4">
                            <ReviewSection title="Request Type">
                                <p className="font-medium">
                                    {categoryLabel}
                                </p>
                            </ReviewSection>

                            <ReviewSection title="Request For">
                                <p>
                                    {formData.requestFor === "self"
                                        ? "Yourself"
                                        : `Dependent: ${formData.dependentName}`}
                                </p>
                            </ReviewSection>

                            <ReviewSection title="Location">
                                <p>{formData.useCustomLocation ? formData.customLocation : formData.location}</p>
                            </ReviewSection>

                            <ReviewSection title="Preferred Contact">
                                <div className="space-y-1">
                                    <p>Method: {formData.contactMethod.join(", ") || "Not specified"}</p>
                                    {formData.bestTime.length > 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            Best time: {formData.bestTime.join(", ")}
                                        </p>
                                    )}
                                </div>
                            </ReviewSection>
                        </div>
                    </ScrollArea>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleBack}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button onClick={handleSubmit}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Submit Request
                        </Button>
                    </DialogFooter>
                </>
            )}

            {/* Confirmation Screen */}
            {step === "confirmation" && (
                <>
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center space-y-4 py-6">
                            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">Your request has been submitted!</DialogTitle>
                                <DialogDescription className="mt-2">
                                    We'll review your request and contact you soon
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <Card className="p-4 bg-accent/50">
                            <h4 className="font-semibold mb-3">What happens next:</h4>
                            <ol className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="font-semibold">1.</span>
                                    <span>A TouchCare specialist will review your request</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-semibold">2.</span>
                                    <span>
                                        We'll contact you via {formData.contactMethod.join(" or ") || "your preferred method"} within 1
                                        business day
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-semibold">3.</span>
                                    <span>You can track your request status in your portal dashboard</span>
                                </li>
                            </ol>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border-b pb-3">
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">{title}</h4>
            {children}
        </div>
    );
}
