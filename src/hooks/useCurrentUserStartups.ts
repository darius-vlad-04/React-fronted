import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {StartupInterface} from "../models/startup-models/startupInterface.ts";


export function useCurrentUserStartups() {
    const {data, error, isLoading, mutate} = useSWR<StartupInterface[]>('/startups/me', fetcher);

    return {
        startups: data,
        isLoading,
        isError: error,
        mutateUser: mutate
    };
}