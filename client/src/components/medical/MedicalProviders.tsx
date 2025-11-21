import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Plus, X, Edit2, Check, Star } from "lucide-react";
import { providerTypes } from "@/data/medicalData";

interface Provider {
    id: string;
    name: string;
    type: string;
    phone: string;
    isPrimary: boolean;
}

export function MedicalProviders() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newProvider, setNewProvider] = useState<Omit<Provider, "id">>({
        name: "",
        type: providerTypes[0],
        phone: "",
        isPrimary: false,
    });

    const handleAdd = () => {
        if (newProvider.name.trim() && newProvider.type && newProvider.phone.trim()) {
            // If setting as primary, remove primary from other providers of same type
            let updatedProviders = providers;
            if (newProvider.isPrimary) {
                updatedProviders = providers.map(p =>
                    p.type === newProvider.type ? { ...p, isPrimary: false } : p
                );
            }

            setProviders([
                ...updatedProviders,
                { ...newProvider, id: Date.now().toString() }
            ]);
            setNewProvider({ name: "", type: providerTypes[0], phone: "", isPrimary: false });
            setIsAdding(false);
        }
    };

    const handleEdit = (provider: Provider) => {
        setEditingId(provider.id);
    };

    const handleSaveEdit = (id: string, updatedProvider: Provider) => {
        let updatedProviders = providers.map(p =>
            p.id === id ? updatedProvider : p
        );

        // If setting as primary, remove primary from other providers of same type
        if (updatedProvider.isPrimary) {
            updatedProviders = updatedProviders.map(p =>
                p.type === updatedProvider.type && p.id !== id ? { ...p, isPrimary: false } : p
            );
        }

        setProviders(updatedProviders);
        setEditingId(null);
    };

    const handleRemove = (id: string) => {
        setProviders(providers.filter(p => p.id !== id));
    };

    const togglePrimary = (id: string) => {
        const provider = providers.find(p => p.id === id);
        if (!provider) return;

        // Remove primary from other providers of same type
        const updatedProviders = providers.map(p => {
            if (p.type === provider.type && p.id !== id) {
                return { ...p, isPrimary: false };
            }
            if (p.id === id) {
                return { ...p, isPrimary: !p.isPrimary };
            }
            return p;
        });

        setProviders(updatedProviders);
    };

    return (
        <Card className="border-none shadow-md bg-gradient-to-br from-teal-50/30 to-cyan-50/30">
            <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-teal-600" />
                        <div>
                            <CardTitle className="text-base font-semibold">Medical Providers</CardTitle>
                            <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                Your healthcare team
                            </p>
                        </div>
                    </div>
                    {!isAdding && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsAdding(true)}
                            className="h-8"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Provider
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                {/* Add Provider Form */}
                {isAdding && (
                    <div className="mb-4 p-4 bg-white rounded-lg border-2 border-teal-200/50 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="provider-name" className="text-xs">Provider Name</Label>
                                <Input
                                    id="provider-name"
                                    placeholder="Dr. Jane Smith"
                                    value={newProvider.name}
                                    onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                                    className="h-9 text-sm mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="provider-type" className="text-xs">Type</Label>
                                <Select
                                    value={newProvider.type}
                                    onValueChange={(value) => setNewProvider({ ...newProvider, type: value })}
                                >
                                    <SelectTrigger id="provider-type" className="h-9 text-sm mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {providerTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="provider-phone" className="text-xs">Phone Number</Label>
                                <Input
                                    id="provider-phone"
                                    placeholder="(555) 123-4567"
                                    value={newProvider.phone}
                                    onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                                    className="h-9 text-sm mt-1"
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProvider.isPrimary}
                                        onChange={(e) => setNewProvider({ ...newProvider, isPrimary: e.target.checked })}
                                        className="h-4 w-4"
                                    />
                                    <span className="text-xs">Mark as primary</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                onClick={handleAdd}
                                disabled={!newProvider.name.trim() || !newProvider.phone.trim()}
                                className="h-8 text-xs"
                            >
                                <Check className="h-3 w-3 mr-1" />
                                Add Provider
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewProvider({ name: "", type: providerTypes[0], phone: "", isPrimary: false });
                                }}
                                className="h-8 text-xs"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {/* Providers List */}
                {providers.length === 0 && !isAdding ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No providers added yet</p>
                        <p className="text-xs mt-1">Click "Add Provider" to get started</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {providers.map((provider) => (
                            <ProviderItem
                                key={provider.id}
                                provider={provider}
                                isEditing={editingId === provider.id}
                                onEdit={() => handleEdit(provider)}
                                onSave={(updated) => handleSaveEdit(provider.id, updated)}
                                onRemove={() => handleRemove(provider.id)}
                                onTogglePrimary={() => togglePrimary(provider.id)}
                                onCancelEdit={() => setEditingId(null)}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

interface ProviderItemProps {
    provider: Provider;
    isEditing: boolean;
    onEdit: () => void;
    onSave: (provider: Provider) => void;
    onRemove: () => void;
    onTogglePrimary: () => void;
    onCancelEdit: () => void;
}

function ProviderItem({
    provider,
    isEditing,
    onEdit,
    onSave,
    onRemove,
    onTogglePrimary,
    onCancelEdit,
}: ProviderItemProps) {
    const [editedProvider, setEditedProvider] = useState(provider);

    if (isEditing) {
        return (
            <div className="p-3 bg-white rounded-lg border-2 border-teal-200/50 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label className="text-xs">Provider Name</Label>
                        <Input
                            value={editedProvider.name}
                            onChange={(e) => setEditedProvider({ ...editedProvider, name: e.target.value })}
                            className="h-8 text-sm mt-1"
                        />
                    </div>
                    <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                            value={editedProvider.type}
                            onValueChange={(value) => setEditedProvider({ ...editedProvider, type: value })}
                        >
                            <SelectTrigger className="h-8 text-sm mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {providerTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label className="text-xs">Phone Number</Label>
                        <Input
                            value={editedProvider.phone}
                            onChange={(e) => setEditedProvider({ ...editedProvider, phone: e.target.value })}
                            className="h-8 text-sm mt-1"
                        />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={editedProvider.isPrimary}
                                onChange={(e) => setEditedProvider({ ...editedProvider, isPrimary: e.target.checked })}
                                className="h-4 w-4"
                            />
                            <span className="text-xs">Mark as primary</span>
                        </label>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onClick={() => onSave(editedProvider)}
                        className="h-7 text-xs"
                    >
                        <Check className="h-3 w-3 mr-1" />
                        Save
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onCancelEdit}
                        className="h-7 text-xs"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-teal-200 transition-colors group">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{provider.name}</h4>
                    {provider.isPrimary && (
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 text-[10px] h-5">
                            <Star className="h-3 w-3 mr-1 fill-teal-600" />
                            Primary
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{provider.type}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{provider.phone}</span>
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onTogglePrimary}
                    className="h-7 w-7 p-0"
                    title={provider.isPrimary ? "Remove as primary" : "Set as primary"}
                >
                    <Star className={`h-4 w-4 ${provider.isPrimary ? 'fill-teal-600 text-teal-600' : ''}`} />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onEdit}
                    className="h-7 w-7 p-0"
                >
                    <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onRemove}
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
