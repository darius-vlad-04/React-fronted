import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {StartupInterface} from "../models/startup-models/startupInterface.ts";

export function useShowcaseStartups(filter: string | null) {
    const key = filter ? `/startups/showcase/${filter}` : null;

    const {data, error, isLoading, mutate} = useSWR<StartupInterface[]>(key, fetcher)

    return {
        startups: data,
        isLoading,
        isError: error,
        mutateStartup: mutate
    }
}