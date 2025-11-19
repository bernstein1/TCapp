import { format } from "date-fns";
import {
  FileText,
  Download,
  Share2,
  Eye,
  CreditCard,
  FileCheck,
  Receipt,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type DocumentType = "insurance_card" | "eob" | "claim" | "policy" | "letter" | "receipt";

export type Document = {
  id: string;
  name: string;
  type: DocumentType;
  uploadDate: Date;
  fileSize?: string;
  pinned?: boolean;
  isNew?: boolean;
};

type DocumentCardProps = {
  document: Document;
  onView?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
};

const typeConfig: Record<DocumentType, { icon: typeof FileText; label: string; color: string }> = {
  insurance_card: { icon: CreditCard, label: "Insurance Card", color: "text-secondary" },
  eob: { icon: FileCheck, label: "EOB", color: "text-primary" },
  claim: { icon: Receipt, label: "Claim", color: "text-chart-2" },
  policy: { icon: FileText, label: "Policy", color: "text-chart-3" },
  letter: { icon: Mail, label: "Letter", color: "text-chart-4" },
  receipt: { icon: Receipt, label: "Receipt", color: "text-chart-5" },
};

export function DocumentCard({
  document,
  onView,
  onDownload,
  onShare,
}: DocumentCardProps) {
  const config = typeConfig[document.type];
  const Icon = config.icon;

  return (
    <Card
      interactive
      className="group transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none overflow-hidden"
      onClick={onView}
      data-testid={`card-document-${document.id}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-3 rounded-lg bg-accent ${config.color} transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100`}>
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <h4 className="font-semibold text-sm truncate flex-1">
                {document.name}
              </h4>
              {document.isNew && (
                <Badge variant="default" className="shrink-0">
                  New
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {config.label}
              </Badge>
              {document.fileSize && (
                <span className="text-xs text-muted-foreground">{document.fileSize}</span>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              {format(document.uploadDate, "MMM d, yyyy")}
            </p>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:opacity-100">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onView?.();
            }}
            data-testid={`button-view-${document.id}`}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.();
            }}
            data-testid={`button-download-${document.id}`}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.();
            }}
            data-testid={`button-share-${document.id}`}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
