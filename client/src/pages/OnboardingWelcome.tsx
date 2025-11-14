import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import welcomeImage from "@assets/generated_images/Onboarding_welcome_hero_image_545a335b.png";

type OnboardingWelcomeProps = {
  onGetStarted: () => void;
};

export default function OnboardingWelcome({ onGetStarted }: OnboardingWelcomeProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-xl w-full">
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-primary">TouchCare</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your personalized health benefits partner. Get instant access to your insurance information, 
            connect with expert consultants, and manage your healthcare with confidence.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Instant Access</h3>
                <p className="text-sm text-muted-foreground">
                  View your insurance cards, documents, and claims anytime, anywhere
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Expert Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with benefits experts who understand your needs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Personalized Care</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored recommendations and support for you and your family
                </p>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={onGetStarted}
            data-testid="button-get-started"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-xs text-muted-foreground mt-6">
            <a href="https://touchcare.com/privacy" className="hover:text-primary transition-colors">
              touchcare.com/privacy
            </a>
          </p>
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-primary/5 to-secondary/5 min-h-[400px] lg:min-h-0">
        <img 
          src={welcomeImage} 
          alt="Welcome to TouchCare"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
