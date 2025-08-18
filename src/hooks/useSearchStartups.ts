import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {StartupInterface} from "../models/startup-models/startupInterface.ts";

export function useSearchStartups(keywords: string | null) {
    const key = keywords ? `/startups/searched/${keywords}` : null;

    const {data, error, isLoading, mutate} = useSWR<StartupInterface[]>(key, fetcher)

    return {
        startups: data,
        isLoading,
        isError: error,
        mutateStartup: mutate
    }
}