import { Wallet, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "wouter";

type Member = {
    id: string;
    name: string;
    relationship: string;
    initials: string;
};

type WalletHeaderProps = {
    currentMember: Member;
    members: Member[];
    onMemberChange: (memberId: string) => void;
    onDownloadAll: () => void;
};

export function WalletHeader({
    currentMember,
    members,
    onMemberChange,
    onDownloadAll,
}: WalletHeaderProps) {
    const [, setLocation] = useLocation();
    return (
        <header className="mb-8 md:mb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10">
                            <Wallet className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl">
                                Digital Wallet
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground mt-1">
                                Your insurance cards, always with you
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    {/* Member Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="gap-2 h-10 md:h-11"
                                data-testid="member-switcher"
                            >
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                        {currentMember.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden sm:inline font-medium">
                                    {currentMember.name}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {members.map((member) => (
                                <DropdownMenuItem
                                    key={member.id}
                                    onClick={() => onMemberChange(member.id)}
                                    className="gap-3 cursor-pointer"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                            {member.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {member.relationship}
                                        </div>
                                    </div>
                                    {member.id === currentMember.id && (
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Quick Actions */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onDownloadAll}
                        className="h-10 w-10 md:h-11 md:w-11"
                        data-testid="download-all"
                    >
                        <Download className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLocation("/settings")}
                        className="h-10 w-10 md:h-11 md:w-11"
                        data-testid="settings"
                    >
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
