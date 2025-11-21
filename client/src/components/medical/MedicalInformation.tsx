import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicationList, type Medication } from "./MedicationList";
import { SimpleList } from "./SimpleList";
import { MedicalOverviewCards } from "./MedicalOverviewCards";
import { MedicalProviders } from "./MedicalProviders";
import { medicalApi } from "@/services/medicalApi";
import { Shield, AlertTriangle, Heart, Activity } from "lucide-react";

export function MedicalInformation() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [allergies, setAllergies] = useState<Array<{ id: string; name: string }>>([]);
    const [conditions, setConditions] = useState<Array<{ id: string; name: string }>>([]);
    const [bloodType, setBloodType] = useState<string>("");
    const [showSection, setShowSection] = useState<"medications" | "allergies" | "conditions" | null>(null);

    const handleAddMedication = (med: Omit<Medication, "id">) => {
        setMedications([...medications, { ...med, id: Date.now().toString() }]);
    };

    const handleRemoveMedication = (id: string) => {
        setMedications(medications.filter((m) => m.id !== id));
    };

    const handleUpdateMedication = (id: string, med: Omit<Medication, "id">) => {
        setMedications(medications.map((m) => (m.id === id ? { ...med, id } : m)));
    };

    const handleAddAllergy = (name: string) => {
        setAllergies([...allergies, { id: Date.now().toString(), name }]);
    };

    const handleRemoveAllergy = (id: string) => {
        setAllergies(allergies.filter((a) => a.id !== id));
    };

    const handleAddCondition = (name: string) => {
        setConditions([...conditions, { id: Date.now().toString(), name }]);
    };

    const handleRemoveCondition = (id: string) => {
        setConditions(conditions.filter((c) => c.id !== id));
    };

    // API search functions
    const searchAllergies = async (query: string): Promise<string[]> => {
        return await medicalApi.searchAllergies(query);
    };

    const searchConditions = async (query: string): Promise<string[]> => {
        return await medicalApi.searchConditions(query);
    };

    // Check if completely empty and no section is being shown
    const isEmpty = medications.length === 0 && allergies.length === 0 && conditions.length === 0 && !bloodType && !showSection;

    return (
        <div className="space-y-6">
            {/* Compact Header */}
            <div className="flex items-center gap-1.5 pb-1.5 border-b">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Private & Secure
                </span>
            </div>

            {isEmpty ? (
                /* Unified Empty State */
                <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                        <Shield className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">No Medical Information</h3>
                    <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">
                        Add your medications, allergies, chronic conditions, and blood type for quick access during emergencies.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Button size="sm" onClick={() => setShowSection("medications")} className="h-8 text-xs">
                            Add Medication
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowSection("allergies")} className="h-8 text-xs">
                            Add Allergy
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowSection("conditions")} className="h-8 text-xs">
                            Add Condition
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Overview Cards */}
                    <MedicalOverviewCards
                        medicationCount={medications.length}
                        allergyCount={allergies.length}
                        conditionCount={conditions.length}
                        bloodType={bloodType}
                        onBloodTypeChange={setBloodType}
                    />

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Medications Card - Full width on mobile, large column on desktop */}
                        <Card className="lg:col-span-2 border-none shadow-md">
                            <CardHeader className="pb-3 border-b bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        Medications
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <MedicationList
                                    medications={medications}
                                    onAdd={handleAddMedication}
                                    onRemove={handleRemoveMedication}
                                    onUpdate={handleUpdateMedication}
                                />
                            </CardContent>
                        </Card>

                        {/* Allergies Card */}
                        <Card className="border-none shadow-md">
                            <CardHeader className="pb-3 border-b bg-red-50/30">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    Allergies
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <SimpleList
                                    items={allergies}
                                    searchFn={searchAllergies}
                                    onAdd={handleAddAllergy}
                                    onRemove={handleRemoveAllergy}
                                    placeholder="Type allergy..."
                                    emptyIcon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                                    emptyText="No allergies listed"
                                    addButtonText="Add Allergy"
                                    variant="destructive"
                                />
                            </CardContent>
                        </Card>

                        {/* Conditions Card */}
                        <Card className="border-none shadow-md">
                            <CardHeader className="pb-3 border-b bg-purple-50/30">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-purple-500" />
                                    Conditions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <SimpleList
                                    items={conditions}
                                    searchFn={searchConditions}
                                    onAdd={handleAddCondition}
                                    onRemove={handleRemoveCondition}
                                    placeholder="Type condition..."
                                    emptyIcon={<Heart className="h-4 w-4 text-purple-500" />}
                                    emptyText="No conditions listed"
                                    addButtonText="Add Condition"
                                    variant="secondary"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Medical Providers - Always Visible */}
            <div className="mt-6">
                <MedicalProviders />
            </div>
        </div>
    );
}
