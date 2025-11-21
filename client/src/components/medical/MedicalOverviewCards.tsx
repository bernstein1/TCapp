import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, Heart, Droplet } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { bloodTypes } from "@/data/medicalData";

interface MedicalOverviewCardsProps {
    medicationCount: number;
    allergyCount: number;
    conditionCount: number;
    bloodType: string;
    onBloodTypeChange: (value: string) => void;
}

export function MedicalOverviewCards({
    medicationCount,
    allergyCount,
    conditionCount,
    bloodType,
    onBloodTypeChange,
}: MedicalOverviewCardsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-none shadow-sm bg-blue-50/50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-2 bg-blue-100 rounded-full mb-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{medicationCount}</div>
                    <div className="text-xs font-medium text-blue-600/80">Medications</div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-red-50/50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-2 bg-red-100 rounded-full mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-700">{allergyCount}</div>
                    <div className="text-xs font-medium text-red-600/80">Allergies</div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-purple-50/50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-2 bg-purple-100 rounded-full mb-2">
                        <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-700">{conditionCount}</div>
                    <div className="text-xs font-medium text-purple-600/80">Conditions</div>
                </CardContent>
            </Card>

            <Select value={bloodType} onValueChange={onBloodTypeChange}>
                <SelectTrigger className="h-auto p-0 border-none shadow-sm bg-green-50/50 hover:bg-green-50/80 transition-colors [&>svg]:hidden">
                    <Card className="border-none shadow-none bg-transparent w-full">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="p-2 bg-green-100 rounded-full mb-2">
                                <Droplet className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-green-700">{bloodType || "-"}</div>
                            <div className="text-xs font-medium text-green-600/80">Blood Type</div>
                        </CardContent>
                    </Card>
                </SelectTrigger>
                <SelectContent>
                    {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
