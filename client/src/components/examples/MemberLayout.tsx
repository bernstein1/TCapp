import { MemberLayout } from "../MemberLayout";
import { ThemeProvider } from "../ThemeProvider";

export default function MemberLayoutExample() {
  return (
    <ThemeProvider>
      <MemberLayout>
        <div className="p-8">
          <h2 className="font-display font-bold text-2xl mb-4">Page Content</h2>
          <p className="text-muted-foreground mb-4">
            This is where your page content would appear. The layout includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Desktop sidebar navigation (visible on large screens)</li>
            <li>Mobile bottom navigation (visible on small screens)</li>
            <li>Responsive header with logo and theme toggle</li>
            <li>User profile section in sidebar</li>
          </ul>
        </div>
      </MemberLayout>
    </ThemeProvider>
  );
}
