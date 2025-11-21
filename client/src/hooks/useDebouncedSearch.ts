import { useState, useEffect, useCallback, useRef } from "react";

type DebouncedSearchResult<T> = {
    results: T;
    isLoading: boolean;
    error: string | null;
    search: (query: string) => void;
};

export function useDebouncedSearch<T>(
    searchFn: (query: string) => Promise<T>,
    delay: number = 400,
    minChars: number = 3
): DebouncedSearchResult<T> {
    const [results, setResults] = useState<T>([] as T);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentQueryRef = useRef<string>("");

    const search = useCallback(
        (query: string) => {
            currentQueryRef.current = query;

            // Clear previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Reset if query too short
            if (query.length < minChars) {
                setResults([] as T);
                setIsLoading(false);
                setError(null);
                return;
            }

            // Show loading after debounce starts
            setIsLoading(true);
            setError(null);

            // Debounce the API call
            timeoutRef.current = setTimeout(async () => {
                try {
                    const data = await searchFn(query);

                    // Only update if this is still the current query
                    if (currentQueryRef.current === query) {
                        setResults(data);
                        setIsLoading(false);
                    }
                } catch (err: any) {
                    // Only update if this is still the current query
                    if (currentQueryRef.current === query) {
                        setError(err.message || "Search failed");
                        setResults([] as T);
                        setIsLoading(false);
                    }
                }
            }, delay);
        },
        [searchFn, delay, minChars]
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return { results, isLoading, error, search };
}
