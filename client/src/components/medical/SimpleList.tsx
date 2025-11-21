import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ApiAutocompleteInput } from "./ApiAutocompleteInput";
import { cn } from "@/lib/utils";

type SimpleListProps = {
    items: Array<{ id: string; name: string }>;
    searchFn: (query: string) => Promise<string[]>;
    onAdd: (name: string) => void;
    onRemove: (id: string) => void;
    placeholder?: string;
    emptyIcon?: React.ReactNode;
    emptyText?: string;
    addButtonText?: string;
    variant?: "default" | "destructive" | "secondary";
};

export function SimpleList({
    items,
    searchFn,
    onAdd,
    onRemove,
    placeholder = "Start typing...",
    emptyIcon,
    emptyText = "No items added yet",
    addButtonText = "Add Item",
    variant = "default",
}: SimpleListProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState("");

    const handleAdd = () => {
        if (newItem.trim()) {
            onAdd(newItem.trim());
            setNewItem("");
            // Keep input open for adding more
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && newItem.trim()) {
            handleAdd();
        }
    };

    return (
        <div className="space-y-2">
            {/* Existing Items as Badges */}
            {items.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                        <Badge
                            key={item.id}
                            variant={variant === "destructive" ? "destructive" : "secondary"}
                            className={cn(
                                "pl-2 pr-1.5 py-0.5 text-xs group hover:shadow-sm transition-shadow",
                                variant === "destructive" && "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                            )}
                        >
                            <span>{item.name}</span>
                            <button
                                onClick={() => onRemove(item.id)}
                                className="ml-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-2.5 w-2.5" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Add New Item Input */}
            {(isAdding || items.length === 0) && (
                <div className="flex gap-1.5">
                    <ApiAutocompleteInput
                        value={newItem}
                        onChange={setNewItem}
                        searchFn={searchFn}
                        placeholder={placeholder}
                        onSelect={handleAdd}
                        autoFocus
                        className="flex-1"
                    />
                    <Button
                        size="sm"
                        onClick={handleAdd}
                        disabled={!newItem.trim()}
                        className="shrink-0 h-8 w-8 p-0"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                    {items.length > 0 && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                setIsAdding(false);
                                setNewItem("");
                            }}
                            className="h-8 text-xs"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            )}

            {/* Add Button (when not adding) */}
            {!isAdding && items.length > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-7 text-xs"
                    onClick={() => setIsAdding(true)}
                >
                    + Add
                </Button>
            )}
        </div>
    );
}
