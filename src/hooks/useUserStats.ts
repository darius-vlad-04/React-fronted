import useSWR from "swr";
import type {StatInterface} from "../models/stats-models/statInterface.ts";
import {fetcher} from "../services/fetchService.ts";

export function useUserStats(userId: number | null) {
    const key = userId ? `/stats/${userId}` : null;

    const {data, error, isLoading, mutate} = useSWR<StatInterface>(key, fetcher);

    return {
        stats: data,
        isLoading,
        isError: error,
        mutateStats: mutate
    }
}