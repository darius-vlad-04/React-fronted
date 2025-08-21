import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {StartupInterface} from "../models/startup-models/startupInterface.ts";
import type {Filters} from "../components/FilterPanel/FilterPanel.tsx";

export function useFilteredStartups(filters: Filters | null, searchQuery: string) {
    const shouldFetch = !!filters || !!searchQuery;


    const sortBy = filters?.sortBy || 'newest';
    const categories = filters?.categories.join('-') || '';


    const key = shouldFetch
        ? `/startups/filter?sortBy=${sortBy}&categories=${categories}&q=${searchQuery}`
        : null;

    const {data, error, isLoading} = useSWR<StartupInterface[]>(key, fetcher);

    return {
        startups: data,
        isLoading,
        isError: error,
    };
}