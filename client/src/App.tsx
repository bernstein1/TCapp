import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MemberLayout } from "@/components/MemberLayout";
import { PrintProvider } from "@/context/print-context";
import { AnimatePresence, motion } from "framer-motion";
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

// Page transition animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        {/* Authentication Routes */}
        <Route path="/login">
          {() => (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <LoginPage />
            </motion.div>
          )}
        </Route>
        <Route path="/verify">
          {() => (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <VerificationCodePage />
            </motion.div>
          )}
        </Route>
        <Route path="/create-account">
          {() => (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <CreateAccountPage />
            </motion.div>
          )}
        </Route>
        <Route path="/tutorial">
          {() => (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <TutorialPage />
            </motion.div>
          )}
        </Route>

        {/* Onboarding */}
        <Route path="/welcome">
          {() => (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <OnboardingWelcome
                onGetStarted={() => window.location.href = '/'}
              />
            </motion.div>
          )}
        </Route>

        {/* Main App Routes */}
        <Route path="/">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/cases">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CasesPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/cases/:id">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CaseDetailPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/documents">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DocumentsPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/wallet">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <WalletPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/schedule">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SchedulePage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/services">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ServicesPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/resources">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ResourcesPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/settings">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SettingsPage />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/calculators">
          {() => (
            <MemberLayout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CalculatorHub />
              </motion.div>
            </MemberLayout>
          )}
        </Route>
        <Route path="/calculators/hsa">
          {() => (
            <PrintProvider>
              <MemberLayout>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HSACalculator />
                </motion.div>
              </MemberLayout>
            </PrintProvider>
          )}
        </Route>
        <Route path="/calculators/fsa">
          {() => (
            <PrintProvider>
              <MemberLayout>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <FSACalculator />
                </motion.div>
              </MemberLayout>
            </PrintProvider>
          )}
        </Route>
        <Route path="/calculators/commuter">
          {() => (
            <PrintProvider>
              <MemberLayout>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <CommuterCalculator />
                </motion.div>
              </MemberLayout>
            </PrintProvider>
          )}
        </Route>
        <Route path="/calculators/life-insurance">
          {() => (
            <PrintProvider>
              <MemberLayout>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <LifeInsuranceCalculator />
                </motion.div>
              </MemberLayout>
            </PrintProvider>
          )}
        </Route>
        <Route>
          {() => (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <NotFound />
            </motion.div>
          )}
        </Route>
      </Switch>
    </AnimatePresence>
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
