import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Languages, GraduationCap, MessageCircle } from "lucide-react";

export type Advocate = {
    name: string;
    title: string;
    initials: string;
    image: string;
    bio: string;
    location: string;
    languages: string[];
    specialties: string[];
};

type AdvocateProfileModalProps = {
    advocate: Advocate | null;
    open: boolean;
    onClose: () => void;
    onMessage: () => void;
};

export function AdvocateProfileModal({
    advocate,
    open,
    onClose,
    onMessage,
}: AdvocateProfileModalProps) {
    if (!advocate) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Advocate Profile</DialogTitle>
                    <DialogDescription>
                        View details and connect with your healthcare advocate
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                    <Avatar className="h-24 w-24 border-2 border-primary/10">
                        <AvatarImage src={advocate.image} alt={advocate.name} />
                        <AvatarFallback className="text-xl">{advocate.initials}</AvatarFallback>
                    </Avatar>

                    <div className="text-center space-y-1">
                        <h3 className="font-display font-bold text-2xl">{advocate.name}</h3>
                        <p className="text-muted-foreground font-medium">{advocate.title}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {advocate.specialties.map((specialty, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1">
                                {specialty}
                            </Badge>
                        ))}
                    </div>

                    <div className="w-full space-y-4 mt-4">
                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-sm">Location</p>
                                    <p className="text-sm text-muted-foreground">{advocate.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Languages className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-sm">Languages</p>
                                    <p className="text-sm text-muted-foreground">
                                        {advocate.languages.join(", ")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <GraduationCap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-sm">About</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {advocate.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between gap-2">
                    <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                        Close
                    </Button>
                    <Button onClick={onMessage} className="w-full sm:w-auto">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message {advocate.name.split(" ")[0]}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
