import { ServiceCard } from "../ServiceCard";

export default function ServiceCardExample() {
  const services = [
    {
      id: "1",
      name: "Mental Health Support",
      description: "Connect with licensed therapists for mental health counseling and support.",
      type: "partner" as const,
      accessMethod: "both" as const,
      phoneNumber: "1-800-MENTAL-1",
      hours: "Available 24/7",
    },
    {
      id: "2",
      name: "Prescription Assistance",
      description: "Get help finding affordable medications and pharmacy options.",
      type: "internal" as const,
      accessMethod: "message" as const,
      hours: "Mon-Fri, 9AM-5PM EST",
    },
  ];

  return (
    <div className="p-8 max-w-2xl space-y-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onCall={() => console.log('Call service:', service.id)}
          onMessage={() => console.log('Message service:', service.id)}
        />
      ))}
    </div>
  );
}
