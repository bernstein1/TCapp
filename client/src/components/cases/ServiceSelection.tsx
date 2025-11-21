import React from "react";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import {
    FileText,
    DollarSign,
    Pill,
    Stethoscope,
    HelpCircle,
    ClipboardList,
    MessageSquare,
    MapPin,
} from "lucide-react";

export type CaseCategory =
    | "provider"
    | "billing"
    | "medication"
    | "service"
    | "benefits"
    | "plan"
    | "question"
    | "";

export const categoryOptions = [
    { id: "question", label: "Ask a quick question", icon: MessageSquare },
    { id: "provider", label: "Help finding a provider or care center", icon: MapPin },
    { id: "billing", label: "Help with medical billing", icon: DollarSign },
    { id: "medication", label: "Find lower cost medications", icon: Pill },
    { id: "service", label: "Help with a service or procedure", icon: Stethoscope },
    { id: "benefits", label: "Help with your health benefits", icon: HelpCircle },
    { id: "plan", label: "Help selecting a medical plan", icon: ClipboardList },
];

interface ServiceSelectionProps {
    onSelect: (category: CaseCategory) => void;
}

export function ServiceSelection({ onSelect }: ServiceSelectionProps) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>What can we help you with today?</DialogTitle>
                <DialogDescription>
                    Select the type of assistance you need
                </DialogDescription>
            </DialogHeader>

            <ScrollArea className="max-h-[60vh] pr-4">
                <div className="grid grid-cols-1 gap-3 py-4">
                    {categoryOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Card
                                key={option.id}
                                className="p-4 hover:bg-accent cursor-pointer transition-colors"
                                onClick={() => onSelect(option.id as CaseCategory)}
                                data-testid={`category-${option.id}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{option.label}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </ScrollArea>
        </>
    );
}
