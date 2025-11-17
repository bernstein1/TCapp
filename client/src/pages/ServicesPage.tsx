import { ServiceCard, type Service } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // TouchCare Core Services
  const touchcareServices: Service[] = [
    {
      id: "billing-review",
      name: "Billing Review",
      description: "When members get a confusing bill in the mail, they can easily upload a picture and ask us to investigate. We coordinate directly with the provider or carrier to ensure the bill is correct and negotiate the bill when it is not.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "benefits-transparency",
      name: "Benefits Transparency",
      description: "TouchCare members have the opportunity to schedule a confidential deep-dive both during Open Enrollment, or anytime after they have made their annual elections, to review plans and ask detailed questions.",
      type: "internal",
      accessMethod: "both",
      phoneNumber: "1-800-CARE-NOW",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "open-enrollment",
      name: "Open Enrollment Support",
      description: "We created the Open Enrollment Consultation to provide peace of mind. Every member's healthcare needs are unique – and their benefits selection should reflect that. All we need is 30 minutes.",
      type: "internal",
      accessMethod: "both",
      phoneNumber: "1-800-CARE-NOW",
      hours: "Available during enrollment periods",
    },
    {
      id: "provider-searches",
      name: "Provider Searches",
      description: "We assess every provider based on a proprietary set of criteria. TouchCare Health Assistants carefully match based on location, cost, specialty type, gender preference, and prioritize in-network providers.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "benefits-navigation",
      name: "Benefits Navigation",
      description: "TouchCare goes beyond medical insurance—we're here to support voluntary benefits too. From dental and vision to FSA, HSA, HRA, and more, we help members navigate their benefits with ease.",
      type: "internal",
      accessMethod: "both",
      phoneNumber: "1-800-CARE-NOW",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "appointment-scheduling",
      name: "Appointment Scheduling",
      description: "After we assist our members with their provider research, we will schedule appointments directly with the providers. Once provided with availability, our team will ensure they get scheduled.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "cost-transparency",
      name: "Cost Transparency",
      description: "We provide members with an understanding of their health plans and inform them of precise costs before they have a test or procedure. We'll always follow up with a clear side-by-side comparison of our research.",
      type: "internal",
      accessMethod: "both",
      phoneNumber: "1-800-CARE-NOW",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "procedure-prep",
      name: "Procedure Preparation Assistance",
      description: "Prior to any procedure, TouchCare offers a robust partnership that reduces stress, saves time, and eliminates confusion or administrative errors that are all too common with complex medical issues.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "rxcare",
      name: "RxCare Consultations",
      description: "We assist members to help them understand their pharmaceutical benefits and to help them determine the lowest cost options available. We'll also explore creative options to save you money.",
      type: "internal",
      accessMethod: "both",
      phoneNumber: "1-800-CARE-NOW",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
  ];

  // Premium Partner Services
  const premiumServices: Service[] = [
    {
      id: "mental-health",
      name: "Mental Health Support",
      description: "Connect with licensed therapists and counselors for mental health support, stress management, and emotional wellness. Available 24/7 for immediate assistance.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-MENTAL-1",
      hours: "Available 24/7",
    },
    {
      id: "wellness-coaching",
      name: "Wellness Coaching",
      description: "Work with certified wellness coaches to set and achieve your health goals, from nutrition to fitness and lifestyle improvements.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-WELLNESS",
      hours: "Mon-Fri, 8AM-8PM EST",
    },
    {
      id: "second-opinion",
      name: "Second Opinion Service",
      description: "Get expert second opinions from leading specialists for major medical decisions and complex diagnoses.",
      type: "partner",
      accessMethod: "call",
      phoneNumber: "1-800-2ND-OPNION",
      hours: "Mon-Fri, 9AM-5PM EST",
    },
    {
      id: "care-coordination",
      name: "Care Coordination",
      description: "Our care coordinators help you navigate complex medical situations, coordinate between providers, and ensure continuity of care.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-CARE-COORD",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "financial-counseling",
      name: "Financial Counseling",
      description: "Understand your medical bills, payment options, and financial assistance programs. Get help managing healthcare costs beyond standard billing review.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-FIN-HELP",
      hours: "Mon-Fri, 9AM-5PM EST",
    },
  ];

  const allServices = [...touchcareServices, ...premiumServices];

  const filteredTouchcareServices = touchcareServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPremiumServices = premiumServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredTouchcareServices.length > 0 || filteredPremiumServices.length > 0;

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-services-title">
            Services & Support
          </h1>
          <p className="text-muted-foreground">
            Comprehensive healthcare navigation and premium partner services
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-services"
          />
        </div>

        {/* TouchCare Services Section */}
        {filteredTouchcareServices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl">TouchCare Services</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Core navigation and advocacy services included with your membership
                </p>
              </div>
              <Badge variant="default" className="text-sm px-3 py-1">
                Included
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTouchcareServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onCall={() => {}}
                  onMessage={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {/* Premium Services Section */}
        {filteredPremiumServices.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl">Premium Services</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enhanced services and specialized support from our trusted partners
                </p>
              </div>
              <Badge variant="secondary" className="text-sm px-3 py-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Partner Services
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPremiumServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onCall={() => {}}
                  onMessage={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {!hasResults && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
