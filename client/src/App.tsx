import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MemberLayout } from "@/components/MemberLayout";
import OnboardingWelcome from "@/pages/OnboardingWelcome";
import Dashboard from "@/pages/Dashboard";
import CasesPage from "@/pages/CasesPage";
import DocumentsPage from "@/pages/DocumentsPage";
import WalletPage from "@/pages/WalletPage";
import SchedulePage from "@/pages/SchedulePage";
import ServicesPage from "@/pages/ServicesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/welcome">
        {() => (
          <OnboardingWelcome 
            onGetStarted={() => window.location.href = '/'}
          />
        )}
      </Route>
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
      <Route path="/settings">
        {() => (
          <MemberLayout>
            <SettingsPage />
          </MemberLayout>
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
