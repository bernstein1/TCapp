import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Building2 } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const handleEmailLogin = () => {
    if (!emailInput.trim()) return;
    // Navigate to verification code page
    setLocation("/verify?method=email");
  };

  const handlePhoneLogin = () => {
    if (!phoneInput.trim()) return;
    // Navigate to verification code page
    setLocation("/verify?method=phone");
  };

  const handleSSOLogin = () => {
    // Simulate SSO login
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md">
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
          <h1 className="font-display font-bold text-3xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your health benefits
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="email" data-testid="tab-email">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" data-testid="tab-phone">
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="sso" data-testid="tab-sso">
                <Building2 className="h-4 w-4 mr-2" />
                SSO
              </TabsTrigger>
            </TabsList>

            {/* Email Login */}
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleEmailLogin();
                  }}
                  data-testid="input-email"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                We'll send a verification code to your email
              </p>
              <Button
                className="w-full"
                onClick={handleEmailLogin}
                disabled={!emailInput.trim()}
                data-testid="button-email-login"
              >
                Continue with Email
              </Button>
            </TabsContent>

            {/* Phone Login */}
            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handlePhoneLogin();
                  }}
                  data-testid="input-phone"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                We'll send a verification code via SMS
              </p>
              <Button
                className="w-full"
                onClick={handlePhoneLogin}
                disabled={!phoneInput.trim()}
                data-testid="button-phone-login"
              >
                Continue with Phone
              </Button>
            </TabsContent>

            {/* SSO Login */}
            <TabsContent value="sso" className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-6">
                  Sign in with your organization's single sign-on
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSSOLogin}
                  data-testid="button-sso-login"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Sign in with SSO
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Enterprise Login
                  </span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Contact your HR department if you need SSO credentials
              </p>
            </TabsContent>
          </Tabs>

          {/* Create Account Link */}
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an account?
            </p>
            <Button
              variant="link"
              onClick={() => setLocation("/create-account")}
              data-testid="button-create-account"
            >
              Create Account
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          <p className="mt-2">© 2024 All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
