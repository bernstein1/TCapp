import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Pill, Eye, CreditCard } from "lucide-react";

export function CoverageSummary() {
    return (
        <Card className="border-none shadow-md h-full">
            <CardHeader className="pb-3 border-b bg-primary/5">
                <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <div>
                        <CardTitle className="text-base font-semibold">Coverage Summary</CardTitle>
                        <p className="text-xs text-muted-foreground font-normal">Active insurance plans</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
                <CoverageItem
                    icon={Heart}
                    title="Medical Insurance"
                    subtitle="Premium Health Plan"
                    status="Active"
                />
                <CoverageItem
                    icon={Pill}
                    title="Dental Insurance"
                    subtitle="Dental Plus"
                    status="Active"
                />
                <CoverageItem
                    icon={Eye}
                    title="Vision Insurance"
                    subtitle="Vision Care Plus"
                    status="Active"
                />
                <CoverageItem
                    icon={CreditCard}
                    title="FSA Account"
                    subtitle="Flexible Spending"
                    status="Active"
                />
            </CardContent>
        </Card>
    );
}

function CoverageItem({
    icon: Icon,
    title,
    subtitle,
    status,
}: {
    icon: any;
    title: string;
    subtitle: string;
    status: string;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 transition-colors hover:bg-accent group">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-background shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <div className="font-medium text-sm">{title}</div>
                    <div className="text-xs text-muted-foreground">{subtitle}</div>
                </div>
            </div>
            <Badge
                variant="outline"
                className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 text-[10px] h-5"
            >
                {status}
            </Badge>
        </div>
    );
}
