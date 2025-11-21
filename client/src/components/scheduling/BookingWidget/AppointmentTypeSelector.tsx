import React, { useEffect, useState } from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { AppointmentType } from "@/types/scheduling";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Video, Phone, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function AppointmentTypeSelector({ onSelect }: { onSelect: (type: AppointmentType) => void }) {
    const { setAppointmentType, selectedType } = useScheduling();
    const [types, setTypes] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch("/api/scheduling/appointment-types");
                if (!response.ok) throw new Error("Failed to fetch appointment types");
                const data = await response.json();
                setTypes(data);
            } catch (error) {
                console.error(error);
                toast({
                    title: "Error",
                    description: "Failed to load appointment types. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, [toast]);

    const handleSelect = (type: AppointmentType) => {
        setAppointmentType(type);
        onSelect(type);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#2E4E99]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Select a Service</h2>
                <p className="text-gray-500 mt-2">Choose the type of consultation you need</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {types.map((type, index) => (
                    <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card
                            className={`cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedType?.id === type.id ? 'border-[#2E4E99] bg-[#2E4E99]/5' : 'border-transparent hover:border-[#2E4E99]/20 bg-white/50'} backdrop-blur-sm h-full`}
                            onClick={() => handleSelect(type)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-[#2E4E99]/10 rounded-lg text-[#2E4E99]">
                                        {type.name.toLowerCase().includes('video') ? (
                                            <Video className="h-6 w-6" />
                                        ) : type.name.toLowerCase().includes('phone') ? (
                                            <Phone className="h-6 w-6" />
                                        ) : (
                                            <Users className="h-6 w-6" />
                                        )}
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-50 text-[#2E4E99] hover:bg-blue-100">
                                        {type.duration} min
                                    </Badge>
                                </div>
                                <CardTitle className="mt-4 text-lg font-bold text-gray-900">{type.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 leading-relaxed">
                                    {type.description || "No description available."}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
