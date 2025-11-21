// NIH Clinical Tables API Service
// Free, no-authentication-required medical data APIs

type MedicationResult = {
    name: string;
    strengths: string[];
};

type ApiError = {
    type: 'network' | 'timeout' | 'api';
    message: string;
};

class MedicationCache {
    private cache = new Map<string, { data: any; timestamp: number }>();
    private maxSize = 20;
    private ttl = 5 * 60 * 1000; // 5 minutes

    get(key: string): any | null {
        const item = this.cache.get(key.toLowerCase());
        if (!item) return null;

        // Check if expired
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key.toLowerCase());
            return null;
        }

        return item.data;
    }

    set(key: string, data: any): void {
        // Implement LRU eviction if cache full
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }

        this.cache.set(key.toLowerCase(), {
            data,
            timestamp: Date.now(),
        });
    }

    clear(): void {
        this.cache.clear();
    }
}

class MedicalApiService {
    private cache = new MedicationCache();
    private abortController: AbortController | null = null;
    private readonly timeout = 5000; // 5 seconds

    private async fetchWithTimeout(url: string): Promise<Response> {
        // Cancel previous request
        if (this.abortController) {
            this.abortController.abort();
        }

        // Create new controller
        this.abortController = new AbortController();

        const timeoutId = setTimeout(() => {
            if (this.abortController) {
                this.abortController.abort();
            }
        }, this.timeout);

        try {
            const response = await fetch(url, {
                signal: this.abortController.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            return response;
        } catch (error: any) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('timeout');
            }

            throw error;
        }
    }

    async searchMedications(query: string): Promise<MedicationResult[]> {
        if (!query || query.length < 3) {
            return [];
        }

        // Check cache first
        const cacheKey = `med:${query}`;
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        try {
            const url = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${encodeURIComponent(
                query
            )}&ef=STRENGTHS_AND_FORMS`;

            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            // Parse response
            // data[1] = medication names array
            // data[2].STRENGTHS_AND_FORMS = array of strength arrays
            const names = data[1] || [];
            const strengthsData = data[2]?.STRENGTHS_AND_FORMS || [];

            const results: MedicationResult[] = names.map((name: string, index: number) => ({
                name,
                strengths: (strengthsData[index] || []).map((s: string) => s.trim()),
            }));

            // Cache results
            this.cache.set(cacheKey, results);

            return results;
        } catch (error: any) {
            if (error.message === 'timeout') {
                throw { type: 'timeout', message: 'Search timed out' } as ApiError;
            }
            throw { type: 'network', message: 'Unable to connect' } as ApiError;
        }
    }

    async searchAllergies(query: string): Promise<string[]> {
        if (!query || query.length < 3) {
            return [];
        }

        // Check cache first
        const cacheKey = `allergy:${query}`;
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        try {
            const url = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${encodeURIComponent(
                query
            )}`;

            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            // Parse response - data[1] contains medication/substance names
            const results = data[1] || [];

            // Cache results
            this.cache.set(cacheKey, results);

            return results;
        } catch (error: any) {
            if (error.message === 'timeout') {
                throw { type: 'timeout', message: 'Search timed out' } as ApiError;
            }
            throw { type: 'network', message: 'Unable to connect' } as ApiError;
        }
    }

    async searchConditions(query: string): Promise<string[]> {
        if (!query || query.length < 3) {
            return [];
        }

        // Check cache first
        const cacheKey = `condition:${query}`;
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        try {
            const url = `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${encodeURIComponent(
                query
            )}&df=consumer_name`;

            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            // Parse response - data[3] contains consumer-friendly names
            const results = data[3]?.map((item: any) => {
                // Each item is an array with one element (the name)
                return Array.isArray(item) ? item[0] : item;
            }) || [];

            // Cache results
            this.cache.set(cacheKey, results);

            return results;
        } catch (error: any) {
            if (error.message === 'timeout') {
                throw { type: 'timeout', message: 'Search timed out' } as ApiError;
            }
            throw { type: 'network', message: 'Unable to connect' } as ApiError;
        }
    }

    clearCache(): void {
        this.cache.clear();
    }
}

// Export singleton instance
export const medicalApi = new MedicalApiService();
export type { MedicationResult, ApiError };
