import { Phone, MessageCircle, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export type ServiceType = "partner" | "internal";
export type AccessMethod = "call" | "message" | "both";

export type Service = {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  accessMethod: AccessMethod;
  phoneNumber?: string;
  hours?: string;
  logo?: string;
};

type ServiceCardProps = {
  service: Service;
  onCall?: () => void;
  onMessage?: () => void;
};

export function ServiceCard({ service, onCall, onMessage }: ServiceCardProps) {
  const navigate = useNavigate();
  const showCall = service.accessMethod === "call" || service.accessMethod === "both";
  const showMessage = service.accessMethod === "message" || service.accessMethod === "both";

  return (
    <Card
      className="hover-elevate"
      data-testid={`card-service-${service.id}`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {service.logo && (
            <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <img
                src={service.logo}
                alt={service.name}
                className="h-8 w-8 object-contain"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="font-display font-bold text-lg flex-1">
                {service.name}
              </h3>
              <Badge variant={service.type === "partner" ? "secondary" : "default"}>
                {service.type === "partner" ? "Partner" : "TouchCare"}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>

        {(service.phoneNumber || service.hours) && (
          <div className="mb-4 space-y-1 text-sm">
            {service.phoneNumber && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{service.phoneNumber}</span>
              </div>
            )}
            {service.hours && (
              <div className="text-muted-foreground ml-6">
                {service.hours}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {service.type === "internal" ? (
            <Button
              className="flex-1"
              onClick={() => navigate("/schedule")}
              data-testid={`button-schedule-${service.id}`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          ) : (
            <>
              {showCall && service.phoneNumber && (
                <Button
                  className="flex-1"
                  onClick={onCall}
                  data-testid={`button-call-${service.id}`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              )}
              {showMessage && (
                <Button
                  variant={showCall ? "outline" : "default"}
                  className="flex-1"
                  onClick={onMessage}
                  data-testid={`button-message-${service.id}`}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
