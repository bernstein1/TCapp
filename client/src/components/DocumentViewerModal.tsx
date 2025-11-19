import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Share2, X, FileText } from "lucide-react";
import { format } from "date-fns";

export type DocumentType = "insurance_card" | "eob" | "claim" | "policy" | "letter" | "receipt";

type Document = {
  id: string;
  name: string;
  type: DocumentType;
  uploadDate: Date;
  fileSize?: string;
  pinned?: boolean;
  isNew?: boolean;
};

type DocumentViewerModalProps = {
  open: boolean;
  onClose: () => void;
  document: Document | null;
};

const documentTypeLabels: Record<DocumentType, string> = {
  insurance_card: "Insurance Card",
  eob: "Explanation of Benefits",
  claim: "Claim",
  policy: "Policy Document",
  letter: "Letter",
  receipt: "Receipt",
};

const documentTypeColors: Record<DocumentType, string> = {
  insurance_card: "bg-chart-1",
  eob: "bg-chart-2",
  claim: "bg-chart-3",
  policy: "bg-chart-4",
  letter: "bg-chart-5",
  receipt: "bg-primary",
};

export function DocumentViewerModal({ open, onClose, document }: DocumentViewerModalProps) {
  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{document.name}</DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className={documentTypeColors[document.type]}>
                  {documentTypeLabels[document.type]}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {format(document.uploadDate, "MMM d, yyyy")}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{document.fileSize}</span>
                {document.isNew && (
                  <Badge variant="default">New</Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-viewer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        {/* Document Preview Area */}
        <div className="flex-1 overflow-y-auto bg-muted/30 rounded-lg p-8">
          <div className="max-w-3xl mx-auto bg-background shadow-lg rounded-lg p-8">
            {/* Mock document content */}
            <div className="space-y-6">
              <div className="flex items-center justify-center py-12">
                <FileText className="h-32 w-32 text-muted-foreground/30" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Document Preview</h3>
                <p className="text-sm text-muted-foreground">
                  This is a preview area for {document.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  In a production environment, the actual document content would be displayed here
                </p>
              </div>

              {/* Mock content sections */}
              {document.type === "insurance_card" && (
                <div className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Member Name</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Member ID</p>
                      <p className="font-medium">ABC123456789</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Group Number</p>
                      <p className="font-medium">GRP001234</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Effective Date</p>
                      <p className="font-medium">01/01/2024</p>
                    </div>
                  </div>
                </div>
              )}

              {document.type === "eob" && (
                <div className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Service Description</p>
                    <p className="font-medium">Office Visit - Primary Care</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Charge</p>
                      <p className="font-medium">$150.00</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Insurance Paid</p>
                      <p className="font-medium">$120.00</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">You Owe</p>
                      <p className="font-medium text-primary">$30.00</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => { }}
            data-testid="button-download-document"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            onClick={() => { }}
            data-testid="button-share-document"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
