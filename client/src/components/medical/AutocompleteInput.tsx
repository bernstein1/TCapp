import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AutocompleteInputProps = {
    value: string;
    onChange: (value: string) => void;
    suggestions: string[];
    placeholder?: string;
    onSelect?: (value: string) => void;
    className?: string;
    autoFocus?: boolean;
};

export function AutocompleteInput({
    value,
    onChange,
    suggestions,
    placeholder,
    onSelect,
    className,
    autoFocus,
}: AutocompleteInputProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input
    const filteredSuggestions = suggestions.filter((suggestion) => {
        const query = value.toLowerCase().trim();
        if (query.length < 2) return false;

        const suggestionLower = suggestion.toLowerCase();

        // Exact match
        if (suggestionLower === query) return true;

        // Starts with
        if (suggestionLower.startsWith(query)) return true;

        // Contains
        if (suggestionLower.includes(query)) return true;

        // Fuzzy match (simple version - check if all characters appear in order)
        let queryIndex = 0;
        for (let i = 0; i < suggestionLower.length && queryIndex < query.length; i++) {
            if (suggestionLower[i] === query[queryIndex]) {
                queryIndex++;
            }
        }
        return queryIndex === query.length;
    }).slice(0, 8); // Limit to 8 suggestions

    // Show suggestions when typing
    useEffect(() => {
        if (value.length >= 2 && filteredSuggestions.length > 0) {
            setShowSuggestions(true);
            setSelectedIndex(-1);
        } else {
            setShowSuggestions(false);
        }
    }, [value, filteredSuggestions.length]);

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
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    selectSuggestion(filteredSuggestions[selectedIndex]);
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
        onChange(suggestion);
        onSelect?.(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);
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

    return (
        <div className="relative">
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={className}
                autoFocus={autoFocus}
            />

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className={cn(
                        "absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg",
                        "max-h-60 overflow-auto"
                    )}
                >
                    {filteredSuggestions.map((suggestion, index) => (
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

                    {value.trim() && !filteredSuggestions.includes(value) && (
                        <div className="px-3 py-2 text-xs text-muted-foreground border-t">
                            Press Enter to add "{value}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
