export type GuideStep = {
    stepNumber: number;
    title: string;
    description: string;
    tips?: string[];
    estimatedTime?: string;
};

export type GuideData = {
    id: string;
    title: string;
    description: string;
    category: string;
    estimatedTime: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    steps: GuideStep[];
};

export const guidesData: GuideData[] = [
    {
        id: "1",
        title: "How to File a Claim",
        description: "Step-by-step instructions for submitting medical, dental, and vision claims. Upload your bill, and we'll coordinate with providers to ensure accuracy and handle any discrepancies.",
        category: "Claims",
        estimatedTime: "10 minutes",
        difficulty: "Beginner",
        steps: [
            {
                stepNumber: 1,
                title: "Gather Your Documentation",
                description: "Collect all necessary paperwork including itemized bills, receipts, and any explanation of benefits (EOB) you may have received. Make sure you have clear, legible copies.",
                tips: [
                    "Take photos of bills using your phone for easy upload",
                    "Keep originals in a safe place for your records",
                    "Ensure all charges are itemized with dates of service"
                ],
                estimatedTime: "3 min"
            },
            {
                stepNumber: 2,
                title: "Log Into Your TouchCare Account",
                description: "Navigate to the Claims section in your member portal. You'll find the 'Submit New Claim' button prominently displayed on the dashboard.",
                tips: [
                    "Bookmark the claims page for easy access next time",
                    "Enable notifications to track claim status updates"
                ],
                estimatedTime: "1 min"
            },
            {
                stepNumber: 3,
                title: "Upload Your Bills",
                description: "Use the drag-and-drop interface to upload photos or scans of your bills. Our system accepts JPG, PNG, and PDF formats. You can upload multiple documents at once.",
                tips: [
                    "Make sure images are clear and not blurry",
                    "Include all pages if the bill has multiple pages",
                    "Double-check that provider names and amounts are visible"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 4,
                title: "Provide Service Details",
                description: "Fill in basic information about the service received: date of service, provider name, type of service (medical/dental/vision), and the total amount charged.",
                tips: [
                    "Use the calendar picker for accurate dates",
                    "Copy provider information exactly as it appears on the bill",
                    "If unsure about service type, our system will help categorize it"
                ],
                estimatedTime: "3 min"
            },
            {
                stepNumber: 5,
                title: "Review and Submit",
                description: "Double-check all information for accuracy, then hit Submit. You'll receive a confirmation email with your claim number. Our team will review and coordinate with your provider to ensure everything is processed correctly.",
                tips: [
                    "Save your claim number for future reference",
                    "Most claims are processed within 5-7 business days",
                    "You'll receive notifications at each stage of processing"
                ],
                estimatedTime: "1 min"
            }
        ]
    },
    {
        id: "2",
        title: "Finding In-Network Providers",
        description: "We assess every provider based on location, cost, specialty type, and gender preference. Our Health Assistants carefully match you with in-network providers and can even schedule appointments for you.",
        category: "Provider Network",
        estimatedTime: "8 minutes",
        difficulty: "Beginner",
        steps: [
            {
                stepNumber: 1,
                title: "Define Your Needs",
                description: "Start by identifying what type of provider you need. Are you looking for a primary care physician, specialist, dentist, or mental health professional? Consider location preferences and any specific requirements.",
                tips: [
                    "Think about proximity to home or work",
                    "Consider office hours that match your schedule",
                    "Note any language preferences or accessibility needs"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 2,
                title: "Use the Provider Search Tool",
                description: "Access the Provider Search in your TouchCare portal. Enter your location and select the type of provider you need. Our advanced filters let you narrow by specialty, gender, languages spoken, and more.",
                tips: [
                    "Use the map view to see provider locations visually",
                    "Filter by patient ratings and reviews",
                    "Check 'accepting new patients' to save time"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 3,
                title: "Compare Your Options",
                description: "Review provider profiles including credentials, specialties, patient reviews, and estimated costs. Our system shows you quality scores based on our proprietary criteria and highlights in-network providers to minimize your out-of-pocket costs.",
                tips: [
                    "Look for board certification in their specialty",
                    "Read recent patient reviews for current insights",
                    "Compare estimated copays between providers"
                ],
                estimatedTime: "3 min"
            },
            {
                stepNumber: 4,
                title: "Request Appointment Assistance",
                description: "Found the right provider? Click 'Schedule Appointment' and provide your availability. Our Health Assistants will call the provider's office, find an appointment time that works for you, and handle all the scheduling details.",
                tips: [
                    "Provide multiple time options for flexibility",
                    "Mention if you have urgent needs",
                    "You'll receive confirmation via email and SMS"
                ],
                estimatedTime: "1 min"
            }
        ]
    },
    {
        id: "3",
        title: "Understanding Your Benefits Summary",
        description: "Schedule a confidential deep-dive consultation to review your health plan, ask detailed questions, and understand your medical, dental, vision, FSA, HSA, and HRA benefits.",
        category: "Coverage",
        estimatedTime: "12 minutes",
        difficulty: "Intermediate",
        steps: [
            {
                stepNumber: 1,
                title: "Request a Benefits Consultation",
                description: "Navigate to the Benefits Consultation section and schedule a 30-minute deep-dive session with one of our benefits specialists. Choose a time that works best for you.",
                tips: [
                    "Sessions are available during business hours and some evenings",
                    "All consultations are completely confidential",
                    "Prepare questions in advance to make the most of your time"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 2,
                title: "Gather Your Plan Documents",
                description: "Before your consultation, locate your Summary of Benefits and Coverage (SBC), insurance card, and any enrollment materials. You don't need to read everything—your specialist will walk you through it.",
                tips: [
                    "Check your email for digital copies of plan documents",
                    "Have your insurance card handy for reference",
                    "List any medications you take regularly"
                ],
                estimatedTime: "3 min"
            },
            {
                stepNumber: 3,
                title: "Join Your Consultation",
                description: "At your scheduled time, click the video call link sent to your email. Your benefits specialist will review your coverage, explain key terms like deductibles and out-of-pocket maximums, and answer all your questions.",
                tips: [
                    "Use a quiet space with good internet connection",
                    "Take notes or ask for a summary to be emailed",
                    "Don't hesitate to ask for clarification on any terms"
                ],
                estimatedTime: "5 min"
            },
            {
                stepNumber: 4,
                title: "Review Key Coverage Areas",
                description: "Your specialist will cover medical, dental, and vision benefits, plus any voluntary benefits like FSA, HSA, or HRA. They'll explain what's covered, what you'll pay, and how to maximize your benefits.",
                tips: [
                    "Ask about preventive care (usually covered at 100%)",
                    "Understand your prescription drug coverage tiers",
                    "Learn about any wellness programs or incentives"
                ],
                estimatedTime: "15 min"
            },
            {
                stepNumber: 5,
                title: "Get Personalized Recommendations",
                description: "Based on your specific health needs and budget, your specialist will provide tailored advice on how to make the most of your coverage and where you might save money.",
                tips: [
                    "Ask for help estimating annual healthcare costs",
                    "Discuss strategies for meeting deductibles efficiently",
                    "Request follow-up support if needed"
                ],
                estimatedTime: "10 min"
            },
            {
                stepNumber: 6,
                title: "Access Your Resource Summary",
                description: "After your consultation, you'll receive a personalized summary document with key points discussed, important contact numbers, and next steps. Keep this handy for future reference.",
                tips: [
                    "Save the summary in an easily accessible place",
                    "Share relevant information with family members on your plan",
                    "Schedule annual review consultations to stay updated"
                ],
                estimatedTime: "2 min"
            }
        ]
    },
    {
        id: "4",
        title: "Getting Cost Transparency Before Procedures",
        description: "Learn your precise costs before any test or procedure. We provide clear side-by-side comparisons to help you find high-quality, low-cost options and avoid overpaying.",
        category: "Cost Savings",
        estimatedTime: "5 minutes",
        difficulty: "Beginner",
        steps: [
            {
                stepNumber: 1,
                title: "Get Your Procedure Details",
                description: "When your doctor recommends a test or procedure, ask for the specific name and any relevant codes (CPT codes). This information helps us provide accurate cost estimates.",
                tips: [
                    "Don't be shy about asking your doctor's office for codes",
                    "Get details about whether you need pre-authorization",
                    "Ask if there are alternative procedures to consider"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 2,
                title: "Submit a Cost Transparency Request",
                description: "Log into your TouchCare portal and use the Cost Transparency tool. Enter the procedure details, your preferred location, and submit the request. Our team will research pricing at different facilities.",
                tips: [
                    "Include your zip code for location-specific pricing",
                    "Mention any timing preferences (urgent vs. planned)",
                    "Indicate if you're willing to travel for savings"
                ],
                estimatedTime: "1 min"
            },
            {
                stepNumber: 3,
                title: "Review Your Cost Comparison",
                description: "Within 24-48 hours, you'll receive a detailed comparison showing costs at multiple facilities. We'll break down your estimated out-of-pocket costs based on your current deductible and insurance benefits.",
                tips: [
                    "Look at total cost, not just your portion",
                    "Consider facility quality ratings alongside price",
                    "Check if costs count toward your deductible"
                ],
                estimatedTime: "2 min"
            }
        ]
    },
    {
        id: "5",
        title: "RxCare: Saving Money on Prescriptions",
        description: "Understand your pharmaceutical benefits and discover the lowest-cost prescription options. We'll explore mail-order services, discount programs, and creative ways to save money.",
        category: "Prescriptions",
        estimatedTime: "7 minutes",
        difficulty: "Beginner",
        steps: [
            {
                stepNumber: 1,
                title: "Schedule an RxCare Consultation",
                description: "Book a free consultation with one of our pharmacy benefits specialists. They'll review your current medications and help identify savings opportunities.",
                tips: [
                    "Have a list of all your current medications ready",
                    "Include dosages and how often you refill",
                    "Mention any medications you've struggled to afford"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 2,
                title: "Explore All Your Options",
                description: "Your specialist will check pricing through your insurance, mail-order pharmacy, and discount programs like GoodRx. They'll explain the pros and cons of each option.",
                tips: [
                    "Ask about 90-day supplies for maintenance meds",
                    "Learn when discount cards beat insurance prices",
                    "Inquire about generic alternatives"
                ],
                estimatedTime: "3 min"
            },
            {
                stepNumber: 3,
                title: "Switch to Lower-Cost Options",
                description: "Once you've identified the best option, we'll help you transfer prescriptions to mail-order if needed, or show you how to use discount cards at your pharmacy.",
                tips: [
                    "We handle the transfer paperwork for you",
                    "Set up automatic refills for convenience",
                    "Save discount program information in your phone"
                ],
                estimatedTime: "1 min"
            },
            {
                stepNumber: 4,
                title: "Track Your Savings",
                description: "We'll follow up to ensure you're getting the expected savings. Your TouchCare dashboard will show how much you've saved on prescriptions over time.",
                tips: [
                    "Check your dashboard monthly to see savings",
                    "Contact us if pricing changes unexpectedly",
                    "Annual reviews help optimize as your needs change"
                ],
                estimatedTime: "1 min"
            }
        ]
    },
    {
        id: "6",
        title: "Open Enrollment: Making the Right Choice",
        description: "Get personalized support during open enrollment. We'll help you understand plan options, estimate costs, and select benefits that match your unique healthcare needs.",
        category: "Benefits Selection",
        estimatedTime: "15 minutes",
        difficulty: "Intermediate",
        steps: [
            {
                stepNumber: 1,
                title: "Review Your Current Usage",
                description: "Before open enrollment, look at your healthcare spending from the past year. How often did you visit doctors? What medications do you take? Did you meet your deductible?",
                tips: [
                    "Check your EOBs or claims history in your portal",
                    "List all regular medications and their costs",
                    "Consider any planned procedures for next year"
                ],
                estimatedTime: "5 min"
            },
            {
                stepNumber: 2,
                title: "Book Your Open Enrollment Consultation",
                description: "Schedule a dedicated session with a TouchCare benefits counselor. We offer extended hours during open enrollment season to accommodate everyone.",
                tips: [
                    "Book early—slots fill up during enrollment season",
                    "Allow 30-60 minutes for a thorough review",
                    "Bring your spouse/partner if they're on your plan"
                ],
                estimatedTime: "2 min"
            },
            {
                stepNumber: 3,
                title: "Compare Your Plan Options",
                description: "Your counselor will walk through each available plan option, explaining differences in premiums, deductibles, copays, and networks. We'll use your actual healthcare usage to model costs.",
                tips: [
                    "Don't just look at monthly premiums",
                    "Consider total estimated annual costs",
                    "Ask about HSA/FSA contribution limits and benefits"
                ],
                estimatedTime: "20 min"
            },
            {
                stepNumber: 4,
                title: "Evaluate Voluntary Benefits",
                description: "Beyond medical insurance, review options for dental, vision, life insurance, disability, and FSA/HSA accounts. Your counselor will help you understand what makes sense for your situation.",
                tips: [
                    "Dental and vision are often worth it if you use them",
                    "FSAs are use-it-or-lose-it; HSAs roll over",
                    "Consider life insurance needs based on dependents"
                ],
                estimatedTime: "10 min"
            },
            {
                stepNumber: 5,
                title: "Get a Personalized Recommendation",
                description: "Based on your health needs, budget, and preferences, your counselor will provide a clear recommendation. They'll explain their reasoning and help you feel confident in your choice.",
                tips: [
                    "Ask 'what if' questions about different scenarios",
                    "Request written summary of the recommendation",
                    "Understand what to do if your needs change mid-year"
                ],
                estimatedTime: "10 min"
            },
            {
                stepNumber: 6,
                title: "Make Your Elections",
                description: "With your counselor's guidance, complete your benefit elections through your employer's system. We can walk you through the enrollment process step-by-step if needed.",
                tips: [
                    "Double-check all selections before submitting",
                    "Save confirmation pages for your records",
                    "Note effective dates for new coverage"
                ],
                estimatedTime: "10 min"
            },
            {
                stepNumber: 7,
                title: "Schedule a Follow-Up",
                description: "Book a brief check-in for early in the new plan year to review how your new coverage is working and address any questions that come up.",
                tips: [
                    "Verify your new insurance cards arrived",
                    "Confirm your doctors are in-network",
                    "Set up any new FSA/HSA accounts"
                ],
                estimatedTime: "2 min"
            }
        ]
    }
];
