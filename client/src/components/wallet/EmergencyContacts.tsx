import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Settings } from "lucide-react";

interface EmergencyContactsProps {
    onManageContacts: () => void;
}

export function EmergencyContacts({ onManageContacts }: EmergencyContactsProps) {
    return (
        <Card className="border-none shadow-md h-full">
            <CardHeader className="pb-3 border-b bg-red-50/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-red-600" />
                        <div>
                            <CardTitle className="text-base font-semibold">Emergency Contacts</CardTitle>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onManageContacts}>
                        <Settings className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
                <div className="p-3 rounded-lg bg-red-50/50 border border-red-100">
                    <div className="font-medium text-red-900">Jane Doe</div>
                    <div className="text-sm text-red-700">(555) 987-6543</div>
                    <div className="text-xs text-red-600/80 mt-1">Spouse</div>
                </div>

                <Button
                    variant="outline"
                    className="w-full mt-2 text-xs h-8"
                    onClick={onManageContacts}
                >
                    Manage Contacts
                </Button>
            </CardContent>
        </Card>
    );
}
