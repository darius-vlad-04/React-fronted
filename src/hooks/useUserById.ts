import useSWR from "swr";
import type {UserInterface} from "../models/user-models/userInterface.ts";
import {fetcher} from "../services/fetchService.ts";

export function useUserById(id: string | null) {
    const key = id ? `/users/${id}` : null;
    const {data, error, isLoading, mutate} = useSWR<UserInterface>(key, fetcher);
    return {
        user: data,
        isLoading,
        isError: error,
        mutateUser: mutate
    }
}