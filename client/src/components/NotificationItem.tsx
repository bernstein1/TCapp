import { formatDistanceToNow } from "date-fns";
import { 
  Bell, 
  FileText, 
  Calendar, 
  Shield, 
  MessageCircle, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = 
  | "case_update" 
  | "appointment" 
  | "document" 
  | "security" 
  | "tip";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
};

type NotificationItemProps = {
  notification: Notification;
  onClick?: () => void;
  onMarkRead?: () => void;
};

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string }> = {
  case_update: { icon: MessageCircle, color: "text-secondary" },
  appointment: { icon: Calendar, color: "text-chart-2" },
  document: { icon: FileText, color: "text-primary" },
  security: { icon: Shield, color: "text-destructive" },
  tip: { icon: Info, color: "text-chart-5" },
};

export function NotificationItem({ 
  notification, 
  onClick,
  onMarkRead 
}: NotificationItemProps) {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-md hover-elevate cursor-pointer transition-all",
        !notification.read && "bg-accent/50"
      )}
      onClick={onClick}
      data-testid={`notification-${notification.id}`}
    >
      <div className={cn("p-2 rounded-full bg-accent shrink-0", config.color)}>
        <Icon className="h-4 w-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn("font-medium text-sm", !notification.read && "font-semibold")}>
            {notification.title}
          </h4>
          {!notification.read && (
            <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {notification.message}
        </p>
        
        <p className="text-xs text-muted-foreground mt-2">
          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
