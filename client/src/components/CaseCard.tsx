import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle } from "lucide-react";

export type CaseStatus = "open" | "in_progress" | "waiting_on_you" | "resolved";

export type Case = {
  id: string;
  subject: string;
  lastMessage: string;
  timestamp: Date;
  status: CaseStatus;
  unreadCount: number;
  agentName: string;
  agentAvatar?: string;
};

type CaseCardProps = {
  case_: Case;
  onClick?: () => void;
};

const statusConfig: Record<CaseStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-secondary text-secondary-foreground" },
  in_progress: { label: "In Progress", className: "bg-chart-2 text-white" },
  waiting_on_you: { label: "Waiting on You", className: "bg-primary text-primary-foreground" },
  resolved: { label: "Resolved", className: "bg-green-600 text-white" },
};

export function CaseCard({ case_, onClick }: CaseCardProps) {
  const config = statusConfig[case_.status];
  const initials = case_.agentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className="hover-elevate active-elevate-2 cursor-pointer transition-all"
      onClick={onClick}
      data-testid={`card-case-${case_.id}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={case_.agentAvatar} alt={case_.agentName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold truncate" data-testid={`text-case-subject-${case_.id}`}>
                {case_.subject}
              </h4>
              {case_.unreadCount > 0 && (
                <Badge 
                  variant="default" 
                  className="shrink-0"
                  data-testid={`badge-unread-${case_.id}`}
                >
                  {case_.unreadCount}
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground truncate mb-2">
              {case_.lastMessage}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{case_.agentName}</span>
              <span>•</span>
              <span>{formatDistanceToNow(case_.timestamp, { addSuffix: true })}</span>
              <span>•</span>
              <Badge variant="secondary" className={config.className}>
                {config.label}
              </Badge>
            </div>
          </div>

          <MessageCircle className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>
      </div>
    </Card>
  );
}
