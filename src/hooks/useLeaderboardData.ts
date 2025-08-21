import useSWR from "swr";
import {fetcher} from "../services/fetchService.ts";
import type {LeaderboardUserInterface} from "../models/user-models/leaderboardUserInterface.ts"

type LeaderboardType = 'creators' | 'raised' | 'donated' | 'supported';

export function useLeaderboardData(metric: LeaderboardType) {
    const key = `/leaderboard/${metric}`;

    const {data, error, isLoading} = useSWR<LeaderboardUserInterface[]>(key, fetcher);

    return {
        users: data,
        isLoading,
        isError: error,
    };
}