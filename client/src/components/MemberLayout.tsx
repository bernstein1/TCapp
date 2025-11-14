import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  CreditCard,
  Settings,
  Calendar,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cases", href: "/cases", icon: MessageCircle },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Wallet", href: "/wallet", icon: CreditCard },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Settings", href: "/settings", icon: Settings },
];

type MemberLayoutProps = {
  children: React.ReactNode;
};

export function MemberLayout({ children }: MemberLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-sidebar">
        <div className="flex items-center gap-3 p-6 border-b">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">T</span>
          </div>
          <h1 className="font-display font-bold text-xl">TouchCare</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/" 
              ? location === "/" 
              : location.startsWith(item.href);
            
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover-elevate",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  )}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </a>
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
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">T</span>
            </div>
            <h1 className="font-display font-bold text-xl">TouchCare</h1>
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
                  <a
                    className={cn(
                      "flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors min-w-[60px]",
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )}
                    data-testid={`nav-mobile-${item.name.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </a>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
