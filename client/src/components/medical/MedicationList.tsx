import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X, Edit2, Check } from "lucide-react";
import { ApiAutocompleteInput } from "./ApiAutocompleteInput";
import { AutocompleteInput } from "./AutocompleteInput";
import { medicalApi, type MedicationResult } from "@/services/medicalApi";
import { frequencies } from "@/data/medicalData";
import { cn } from "@/lib/utils";

export type Medication = {
    id: string;
    name: string;
    dosage: string;
    frequencyAmount: string;
    frequencyUnit: string;
    strengths?: string[];  // Store available strengths from API
};

type MedicationListProps = {
    medications: Medication[];
    onAdd: (medication: Omit<Medication, "id">) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, medication: Omit<Medication, "id">) => void;
};

export function MedicationList({
    medications,
    onAdd,
    onRemove,
    onUpdate,
}: MedicationListProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newMed, setNewMed] = useState({ name: "", dosage: "", frequencyAmount: "", frequencyUnit: "daily", strengths: [] as string[] });
    const [editMed, setEditMed] = useState({ name: "", dosage: "", frequencyAmount: "", frequencyUnit: "daily", strengths: [] as string[] });

    // API search function for medications
    const searchMedications = async (query: string): Promise<string[]> => {
        const results = await medicalApi.searchMedications(query);
        return results.map((r) => r.name);
    };

    const handleMedicationSelect = async (name: string, isEdit: boolean = false) => {
        // Fetch full medication data to get strengths
        try {
            const results = await medicalApi.searchMedications(name);
            const selected = results.find((r) => r.name === name);
            const strengths = selected?.strengths || [];

            if (isEdit) {
                setEditMed({ ...editMed, name, strengths });
            } else {
                setNewMed({ ...newMed, name, strengths });
            }
        } catch (error) {
            // If API fails, just set the name
            if (isEdit) {
                setEditMed({ ...editMed, name, strengths: [] });
            } else {
                setNewMed({ ...newMed, name, strengths: [] });
            }
        }
    };

    const handleAdd = () => {
        if (newMed.name.trim() && newMed.dosage.trim() && newMed.frequencyAmount.trim() && newMed.frequencyUnit.trim()) {
            onAdd(newMed);
            setNewMed({ name: "", dosage: "", frequencyAmount: "", frequencyUnit: "daily", strengths: [] });
            // Keep form open for adding more
        }
    };

    const handleStartEdit = (med: Medication) => {
        setEditingId(med.id);
        setEditMed({ name: med.name, dosage: med.dosage, frequencyAmount: med.frequencyAmount, frequencyUnit: med.frequencyUnit, strengths: med.strengths || [] });
    };

    const handleSaveEdit = () => {
        if (editingId && editMed.name.trim() && editMed.dosage.trim() && editMed.frequencyAmount.trim() && editMed.frequencyUnit.trim()) {
            onUpdate(editingId, editMed);
            setEditingId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditMed({ name: "", dosage: "", frequencyAmount: "", frequencyUnit: "daily", strengths: [] });
    };

    return (
        <div className="space-y-2">
            {/* Existing Medications */}
            {medications.map((med) => (
                <Card
                    key={med.id}
                    className={cn(
                        "p-2.5 transition-all hover:shadow-md",
                        editingId === med.id && "ring-2 ring-primary"
                    )}
                >
                    {editingId === med.id ? (
                        <div className="space-y-2">
                            <ApiAutocompleteInput
                                value={editMed.name}
                                onChange={(value) => setEditMed({ ...editMed, name: value })}
                                searchFn={searchMedications}
                                onSelect={(value) => handleMedicationSelect(value, true)}
                                placeholder="Medication name"
                                autoFocus
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <AutocompleteInput
                                    value={editMed.dosage}
                                    onChange={(value) => setEditMed({ ...editMed, dosage: value })}
                                    suggestions={editMed.strengths.length > 0 ? editMed.strengths : []}
                                    placeholder={editMed.strengths.length > 0 ? "Select" : "10mg"}
                                />
                                <div className="flex gap-1">
                                    <Input
                                        type="number"
                                        value={editMed.frequencyAmount}
                                        onChange={(e) => setEditMed({ ...editMed, frequencyAmount: e.target.value })}
                                        placeholder="1"
                                        className="w-16"
                                        min="1"
                                    />
                                    <Select value={editMed.frequencyUnit} onValueChange={(value) => setEditMed({ ...editMed, frequencyUnit: value })}>
                                        <SelectTrigger className="flex-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="annually">Annually</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                <Button size="sm" onClick={handleSaveEdit} className="h-7 text-xs">
                                    <Check className="h-3 w-3 mr-1" />
                                    Save
                                </Button>
                                <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="h-7 text-xs">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // View Mode
                        <div className="flex items-start justify-between group">
                            <div className="flex-1">
                                <div className="font-semibold text-sm mb-0.5">{med.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {med.dosage} • {med.frequencyAmount}x {med.frequencyUnit}
                                </div>
                            </div>
                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleStartEdit(med)}
                                    className="h-6 w-6 p-0"
                                >
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onRemove(med.id)}
                                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            ))}

            {/* Add New Medication Form */}
            {(isAdding || medications.length === 0) && (
                <Card className="p-2.5 border-dashed border-2">
                    <div className="space-y-2">
                        <ApiAutocompleteInput
                            value={newMed.name}
                            onChange={(value) => setNewMed({ ...newMed, name: value })}
                            searchFn={searchMedications}
                            onSelect={(value) => handleMedicationSelect(value, false)}
                            placeholder="Type medication..."
                            autoFocus
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <AutocompleteInput
                                value={newMed.dosage}
                                onChange={(value) => setNewMed({ ...newMed, dosage: value })}
                                suggestions={newMed.strengths.length > 0 ? newMed.strengths : []}
                                placeholder={newMed.strengths.length > 0 ? "Select" : "10mg"}
                            />
                            <div className="flex gap-1">
                                <Input
                                    type="number"
                                    value={newMed.frequencyAmount}
                                    onChange={(e) => setNewMed({ ...newMed, frequencyAmount: e.target.value })}
                                    placeholder="1"
                                    className="w-16"
                                    min="1"
                                />
                                <Select value={newMed.frequencyUnit} onValueChange={(value) => setNewMed({ ...newMed, frequencyUnit: value })}>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hourly">Hourly</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="annually">Annually</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            <Button
                                size="sm"
                                onClick={handleAdd}
                                disabled={!newMed.name.trim() || !newMed.dosage.trim() || !newMed.frequencyAmount.trim() || !newMed.frequencyUnit.trim()}
                                className="h-7 text-xs"
                            >
                                <Check className="h-3 w-3 mr-1" />
                                Add
                            </Button>
                            {medications.length > 0 && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setNewMed({ name: "", dosage: "", frequencyAmount: "", frequencyUnit: "daily", strengths: [] });
                                    }}
                                    className="h-7 text-xs"
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            )}

            {/* Add Button (when not adding) */}
            {!isAdding && medications.length > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs"
                    onClick={() => setIsAdding(true)}
                >
                    + Add Another
                </Button>
            )}
        </div>
    );
}
