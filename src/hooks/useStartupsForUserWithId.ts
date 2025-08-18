import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {StartupInterface} from "../models/startup-models/startupInterface.ts"

export function useStartupsForUserWithId(id: string | null) {

    const key = id ? `/users/${id}/startups` : null;

    const {data, error, isLoading, mutate} = useSWR<StartupInterface[]>(key, fetcher);
    return {
        startups: data,
        isLoading,
        isError: error,
        mutateStartups: mutate
    }
}