import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  FileText,
  DollarSign,
  Pill,
  Stethoscope,
  HelpCircle,
  ClipboardList,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type NewCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

type CaseCategory =
  | "provider"
  | "billing"
  | "medication"
  | "service"
  | "benefits"
  | "plan"
  | "question"
  | "";

type FormStep = "category" | "details" | "review" | "confirmation";

type FormData = {
  category: CaseCategory;
  requestFor: "self" | "dependent";
  dependentName: string;
  location: string;
  useCustomLocation: boolean;
  customLocation: string;

  // Provider fields
  careType: string;
  specialty: string;
  locationPreference: string;
  openToNearbyCities: string;
  nearbyCities: string;
  careFormat: string[];
  otherPreferences: string;
  careUrgency: string;

  // Billing fields
  hasBill: string;
  billFile: File | null;
  billingConcerns: string[];
  insuranceType: string;
  otherInsurance: string[];
  madePayments: string;
  paymentAmount: string;
  paymentDate: string;
  desiredOutcome: string[];
  billingContext: string;

  // Medication fields
  medicationName: string;
  dosage: string;
  form: string;
  quantity: string;
  purpose: string;
  prescriptionType: string;
  currentPharmacy: string;
  openTo: string[];

  // Service fields
  serviceName: string;
  serviceDescription: string;
  hasRecommendedFacility: string;
  facilityName: string;
  serviceUrgency: string;
  hasReferral: string;
  serviceAdditionalInfo: string;

  // Benefits fields
  benefitsHelp: string[];
  benefitsQuestion: string;
  isTimeSensitive: string;

  // Plan fields
  planSelectionTiming: string;
  planPriorities: string[];
  preferredProviders: string;
  hasPreferredProviders: string;
  ongoingNeeds: string;
  hasOngoingNeeds: string;
  annualVisits: string;
  takesMedications: string;
  planConsiderations: string;

  // Quick question
  quickQuestion: string;
  questionCategory: string;

  // Communication
  contactMethod: string[];
  leaveVoicemail: boolean;
  bestTime: string[];
  additionalNotes: string;
};

const categoryOptions = [
  { id: "provider", label: "Help finding a provider or care center", icon: MapPin },
  { id: "billing", label: "Help with medical billing", icon: DollarSign },
  { id: "medication", label: "Find lower cost medications", icon: Pill },
  { id: "service", label: "Help with a service or procedure", icon: Stethoscope },
  { id: "benefits", label: "Help with your health benefits", icon: HelpCircle },
  { id: "plan", label: "Help selecting a medical plan", icon: ClipboardList },
  { id: "question", label: "Ask a quick question", icon: MessageSquare },
];

