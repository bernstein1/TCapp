import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function VerificationCodePage() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Get the method from URL params (in a real app, this would come from router)
  const method = "email"; // Default to email for demo
  const contactInfo = method === "email" ? "your.email@example.com" : "(555) 123-4567";

  const handleVerify = () => {
    if (code.length !== 6) return;

    setIsVerifying(true);

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      // Navigate to dashboard
      setLocation("/");
    }, 1500);
  };

  const handleResend = () => {
    setCode("");
    // Simulate resending code
  };

  useEffect(() => {
    if (code.length === 6) {
      handleVerify();
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md">
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
          <h1 className="font-display font-bold text-3xl mb-2">Enter Verification Code</h1>
          <p className="text-muted-foreground">
            We sent a 6-digit code to<br />
            <span className="font-medium text-foreground">{contactInfo}</span>
          </p>
        </div>

        {/* Verification Card */}
        <Card className="p-6">
          <div className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                disabled={isVerifying}
                data-testid="input-otp"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Status Message */}
            {isVerifying && (
              <p className="text-sm text-center text-muted-foreground">
                Verifying your code...
              </p>
            )}

            {/* Verify Button */}
            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={code.length !== 6 || isVerifying}
              data-testid="button-verify"
            >
              {isVerifying ? "Verifying..." : "Verify and Continue"}
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              <Button
                variant="link"
                onClick={handleResend}
                disabled={isVerifying}
                data-testid="button-resend"
              >
                Resend Code
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>The verification code expires in 10 minutes</p>
        </div>
      </div>
    </div>
  );
}
