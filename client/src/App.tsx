import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MemberLayout } from "@/components/MemberLayout";
import { PrintProvider } from "@/context/print-context";
import OnboardingWelcome from "@/pages/OnboardingWelcome";
import Dashboard from "@/pages/Dashboard";
import CasesPage from "@/pages/CasesPage";
import CaseDetailPage from "@/pages/CaseDetailPage";
import DocumentsPage from "@/pages/DocumentsPage";
import WalletPage from "@/pages/WalletPage";
import SchedulePage from "@/pages/SchedulePage";
import ServicesPage from "@/pages/ServicesPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import VerificationCodePage from "@/pages/VerificationCodePage";
import CreateAccountPage from "@/pages/CreateAccountPage";
import TutorialPage from "@/pages/TutorialPage";
import CalculatorHub from "@/pages/CalculatorHub";
import HSACalculator from "@/pages/HSACalculator";
import FSACalculator from "@/pages/FSACalculator";
import CommuterCalculator from "@/pages/CommuterCalculator";
import LifeInsuranceCalculator from "@/pages/LifeInsuranceCalculator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Authentication Routes */}
      <Route path="/login" component={LoginPage} />
      <Route path="/verify" component={VerificationCodePage} />
      <Route path="/create-account" component={CreateAccountPage} />
      <Route path="/tutorial" component={TutorialPage} />

      {/* Onboarding */}
      <Route path="/welcome">
        {() => (
          <OnboardingWelcome
            onGetStarted={() => window.location.href = '/'}
          />
        )}
      </Route>

      {/* Main App Routes */}
      <Route path="/">
        {() => (
          <MemberLayout>
            <Dashboard />
          </MemberLayout>
        )}
      </Route>
      <Route path="/cases">
        {() => (
          <MemberLayout>
            <CasesPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/cases/:id">
        {() => (
          <MemberLayout>
            <CaseDetailPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/documents">
        {() => (
          <MemberLayout>
            <DocumentsPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/wallet">
        {() => (
          <MemberLayout>
            <WalletPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/schedule">
        {() => (
          <MemberLayout>
            <SchedulePage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/services">
        {() => (
          <MemberLayout>
            <ServicesPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/resources">
        {() => (
          <MemberLayout>
            <ResourcesPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/settings">
        {() => (
          <MemberLayout>
            <SettingsPage />
          </MemberLayout>
        )}
      </Route>
      <Route path="/calculators">
        {() => (
          <MemberLayout>
            <CalculatorHub />
          </MemberLayout>
        )}
      </Route>
      <Route path="/calculators/hsa">
        {() => (
          <PrintProvider>
            <MemberLayout>
              <HSACalculator />
            </MemberLayout>
          </PrintProvider>
        )}
      </Route>
      <Route path="/calculators/fsa">
        {() => (
          <PrintProvider>
            <MemberLayout>
              <FSACalculator />
            </MemberLayout>
          </PrintProvider>
        )}
      </Route>
      <Route path="/calculators/commuter">
        {() => (
          <PrintProvider>
            <MemberLayout>
              <CommuterCalculator />
            </MemberLayout>
          </PrintProvider>
        )}
      </Route>
      <Route path="/calculators/life-insurance">
        {() => (
          <PrintProvider>
            <MemberLayout>
              <LifeInsuranceCalculator />
            </MemberLayout>
          </PrintProvider>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
