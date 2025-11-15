import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type DocumentUploadModalProps = {
  open: boolean;
  onClose: () => void;
};

type UploadState = "idle" | "uploading" | "success" | "error";

export function DocumentUploadModal({ open, onClose }: DocumentUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType) return;

    setUploadState("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("success");
          setTimeout(() => {
            onClose();
            resetModal();
          }, 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setDocumentType("");
    setUploadState("idle");
    setUploadProgress(0);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload insurance cards, claims, EOBs, or other important documents
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {uploadState === "idle" && (
            <>
              {/* Document Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type *</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger id="document-type" data-testid="select-document-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="insurance_card">Insurance Card</SelectItem>
                    <SelectItem value="eob">Explanation of Benefits</SelectItem>
                    <SelectItem value="claim">Claim</SelectItem>
                    <SelectItem value="policy">Policy Document</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Drag and Drop Area */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 transition-colors",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50",
                  selectedFile && "border-primary bg-primary/5"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                data-testid="dropzone"
              >
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  {selectedFile ? (
                    <>
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedFile(null)}
                          data-testid="button-remove-file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium mb-1">
                          Drag and drop your file here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".pdf,.jpg,.jpeg,.png"
                        id="file-upload"
                        data-testid="file-input"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        data-testid="button-browse"
                      >
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, JPG, PNG • Maximum size: 10MB
              </p>
            </>
          )}

          {uploadState === "uploading" && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{selectedFile?.name}</p>
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                {uploadProgress}% complete
              </p>
            </div>
          )}

          {uploadState === "success" && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Upload Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Your document has been uploaded and is now available
              </p>
            </div>
          )}
        </div>

        {uploadState === "idle" && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !documentType}
              data-testid="button-upload"
            >
              Upload Document
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
