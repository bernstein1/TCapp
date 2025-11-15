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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-sidebar">
        <div className="flex items-center gap-3 p-6 border-b">
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

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/" 
              ? location === "/" 
              : location.startsWith(item.href);
            
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover-elevate cursor-pointer",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  )}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b bg-background">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="p-6 border-b">
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
              </SheetHeader>
              <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href === "/"
                    ? location === "/"
                    : location.startsWith(item.href);

                  return (
                    <Link key={item.name} href={item.href}>
                      <div
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </div>
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
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="flex items-center justify-around px-2 py-2">
            {navigation.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/" 
                ? location === "/" 
                : location.startsWith(item.href);
              
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors min-w-[60px] cursor-pointer",
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )}
                    data-testid={`nav-mobile-${item.name.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
