import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  CreditCard,
  Settings,
  Calendar,
  Briefcase,
  BookOpen,
  Calculator,
  Menu,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NewCaseModal } from "@/components/NewCaseModal";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cases", href: "/cases", icon: MessageCircle },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Wallet", href: "/wallet", icon: CreditCard },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Calculators", href: "/calculators", icon: Calculator },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

type MemberLayoutProps = {
  children: React.ReactNode;
};

export function MemberLayout({ children }: MemberLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r glass-sidebar" aria-label="Main navigation">
          <div className="p-6 border-b space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logos/TC-logo-horizontal-blue.png"
                alt="TouchCare"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/assets/logos/TouchCare_HorizontalLogo-White-RGB (1).png"
                alt="TouchCare"
                className="h-8 w-auto hidden dark:block"
              />
            </div>
            <Button
              className="max-w-xs mx-auto"
              onClick={() => setShowNewCaseModal(true)}
              data-testid="button-get-help-now-desktop"
            >
              <Zap className="mr-2 h-4 w-4" />
              Get Help
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1" aria-label="Primary">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/"
                ? location === "/"
                : location.startsWith(item.href);

              return (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover-elevate cursor-pointer no-underline",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                    )}
                    data-testid={`nav-${item.name.toLowerCase()}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t flex justify-center">
            <div className="flex items-center gap-3 p-3">
              <Link href="/settings">
                <a className="flex items-center gap-3 w-full p-2 rounded-md hover-elevate no-underline" aria-label="John Doe profile settings">
                  <Avatar className="h-10 w-10" aria-hidden="true">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                  </div>
                </a>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 border-b glass-header">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav-sheet"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0" id="mobile-nav-sheet">
                <SheetHeader className="p-6 border-b space-y-3">
                  <SheetTitle className="text-left">
                    <img
                      src="/assets/logos/TC-logo-horizontal-blue.png"
                      alt="TouchCare"
                      className="h-8 w-auto dark:hidden"
                    />
                    <img
                      src="/assets/logos/TouchCare_HorizontalLogo-White-RGB (1).png"
                      alt="TouchCare"
                      className="h-8 w-auto hidden dark:block"
                    />
                  </SheetTitle>
                  <Button
                    className="max-w-xs mx-auto"
                    onClick={() => {
                      setShowNewCaseModal(true);
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-get-help-now-mobile"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Get Help
                  </Button>
                </SheetHeader>
                <nav className="p-4 space-y-1" aria-label="Mobile primary">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === "/"
                      ? location === "/"
                      : location.startsWith(item.href);

                    return (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer no-underline",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                          <span>{item.name}</span>
                        </a>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3">
              <img
                src="/assets/logos/TC-logo-horizontal-blue.png"
                alt="TouchCare"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/assets/logos/TouchCare_HorizontalLogo-White-RGB (1).png"
                alt="TouchCare"
                className="h-8 w-auto hidden dark:block"
              />
            </div>
            <ThemeToggle />
          </header>

          {/* Page Content */}
          <main id="main-content" className="flex-1 overflow-y-auto pb-20 lg:pb-0">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-mobile-nav border-t" aria-label="Mobile bottom navigation">
            <div className="flex items-center justify-around px-2 py-2">
              {navigation.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/"
                  ? location === "/"
                  : location.startsWith(item.href);

                return (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={cn(
                        "flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors min-w-[60px] cursor-pointer no-underline",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      data-testid={`nav-mobile-${item.name.toLowerCase()}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs font-medium">{item.name}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        <NewCaseModal open={showNewCaseModal} onClose={() => setShowNewCaseModal(false)} />
      </div>
    </>
  );
}
