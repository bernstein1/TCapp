import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

export default function CreateAccountPage() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    memberId: "",
    dateOfBirth: "",
    agreeToTerms: false,
  });

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.memberId.trim() &&
      formData.dateOfBirth.trim() &&
      formData.agreeToTerms
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    // Simulate account creation and navigate to tutorial
    setLocation("/tutorial");
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/login")}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex mb-6">
            <img
              src="/assets/logos/TC-logo-horizontal-blue.png"
              alt="TouchCare"
              className="h-12 w-auto dark:hidden"
            />
            <img
              src="/assets/logos/TouchCare_HorizontalLogo-White-RGB (1).png"
              alt="TouchCare"
              className="h-12 w-auto hidden dark:block"
            />
          </div>
          <h1 className="font-display font-bold text-3xl mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join us to access your health benefits
          </p>
        </div>

        {/* Create Account Card */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="John"
                    data-testid="input-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Doe"
                    data-testid="input-last-name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="your.email@example.com"
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    data-testid="input-phone"
                  />
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Insurance Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="memberId">Member ID *</Label>
                  <Input
                    id="memberId"
                    value={formData.memberId}
                    onChange={(e) => updateFormData("memberId", e.target.value)}
                    placeholder="ABC123456789"
                    data-testid="input-member-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    data-testid="input-dob"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                We use this information to verify your insurance coverage
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  updateFormData("agreeToTerms", checked === true)
                }
                data-testid="checkbox-terms"
              />
              <div className="flex-1">
                <Label
                  htmlFor="terms"
                  className="text-sm cursor-pointer"
                >
                  I agree to the{" "}
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Privacy Policy
                  </Button>
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid()}
              data-testid="button-create-account"
            >
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Already have an account?
            </p>
            <Button
              variant="link"
              onClick={() => setLocation("/login")}
              data-testid="button-sign-in"
            >
              Sign In
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Your information is secure and protected with industry-standard encryption</p>
        </div>
      </div>
    </div>
  );
}
