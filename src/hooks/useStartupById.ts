import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {StartupInterface} from "../models/startup-models/startupInterface.ts";

export function useStartupById(id: string | null) {
    const key = id ? `/startups/${id}` : null;

    const {data, error, isLoading, mutate} = useSWR<StartupInterface>(key, fetcher)

    return {
        startup: data,
        isLoading,
        isError: error,
        mutateStartup: mutate
    }
}