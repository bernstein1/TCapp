import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type TutorialStep = {
  title: string;
  description: string;
  details: string[];
  route: string;
  highlightArea?: "left" | "right" | "center" | "top" | "bottom" | "full";
};

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome!",
    description: "Your complete health benefits platform in one place. Let's take a comprehensive tour to help you get the most out of every feature.",
    details: [
      "This tutorial will guide you through all major sections",
      "You can skip at any time or go back to previous steps",
      "The tour takes about 2-3 minutes to complete"
    ],
    route: "/",
    highlightArea: "full",
  },
  {
    title: "Your Dashboard - Command Center",
    description: "Everything you need at a glance. Your dashboard is designed to give you quick access to the most important information.",
    details: [
      "View upcoming appointments and reschedule with one click",
      "Track active support cases and see unread messages",
      "Complete your profile with guided tasks",
      "Use Quick Actions to jump directly to key features",
      "Stay updated with real-time notifications"
    ],
    route: "/",
    highlightArea: "center",
  },
  {
    title: "Quick Actions - Fast Access",
    description: "Four essential shortcuts to streamline your experience.",
    details: [
      "View ID Card - Access your insurance cards instantly",
      "Schedule - Book appointments with health advocates",
      "Documents - Jump to your document library",
      "Message Us - Start a conversation with support anytime"
    ],
    route: "/",
    highlightArea: "right",
  },
  {
    title: "Cases - Your Direct Line to Support",
    description: "Get personalized help from our support team through secure, real-time messaging.",
    details: [
      "Click 'New Case' to start a conversation on any topic",
      "Track all your cases in one organized view",
      "Filter by status: Open, In Progress, Waiting on You, or Resolved",
      "Get notifications when agents respond to your messages",
      "Each case has a dedicated chat interface for easy communication"
    ],
    route: "/cases",
    highlightArea: "center",
  },
  {
    title: "Case Management Features",
    description: "Powerful tools to manage your support conversations effectively.",
    details: [
      "Search through all your cases instantly",
      "See unread message counts at a glance",
      "View case history and previous conversations",
      "Attach documents or images to your messages",
      "Rate your support experience after resolution"
    ],
    route: "/cases",
    highlightArea: "top",
  },
  {
    title: "Documents - Your Digital File Cabinet",
    description: "Store, organize, and access all your important health documents in one secure location.",
    details: [
      "Upload insurance cards, EOBs, claims, and more",
      "Drag and drop files or browse to upload",
      "View documents with our built-in preview feature",
      "Pin important documents for quick access",
      "Search across all documents instantly",
      "Download or share documents securely"
    ],
    route: "/documents",
    highlightArea: "center",
  },
  {
    title: "Document AI Assistant",
    description: "Ask questions about your documents and get instant answers powered by AI.",
    details: [
      "Click the chat icon in the bottom right corner",
      "Ask about coverage, deductibles, or claim status",
      "Get explanations of medical billing terms",
      "Find specific information across all your documents",
      "Available 24/7 to help you understand your benefits"
    ],
    route: "/documents",
    highlightArea: "bottom",
  },
  {
    title: "Digital Wallet - Cards Always Ready",
    description: "Your insurance information, available instantly whenever you need it.",
    details: [
      "Access medical and dental insurance cards",
      "View member ID, group number, and plan details",
      "Display cards at doctor's offices or pharmacies",
      "No need to carry physical cards anymore",
      "Add dependents' cards for family members"
    ],
    route: "/wallet",
    highlightArea: "center",
  },
  {
    title: "Schedule - Appointment Management",
    description: "Book, manage, and track all your health-related appointments in one place.",
    details: [
      "Schedule consultations with benefits specialists",
      "Choose between phone or video appointments",
      "View upcoming appointments with countdown timers",
      "Reschedule or cancel with easy one-click actions",
      "Receive reminders before your appointments",
      "Join video calls directly from the platform"
    ],
    route: "/schedule",
    highlightArea: "center",
  },
  {
    title: "Services - Discover Your Benefits",
    description: "Explore partner services and additional benefits included in your plan.",
    details: [
      "Access telehealth services with 24/7 availability",
      "Connect with mental health professionals",
      "Explore wellness programs and fitness benefits",
      "Find pharmacy services and prescription support",
      "View partner discounts and special offers",
      "Contact services directly via call or message"
    ],
    route: "/services",
    highlightArea: "center",
  },
  {
    title: "Calculators - Plan Your Benefits",
    description: "Interactive financial planning tools to maximize your pre-tax benefits and insurance coverage.",
    details: [
      "HSA Strategy Planner - Optimize your Health Savings Account",
      "FSA Election Forecaster - Plan your Flexible Spending",
      "Commuter Benefits Calculator - Pre-tax transit savings",
      "Life Insurance Calculator - Assess your coverage needs",
      "All calculators include 2025 IRS limits and PDF exports",
      "Get personalized recommendations based on your situation"
    ],
    route: "/calculators",
    highlightArea: "center",
  },
  {
    title: "Resources - Stay Informed & Learn",
    description: "Educational content, news, and events to help you maximize your benefits.",
    details: [
      "Read important announcements and policy updates",
      "Access educational blog articles on health topics",
      "Register for upcoming webinars and workshops",
      "Learn about coverage, claims, and benefits",
      "Stay current with healthcare industry news",
      "Get expert tips from healthcare professionals"
    ],
    route: "/resources",
    highlightArea: "center",
  },
  {
    title: "Settings - Personalize Your Experience",
    description: "Customize your account, notifications, and preferences.",
    details: [
      "Update your contact information and profile",
      "Manage notification preferences",
      "Add or edit dependent information",
      "Review your plan details and coverage",
      "Adjust privacy and security settings",
      "Switch between light and dark themes"
    ],
    route: "/settings",
    highlightArea: "left",
  },
  {
    title: "You're All Set!",
    description: "Congratulations! You now know how to navigate TouchCare like a pro. Here's what to do next:",
    details: [
      "Start by completing your profile tasks on the dashboard",
      "Upload your insurance cards to your digital wallet",
      "Explore the Resources section for helpful articles",
      "Create a case anytime you have questions",
      "Check your notifications regularly for updates",
      "Remember: We're here to help 24/7!"
    ],
    route: "/",
    highlightArea: "full",
  },
];

