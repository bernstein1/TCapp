import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Shield, 
  Bell, 
  Moon, 
  Globe,
  UserPlus,
  LogOut
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-settings-title">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5" />
                <h2 className="font-display font-bold text-xl">Profile</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" data-testid="input-first-name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" data-testid="input-last-name" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" data-testid="input-email" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" data-testid="input-phone" />
                </div>

                <Button data-testid="button-save-profile">Save Changes</Button>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5" />
                <h2 className="font-display font-bold text-xl">Security</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch data-testid="switch-2fa" />
                </div>

                <Separator />

                <Button variant="outline" data-testid="button-change-password">
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-5 w-5" />
                <h2 className="font-display font-bold text-xl">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-email-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive text message alerts
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-sms-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Case Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when agents respond
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-case-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Appointment Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Reminders before scheduled consultations
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-appointment-notifications" />
                </div>
              </div>
            </div>
          </Card>

          {/* Appearance */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="h-5 w-5" />
                <h2 className="font-display font-bold text-xl">Appearance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch data-testid="switch-dark-mode" />
                </div>
              </div>
            </div>
          </Card>

          {/* Language & Region */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5" />
                <h2 className="font-display font-bold text-xl">Language & Region</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English (US)" data-testid="input-language" />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="Eastern Time (ET)" data-testid="input-timezone" />
                </div>
              </div>
            </div>
          </Card>

          {/* Dependents */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserPlus className="h-5 w-5" />
                <h2 className="font-display font-bold text-xl">Dependents</h2>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">Spouse</p>
                  </div>
                  <Button size="sm" variant="ghost" data-testid="button-edit-dependent-1">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                  <div>
                    <p className="font-medium">Emily Doe</p>
                    <p className="text-sm text-muted-foreground">Child</p>
                  </div>
                  <Button size="sm" variant="ghost" data-testid="button-edit-dependent-2">
                    Edit
                  </Button>
                </div>
              </div>

              <Button variant="outline" data-testid="button-add-dependent-settings">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Dependent
              </Button>
            </div>
          </Card>

          {/* Account Actions */}
          <Card>
            <div className="p-6">
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:bg-destructive/10"
                  data-testid="button-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
