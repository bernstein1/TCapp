import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ServiceSelection, categoryOptions, CaseCategory } from "./cases/ServiceSelection";
import { CaseForm } from "./cases/CaseForm";

type NewCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NewCaseModal({ open, onClose }: NewCaseModalProps) {
  const [step, setStep] = useState<"category" | "form">("category");
  const [selectedCategory, setSelectedCategory] = useState<CaseCategory>("");

  const handleCategorySelect = (category: CaseCategory) => {
    setSelectedCategory(category);
    setStep("form");
  };

  const handleBackToCategory = () => {
    setStep("category");
    setSelectedCategory("");
  };

  const handleClose = () => {
    onClose();
    // Reset form after close animation
    setTimeout(() => {
      setStep("category");
      setSelectedCategory("");
    }, 300);
  };

  const categoryLabel = categoryOptions.find((c) => c.id === selectedCategory)?.label || "";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        {step === "category" ? (
          <ServiceSelection onSelect={handleCategorySelect} />
        ) : (
          <CaseForm
            category={selectedCategory}
            categoryLabel={categoryLabel}
            onBackToCategory={handleBackToCategory}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
