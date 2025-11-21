import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";

interface FamilyMembersProps {
    onAddDependent: () => void;
}

export function FamilyMembers({ onAddDependent }: FamilyMembersProps) {
    return (
        <Card className="border-none shadow-md h-full">
            <CardHeader className="pb-3 border-b bg-blue-50/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                            <CardTitle className="text-base font-semibold">Family Members</CardTitle>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onAddDependent}>
                        <UserPlus className="h-4 w-4 text-blue-600" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
                <DependentItem name="Jane Doe" relationship="Spouse" />
                <DependentItem name="Emily Doe" relationship="Child" />

                <Button
                    variant="outline"
                    className="w-full mt-2 text-xs h-8 border-dashed"
                    onClick={onAddDependent}
                >
                    <UserPlus className="h-3.5 w-3.5 mr-2" />
                    Add Dependent
                </Button>
            </CardContent>
        </Card>
    );
}

function DependentItem({
    name,
    relationship,
}: {
    name: string;
    relationship: string;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 transition-colors hover:bg-accent">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">{relationship}</div>
                </div>
            </div>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
                View
            </Button>
        </div>
    );
}
