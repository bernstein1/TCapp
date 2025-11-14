import { ServiceCard, type Service } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  //todo: remove mock functionality
  const mockServices: Service[] = [
    {
      id: "1",
      name: "Mental Health Support",
      description: "Connect with licensed therapists and counselors for mental health support, stress management, and emotional wellness. Available 24/7 for immediate assistance.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-MENTAL-1",
      hours: "Available 24/7",
    },
    {
      id: "2",
      name: "Prescription Assistance",
      description: "Get help finding affordable medications, locating pharmacies in your network, and understanding your prescription benefits.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-5PM EST",
    },
    {
      id: "3",
      name: "Wellness Coaching",
      description: "Work with certified wellness coaches to set and achieve your health goals, from nutrition to fitness and lifestyle improvements.",
      type: "partner",
      accessMethod: "both",
      phoneNumber: "1-800-WELLNESS",
      hours: "Mon-Fri, 8AM-8PM EST",
    },
    {
      id: "4",
      name: "Care Coordination",
      description: "Our care coordinators help you navigate complex medical situations, coordinate between providers, and ensure continuity of care.",
      type: "internal",
      accessMethod: "message",
      hours: "Mon-Fri, 9AM-6PM EST",
    },
    {
      id: "5",
      name: "Second Opinion Service",
      description: "Get expert second opinions from leading specialists for major medical decisions and complex diagnoses.",
      type: "partner",
      accessMethod: "call",
      phoneNumber: "1-800-2ND-OPNION",
      hours: "Mon-Fri, 9AM-5PM EST",
    },
    {
      id: "6",
      name: "Financial Counseling",
      description: "Understand your medical bills, payment options, and financial assistance programs. Get help managing healthcare costs.",
      type: "internal",
      accessMethod: "both",
      phoneNumber: "1-800-FIN-HELP",
      hours: "Mon-Fri, 9AM-5PM EST",
    },
  ];

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-2" data-testid="text-services-title">
            Additional Services
          </h1>
          <p className="text-muted-foreground">
            Explore our partner services and specialized support programs
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onCall={() => console.log('Call service:', service.id)}
              onMessage={() => console.log('Message service:', service.id)}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No services found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
