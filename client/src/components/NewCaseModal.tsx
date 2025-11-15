import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NewCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NewCaseModal({ open, onClose }: NewCaseModalProps) {
  const [, setLocation] = useLocation();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) return;

    // Simulate case creation
    const newCaseId = `case-${Date.now()}`;

    // Reset form
    setSubject("");
    setCategory("");
    setMessage("");

    // Close modal and navigate to the new case
    onClose();
    setLocation(`/cases/${newCaseId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Start New Conversation</DialogTitle>
          <DialogDescription>
            Describe your question or issue and we'll connect you with a support agent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="What can we help you with?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              data-testid="input-case-subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" data-testid="select-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coverage">Coverage Question</SelectItem>
                <SelectItem value="claims">Claims Inquiry</SelectItem>
                <SelectItem value="benefits">Benefits Information</SelectItem>
                <SelectItem value="provider">Provider Network</SelectItem>
                <SelectItem value="prescription">Prescription Coverage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Please provide details about your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              data-testid="textarea-message"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!subject.trim() || !message.trim()}
            data-testid="button-submit"
          >
            Start Conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
