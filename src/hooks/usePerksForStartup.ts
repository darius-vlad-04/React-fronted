import useSWR from "swr";
import type {PerkInterface} from "../models/perk-models/perkInterface.ts";
import {fetcher} from "../services/fetchService.ts";

export function usePerksForStartup(id: string | null) {
    const key = id ? `/startups/${id}/perks` : null;
    const {data, error, isLoading, mutate} = useSWR<PerkInterface[]>(key, fetcher)
    return {
        perks: data,
        isLoading,
        isError: error,
        mutatePerks: mutate
    }
}