type OnboardingTutorialOverlayProps = {
  onComplete: () => void;
  onRouteChange?: (route: string) => void;
};

export function OnboardingTutorialOverlay({ onComplete, onRouteChange }: OnboardingTutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  // Notify parent when route changes for tutorial step
  useEffect(() => {
    if (onRouteChange && step.route) {
      onRouteChange(step.route);
    }
  }, [currentStep, step.route, onRouteChange]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  // Position the card based on highlight area
  const getCardPosition = () => {
    switch (step.highlightArea) {
      case "left":
        return "items-center justify-start sm:justify-start pl-4";
      case "right":
        return "items-center justify-end sm:justify-end pr-4";
      case "top":
        return "items-start justify-center pt-20";
      case "bottom":
        return "items-end justify-center pb-4";
      case "full":
        return "items-center justify-center";
      default:
        return "items-center justify-center";
    }
  };

  // Get radial gradient spotlight position for hybrid overlay
  const getSpotlightGradient = () => {
    if (step.highlightArea === "full") {
      return "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.50) 100%)";
    }

    switch (step.highlightArea) {
      case "left":
        return "radial-gradient(ellipse 40% 50% at 15% 50%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.20) 30%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.65) 100%)";
      case "right":
        return "radial-gradient(ellipse 45% 50% at 85% 50%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.20) 30%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.65) 100%)";
      case "top":
        return "radial-gradient(ellipse 50% 40% at 50% 25%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.20) 30%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.65) 100%)";
      case "bottom":
        return "radial-gradient(ellipse 50% 40% at 50% 75%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.20) 30%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.65) 100%)";
      case "center":
        return "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.25) 35%, rgba(0, 0, 0, 0.55) 75%, rgba(0, 0, 0, 0.65) 100%)";
      default:
        return "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.50) 100%)";
    }
  };

  const spotlightGradient = getSpotlightGradient();

  return (
    <>
      {/* Hybrid gradient overlay with dynamic spotlight */}
      <div
        className="fixed inset-0 z-50 pointer-events-none transition-all duration-700 ease-in-out"
        data-testid="tutorial-overlay"
        style={{
          background: spotlightGradient,
        }}
      />

      {/* Tutorial Card with enhanced visibility */}
      <div className={cn("fixed inset-0 z-50 flex p-4 pointer-events-none", getCardPosition())}>
        <Card className="w-full max-w-2xl pointer-events-auto animate-in slide-in-from-bottom-4 duration-300 shadow-[0_20px_70px_rgba(0,0,0,0.3)] border-2 bg-background/98 backdrop-blur-md ring-1 ring-primary/10">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display font-bold text-2xl mb-1" data-testid="tutorial-title">
                      {step.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Step {currentStep + 1} of {tutorialSteps.length}
                      </Badge>
                      <Progress value={progress} className="h-1.5 flex-1 max-w-32" data-testid="tutorial-progress" />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="shrink-0"
                data-testid="button-skip"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <p className="text-muted-foreground leading-relaxed text-base" data-testid="tutorial-description">
                {step.description}
              </p>

              <Separator />

              {/* Feature Details */}
              <div className="space-y-2">
                {step.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={isFirstStep}
                data-testid="button-previous"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {!isLastStep && (
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    data-testid="button-skip-all"
                  >
                    Skip Tour
                  </Button>
                )}
                <Button onClick={handleNext} data-testid="button-next" className="min-w-32">
                  {isLastStep ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
