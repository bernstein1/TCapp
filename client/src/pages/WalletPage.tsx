import { WalletCard, type InsuranceCard } from "@/components/WalletCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Heart, Pill } from "lucide-react";

export default function WalletPage() {
  //todo: remove mock functionality
  const medicalCard: InsuranceCard = {
    memberName: "John Doe",
    memberId: "ABC123456789",
    groupNumber: "GRP-98765",
    planName: "Premium Health Plan",
    effectiveDate: "01/01/2024",
    rxBin: "610020",
    rxPcn: "TOUCHCARE",
    customerServicePhone: "1-800-CARE-NOW",
    claimsAddress: "TouchCare Claims, PO Box 12345, New York, NY 10001",
  };

  const dentalCard: InsuranceCard = {
    memberName: "John Doe",
    memberId: "DEN987654321",
    groupNumber: "GRP-98765",
    planName: "Dental Plus",
    effectiveDate: "01/01/2024",
    customerServicePhone: "1-800-DENTAL",
    claimsAddress: "TouchCare Dental, PO Box 54321, New York, NY 10002",
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-wallet-title">
            Wallet
          </h1>
          <p className="text-muted-foreground">
            Your digital health insurance cards and important information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="medical" className="w-full">
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="medical" className="flex-1" data-testid="tab-medical">
                  <Heart className="mr-2 h-4 w-4" />
                  Medical
                </TabsTrigger>
                <TabsTrigger value="dental" className="flex-1" data-testid="tab-dental">
                  <Pill className="mr-2 h-4 w-4" />
                  Dental
                </TabsTrigger>
              </TabsList>

              <TabsContent value="medical">
                <WalletCard
                  card={medicalCard}
                  onShare={() => console.log('Share medical card')}
                  onDownload={() => console.log('Download medical card')}
                />
              </TabsContent>

              <TabsContent value="dental">
                <WalletCard
                  card={dentalCard}
                  onShare={() => console.log('Share dental card')}
                  onDownload={() => console.log('Download dental card')}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Full Name</div>
                    <div className="font-medium">John Doe</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Date of Birth</div>
                    <div className="font-medium">January 15, 1985</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <div className="font-medium">john.doe@example.com</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phone</div>
                    <div className="font-medium">(555) 123-4567</div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  data-testid="button-edit-profile"
                >
                  Edit Information
                </Button>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg">Dependents</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    data-testid="button-add-dependent"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div>
                      <div className="font-medium">Jane Doe</div>
                      <div className="text-sm text-muted-foreground">Spouse</div>
                    </div>
                    <Button size="sm" variant="ghost" data-testid="button-view-dependent-1">
                      View
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div>
                      <div className="font-medium">Emily Doe</div>
                      <div className="text-sm text-muted-foreground">Child</div>
                    </div>
                    <Button size="sm" variant="ghost" data-testid="button-view-dependent-2">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-4">Emergency Contacts</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-sm text-muted-foreground">(555) 987-6543</div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  data-testid="button-manage-contacts"
                >
                  Manage Contacts
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
