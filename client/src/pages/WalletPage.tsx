import { WalletCard, type InsuranceCard } from "@/components/WalletCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Heart, Pill, CreditCard, Eye, Wallet, QrCode, Smartphone, Building2 } from "lucide-react";
import { useState } from "react";

export default function WalletPage() {
  const [selectedMember, setSelectedMember] = useState<"primary" | "spouse" | "child">("primary");

  const handleShare = (cardType: string) => {
    // In a real app, this would use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: `${cardType} Insurance Card`,
        text: 'My TouchCare insurance card',
      }).catch(() => {});
    } else {
      alert(`Sharing ${cardType} card...`);
    }
  };

  const handleDownload = (cardType: string) => {
    // In a real app, this would generate a PDF or image
    alert(`Downloading ${cardType} card as PDF...`);
  };

  const handleAddToWallet = (walletType: "apple" | "google") => {
    // In a real app, this would use Apple Wallet or Google Pay APIs
    alert(`Adding cards to ${walletType === "apple" ? "Apple Wallet" : "Google Pay"}...`);
  };

  const handlePrintAll = () => {
    // In a real app, this would open a print dialog
    window.print();
  };

  const handleProviderDirectory = () => {
    // In a real app, this would navigate to provider directory
    alert("Opening provider directory...");
  };

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

  const visionCard: InsuranceCard = {
    memberName: "John Doe",
    memberId: "VIS456789123",
    groupNumber: "GRP-98765",
    planName: "Vision Care Plus",
    effectiveDate: "01/01/2024",
    customerServicePhone: "1-800-VISION",
    claimsAddress: "TouchCare Vision, PO Box 67890, New York, NY 10003",
  };

  const fsaCard: InsuranceCard = {
    memberName: "John Doe",
    memberId: "FSA789456123",
    groupNumber: "GRP-98765",
    planName: "Flexible Spending Account",
    effectiveDate: "01/01/2024",
    customerServicePhone: "1-800-FSA-HELP",
    claimsAddress: "TouchCare FSA, PO Box 11111, New York, NY 10004",
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display font-bold text-3xl" data-testid="text-wallet-title">
              <Wallet className="inline-block mr-3 h-8 w-8 mb-1" />
              Digital Wallet
            </h1>
            <Badge variant="secondary" className="text-sm">
              <CreditCard className="mr-1 h-3 w-3" />
              4 Cards
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Your digital health insurance cards and important information - always with you
          </p>
        </div>

        {/* Member Selector */}
        <div className="mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Viewing cards for:</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedMember === "primary" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember("primary")}
              >
                John Doe (You)
              </Button>
              <Button
                variant={selectedMember === "spouse" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember("spouse")}
              >
                Jane Doe (Spouse)
              </Button>
              <Button
                variant={selectedMember === "child" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember("child")}
              >
                Emily Doe (Child)
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Insurance Cards */}
            <Tabs defaultValue="medical" className="w-full">
              <TabsList className="mb-6 w-full grid grid-cols-4">
                <TabsTrigger value="medical" className="flex-1" data-testid="tab-medical">
                  <Heart className="mr-2 h-4 w-4" />
                  Medical
                </TabsTrigger>
                <TabsTrigger value="dental" className="flex-1" data-testid="tab-dental">
                  <Pill className="mr-2 h-4 w-4" />
                  Dental
                </TabsTrigger>
                <TabsTrigger value="vision" className="flex-1" data-testid="tab-vision">
                  <Eye className="mr-2 h-4 w-4" />
                  Vision
                </TabsTrigger>
                <TabsTrigger value="fsa" className="flex-1" data-testid="tab-fsa">
                  <CreditCard className="mr-2 h-4 w-4" />
                  FSA
                </TabsTrigger>
              </TabsList>

              <TabsContent value="medical">
                <WalletCard
                  card={medicalCard}
                  onShare={() => handleShare("Medical")}
                  onDownload={() => handleDownload("Medical")}
                />
              </TabsContent>

              <TabsContent value="dental">
                <WalletCard
                  card={dentalCard}
                  onShare={() => handleShare("Dental")}
                  onDownload={() => handleDownload("Dental")}
                />
              </TabsContent>

              <TabsContent value="vision">
                <WalletCard
                  card={visionCard}
                  onShare={() => handleShare("Vision")}
                  onDownload={() => handleDownload("Vision")}
                />
              </TabsContent>

              <TabsContent value="fsa">
                <WalletCard
                  card={fsaCard}
                  onShare={() => handleShare("FSA")}
                  onDownload={() => handleDownload("FSA")}
                />
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={() => handleAddToWallet("apple")}
                  >
                    <QrCode className="h-6 w-6" />
                    <span className="text-sm">Add to Apple Wallet</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={() => handleAddToWallet("google")}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-sm">Add to Google Pay</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={handlePrintAll}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm">Print All Cards</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={handleProviderDirectory}
                  >
                    <Building2 className="h-6 w-6" />
                    <span className="text-sm">Provider Directory</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Coverage Summary */}
            <Card>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-4">Coverage Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Medical Insurance</div>
                        <div className="text-xs text-muted-foreground">Premium Health Plan</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Pill className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Dental Insurance</div>
                        <div className="text-xs text-muted-foreground">Dental Plus</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Vision Insurance</div>
                        <div className="text-xs text-muted-foreground">Vision Care Plus</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">FSA Account</div>
                        <div className="text-xs text-muted-foreground">Flexible Spending</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">Active</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
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
