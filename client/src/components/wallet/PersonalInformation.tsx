import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit2 } from "lucide-react";

interface PersonalInformationProps {
    onEditProfile: () => void;
}

export function PersonalInformation({ onEditProfile }: PersonalInformationProps) {
    return (
        <Card className="border-none shadow-md h-full">
            <CardHeader className="pb-3 border-b bg-orange-50/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-orange-600" />
                        <div>
                            <CardTitle className="text-base font-semibold">Personal Info</CardTitle>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onEditProfile}>
                        <Edit2 className="h-4 w-4 text-orange-600" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <InfoField label="Full Name" value="John Doe" />
                    <InfoField label="Date of Birth" value="January 15, 1985" />
                    <InfoField label="Email" value="john.doe@example.com" />
                    <InfoField label="Phone" value="(555) 123-4567" />
                </div>
            </CardContent>
        </Card>
    );
}

function InfoField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">{label}</div>
            <div className="font-medium text-sm">{value}</div>
        </div>
    );
}