export function NewCaseModal({ open, onClose }: NewCaseModalProps) {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<FormStep>("category");
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    requestFor: "self",
    dependentName: "",
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
  });

  // Get total pages for current category
  const getTotalPages = () => {
    switch (formData.category) {
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

  const handleCategorySelect = (category: CaseCategory) => {
    setFormData({ ...formData, category });
    setCurrentPage(0);
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (step === "details" && currentPage === 0) {
      setStep("category");
    } else if (step === "review") {
      setStep("details");
      setCurrentPage(getTotalPages() - 1);
    }
  };

  const handleNext = () => {
    const totalPages = getTotalPages();
    if (step === "details" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (step === "details" && currentPage === totalPages - 1) {
      setStep("review");
    }
  };

  const handleSkip = () => {
    handleNext(); // Skip works the same as next for now
  };

  const handleSubmit = () => {
    // Simulate case creation
    const newCaseId = `case-${Date.now()}`;
    setStep("confirmation");

    // Navigate to case after 2 seconds
    setTimeout(() => {
      onClose();
      setLocation(`/cases/${newCaseId}`);
      // Reset form
      setStep("category");
      setFormData({
        ...formData,
        category: "",
      });
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset form after close
    setTimeout(() => {
      setStep("category");
      setCurrentPage(0);
      setFormData({
        ...formData,
        category: "",
      });
    }, 300);
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
        />
      );
    }

    // Category-specific pages
    switch (formData.category) {
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
          <BillingFieldsPage2 formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
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
          <PlanFieldsPage2 formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        {/* Category Selection */}
        {step === "category" && (
          <>
            <DialogHeader>
              <DialogTitle>What can we help you with today?</DialogTitle>
              <DialogDescription>
                Select the type of assistance you need
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid grid-cols-1 gap-3 py-4">
                {categoryOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Card
                      key={option.id}
                      className="p-4 hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => handleCategorySelect(option.id as CaseCategory)}
                      data-testid={`category-${option.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{option.label}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}

        {/* Details Form */}
        {step === "details" && formData.category && (
          <>
            <DialogHeader>
              <DialogTitle>
                {categoryOptions.find((c) => c.id === formData.category)?.label}
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
                    {categoryOptions.find((c) => c.id === formData.category)?.label}
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
      </DialogContent>
    </Dialog>
  );
}

// Helper Components
function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b pb-3">
      <h4 className="font-semibold text-sm text-muted-foreground mb-1">{title}</h4>
      {children}
    </div>
  );
}

// Paginated Field Components
function UniversalFields({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-semibold">This request is for: *</Label>
        <RadioGroup
          value={formData.requestFor}
          onValueChange={(value) => updateField("requestFor", value)}
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
    </div>
  );
}

function ProviderFieldsPage1({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Provider Search Details</h3>

      <div>
        <Label htmlFor="care-type">What type of care do you need? *</Label>
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
              onCheckedChange={() => toggleArrayField("careFormat", "in-person")}
            />
            <Label htmlFor="in-person" className="font-normal cursor-pointer">
              In-person visits
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="telehealth"
              checked={formData.careFormat.includes("telehealth")}
              onCheckedChange={() => toggleArrayField("careFormat", "telehealth")}
            />
            <Label htmlFor="telehealth" className="font-normal cursor-pointer">
              Virtual/telehealth visits
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-preference"
              checked={formData.careFormat.includes("no-preference")}
              onCheckedChange={() => toggleArrayField("careFormat", "no-preference")}
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

function ProviderFieldsPage2({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
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

function BillingFieldsPage1({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4">
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
                onCheckedChange={() => toggleArrayField("billingConcerns", concern)}
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

function BillingFieldsPage2({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
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

function MedicationFieldsPage1({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
  return (
    <div className="space-y-4">
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

function MedicationFieldsPage2({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
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
                  onCheckedChange={() => toggleArrayField("openTo", option)}
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

function ServiceFieldsPage1({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
  return (
    <div className="space-y-4">
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

function ServiceFieldsPage2({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
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

function PlanFieldsPage1({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4">
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
                onCheckedChange={() => toggleArrayField("planPriorities", priority)}
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
              rows={2}
              className="mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PlanFieldsPage2({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
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

function ProviderFields({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-semibold text-lg">Provider Search Details</h3>

      <div>
        <Label htmlFor="care-type">What type of care do you need? *</Label>
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
              onCheckedChange={() => toggleArrayField("careFormat", "in-person")}
            />
            <Label htmlFor="in-person" className="font-normal cursor-pointer">
              In-person visits
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="telehealth"
              checked={formData.careFormat.includes("telehealth")}
              onCheckedChange={() => toggleArrayField("careFormat", "telehealth")}
            />
            <Label htmlFor="telehealth" className="font-normal cursor-pointer">
              Virtual/telehealth visits
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-preference"
              checked={formData.careFormat.includes("no-preference")}
              onCheckedChange={() => toggleArrayField("careFormat", "no-preference")}
            />
            <Label htmlFor="no-preference" className="font-normal cursor-pointer">
              No preference
            </Label>
          </div>
        </div>
      </div>

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
          rows={3}
          className="mt-2"
        />
      </div>
    </div>
  );
}

function BillingFields({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
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
                onCheckedChange={() => toggleArrayField("billingConcerns", concern)}
              />
              <Label htmlFor={concern} className="font-normal cursor-pointer">
                {concern}
              </Label>
            </div>
          ))}
        </div>
      </div>

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
          rows={3}
          className="mt-2"
        />
      </div>
    </div>
  );
}

function MedicationFields({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
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
                  onCheckedChange={() => toggleArrayField("openTo", option)}
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

function ServiceFields({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
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

function BenefitsFields({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
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
                onCheckedChange={() => toggleArrayField("benefitsHelp", topic)}
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

function PlanFields({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
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
                onCheckedChange={() => toggleArrayField("planPriorities", priority)}
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
          rows={3}
          className="mt-2"
        />
      </div>
    </div>
  );
}

function QuestionFields({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-semibold text-lg">Your Question</h3>

      <div>
        <Label htmlFor="quick-question">Your Question *</Label>
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

function CommunicationPreferences({
  formData,
  updateField,
  toggleArrayField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  toggleArrayField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-semibold text-lg">Communication Preferences</h3>

      <div>
        <Label>How would you prefer we contact you? *</Label>
        <div className="space-y-2 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="phone"
              checked={formData.contactMethod.includes("phone")}
              onCheckedChange={() => toggleArrayField("contactMethod", "phone")}
            />
            <Label htmlFor="phone" className="font-normal cursor-pointer flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone call (555-123-4567)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="portal"
              checked={formData.contactMethod.includes("portal")}
              onCheckedChange={() => toggleArrayField("contactMethod", "portal")}
            />
            <Label htmlFor="portal" className="font-normal cursor-pointer flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
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
                <Label htmlFor="voicemail" className="font-normal cursor-pointer text-sm">
                  Okay to leave detailed voicemail
                </Label>
              </div>
            </div>
          )}
        </div>
      </div>

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
