export type CaseCategory =
    | "provider"
    | "billing"
    | "medication"
    | "service"
    | "benefits"
    | "plan"
    | "question"
    | "";

export type FormData = {
    category: CaseCategory;
    requestFor: "self" | "dependent";
    dependentName: string;
    briefDescription: string;
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
