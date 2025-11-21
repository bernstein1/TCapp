import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

type ApiAutocompleteInputProps = {
    value: string;
    onChange: (value: string) => void;
    searchFn: (query: string) => Promise<string[]>;
    placeholder?: string;
    onSelect?: (value: string) => void;
    className?: string;
    autoFocus?: boolean;
};

export function ApiAutocompleteInput({
    value,
    onChange,
    searchFn,
    placeholder,
    onSelect,
    className,
    autoFocus,
}: ApiAutocompleteInputProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const lastSelectedValueRef = useRef<string>("");

    const { results, isLoading, error, search } = useDebouncedSearch(searchFn, 400, 3);

    // Trigger search when value changes
    useEffect(() => {
        // Don't show dropdown if this is the value we just selected
        if (value === lastSelectedValueRef.current) {
            return;
        }

        search(value);
        if (value.length >= 3) {
            setShowSuggestions(true);
            setSelectedIndex(-1);
        } else {
            setShowSuggestions(false);
        }
    }, [value, search]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || results.length === 0) {
            if (e.key === "Enter" && value.trim()) {
                // Allow custom entry
                onSelect?.(value);
                setShowSuggestions(false);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < results.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    selectSuggestion(results[selectedIndex]);
                } else if (value.trim()) {
                    // Accept custom value
                    onSelect?.(value);
                    setShowSuggestions(false);
                }
                break;
            case "Escape":
                e.preventDefault();
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const selectSuggestion = (suggestion: string) => {
        lastSelectedValueRef.current = suggestion;
        onChange(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        onSelect?.(suggestion);
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;

        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return text;

        return (
            <>
                {text.slice(0, index)}
                <span className="font-semibold text-primary">
                    {text.slice(index, index + query.length)}
                </span>
                {text.slice(index + query.length)}
            </>
        );
    };

    const shouldShowDropdown = showSuggestions && value.length >= 3;

    return (
        <div className="relative">
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    // Clear last selected value when user types
                    if (e.target.value !== lastSelectedValueRef.current) {
                        lastSelectedValueRef.current = "";
                    }
                    onChange(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={className}
                autoFocus={autoFocus}
            />

            {shouldShowDropdown && (
                <div
                    ref={dropdownRef}
                    className={cn(
                        "absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg",
                        "max-h-60 overflow-auto"
                    )}
                >
                    {isLoading && (
                        <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Searching...</span>
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="px-3 py-2 text-sm text-destructive">
                            {error}. Type to add manually.
                        </div>
                    )}

                    {!isLoading && !error && results.length === 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                            No matches found. Press Enter to add "{value}"
                        </div>
                    )}

                    {!isLoading && !error && results.length > 0 && (
                        <>
                            {results.slice(0, 8).map((suggestion, index) => (
                                <div
                                    key={suggestion}
                                    className={cn(
                                        "px-3 py-2 cursor-pointer transition-colors",
                                        "hover:bg-accent",
                                        selectedIndex === index && "bg-accent"
                                    )}
                                    onClick={() => selectSuggestion(suggestion)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    {highlightMatch(suggestion, value)}
                                </div>
                            ))}

                            {value.trim() && !results.includes(value) && (
                                <div className="px-3 py-2 text-xs text-muted-foreground border-t">
                                    Press Enter to add "{value}"
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
